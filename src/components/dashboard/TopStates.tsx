import { useEffect, useState } from 'react';
import { fetchTopStates, type TopState } from '../../api/appAnalytics';
import { ApiError } from '../../lib/apiClient';

export default function TopStates() {
  const [states, setStates] = useState<TopState[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchTopStates(6)
      .then((data) => {
        if (cancelled) return;
        setStates(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load top states.');
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
        <span className="panel-title">Top states by active users</span>
      </div>

      {loading || error || !states ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : states.length === 0 ? (
        <div className="hourly-bars-empty">No state activity yet.</div>
      ) : (
        <div className="state-list">
          {states.map((state, i) => (
            <div className="state-row" key={state.label}>
              <span className="state-rank">{i + 1}</span>
              <span className="state-name">{state.label}</span>
              <span className="state-value">{state.activeUsers.toLocaleString('en-IN')} active users</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
