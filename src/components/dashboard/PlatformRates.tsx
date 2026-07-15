import { useEffect, useState } from 'react';
import { fetchPlatformRates } from '../../api/dashboard';
import type { PlatformRate } from '../../api/dashboard';
import { ApiError } from '../../lib/apiClient';

export default function PlatformRates() {
  const [tiers, setTiers] = useState<PlatformRate[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchPlatformRates()
      .then((data) => {
        if (!cancelled) setTiers([...data].sort((a, b) => a.sortOrder - b.sortOrder));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load platform rates.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const updateRate = (id: string, value: string) => {
    const num = Number(value);
    if (Number.isNaN(num)) return;
    setTiers((prev) => prev && prev.map((t) => (t._id === id ? { ...t, price: num } : t)));
  };

  return (
    <div className="panel platform-rates-panel">
      <div className="panel-head">
        <span className="panel-title">Platform Rates</span>
      </div>

      {loading || error || !tiers ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : tiers.length === 0 ? (
        <div className="hourly-bars-empty">No platform rates configured.</div>
      ) : (
        <div className="rate-list">
          {tiers.map((tier) => (
            <div className="rate-row" key={tier._id}>
              <span className="rate-coins">
                <span className="coin-disc" />
                {tier.coins}
              </span>

              <label className="rate-input">
                <span>₹</span>
                <input
                  type="number"
                  min={0}
                  value={tier.price}
                  onChange={(e) => updateRate(tier._id, e.target.value)}
                  aria-label={`Rate for ${tier.coins} coins`}
                />
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
