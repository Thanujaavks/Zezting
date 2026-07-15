import { useEffect, useState } from 'react';
import { fetchGrowthSignals, type GrowthSignal } from '../../api/appAnalytics';
import { ApiError } from '../../lib/apiClient';

function formatValue(signal: GrowthSignal): string {
  switch (signal.unit) {
    case 'PERCENT':
      return `${signal.value}%`;
    case 'HOURS':
      return `${signal.value}h`;
    default:
      return signal.value.toLocaleString('en-IN');
  }
}

export default function GrowthSignals() {
  const [signals, setSignals] = useState<GrowthSignal[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchGrowthSignals()
      .then((data) => {
        if (cancelled) return;
        setSignals(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load growth signals.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Growth Signals</span>
      </div>

      {loading || error || !signals ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : (
        <div className="growth-list">
          {signals.map((s) => (
            <div className="growth-row" key={s.key}>
              <span className="growth-label">{s.label}</span>
              <span className="growth-bar-track">
                <span className="growth-bar-fill" style={{ width: `${Math.min(100, Math.max(0, s.progressPercent))}%` }} />
              </span>
              <span className="growth-value">{formatValue(s)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
