import { useEffect, useState } from 'react';
import { fetchPeakEngagementHours, type PeakEngagementHour } from '../../api/dashboard';
import { ApiError } from '../../lib/apiClient';

export default function PeakEngagement() {
  const [rows, setRows] = useState<PeakEngagementHour[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchPeakEngagementHours({ limit: 6 })
      .then((data) => {
        if (!cancelled) setRows(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load peak engagement hours.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const max = rows ? Math.max(1, ...rows.map((r) => r.users)) : 1;

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Peak engagement hours</span>
        <span className="panel-subtext">Today</span>
      </div>
      {loading || error || !rows ? (
        <div className="peak-list">
          <div className="peak-row">
            <span className="peak-time">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <div className="peak-list">
          {rows.map((row) => (
            <div className={`peak-row${row.isPeak ? ' is-peak' : ''}`} key={row.rank}>
              <span className="peak-rank">{row.rank}</span>
              <span className="peak-time">{row.hour}</span>
              <span className="peak-bar-track">
                <span className="peak-bar-fill" style={{ width: `${(row.users / max) * 100}%` }} />
              </span>
              <span className="peak-value-wrap">
                <span className="peak-value">{row.users.toLocaleString('en-IN')}</span>
                {row.isPeak && <span className="peak-badge">Peak</span>}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
