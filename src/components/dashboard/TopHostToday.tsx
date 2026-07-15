import { useEffect, useState } from 'react';
import type { TopHost } from '../../api/topHosts';
import { ApiError } from '../../lib/apiClient';

const GRADIENTS = [
  'linear-gradient(135deg, #a970ff, #ff2f9e)',
  'linear-gradient(135deg, #0d9e6e, #1fbf94)',
  'linear-gradient(135deg, #ff8a3d, #ff2f9e)',
  'linear-gradient(135deg, #4f7bff, #a970ff)',
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('');
}

interface TopHostTodayProps {
  title?: string;
  fetchHosts: (limit: number) => Promise<TopHost[]>;
  limit?: number;
  emptyMessage?: string;
}

export default function TopHostToday({
  title = 'Top Host Today',
  fetchHosts,
  limit = 3,
  emptyMessage = 'No host activity yet.',
}: TopHostTodayProps) {
  const [hosts, setHosts] = useState<TopHost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchHosts(limit)
      .then((data) => {
        if (cancelled) return;
        setHosts(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load top hosts.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [fetchHosts, limit]);

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">{title}</span>
      </div>

      {loading || error || !hosts ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : hosts.length === 0 ? (
        <div className="hourly-bars-empty">{emptyMessage}</div>
      ) : (
        <div className="top-host-list">
          {hosts.map((host, index) => (
            <div className="top-host-card" key={host.name}>
              <span className="host-avatar" style={{ background: GRADIENTS[index % GRADIENTS.length] }}>
                {initials(host.name)}
              </span>
              <span className="top-host-info">
                <span className="host-link">{host.name}</span>
                <span className="host-sub">
                  {(host.sparks ?? 0).toLocaleString('en-IN')} sparks · {host.repeatPercent ?? 0}% repeat
                </span>
              </span>

              <span className="top-host-metric">
                <span className="top-host-metric-label">Earnings</span>
                <span className="top-host-metric-value earn">₹{(host.earnings ?? 0).toLocaleString('en-IN')}</span>
              </span>
              <span className="top-host-metric">
                <span className="top-host-metric-label">Calls</span>
                <span className="top-host-metric-value">{host.calls ?? 0}</span>
              </span>
              <span className="top-host-metric">
                <span className="top-host-metric-label">Rating</span>
                <span className="top-host-metric-value">{host.rating ?? 0}</span>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
