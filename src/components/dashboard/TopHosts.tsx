import { useEffect, useState } from 'react';
import { fetchDashboardTopHosts } from '../../api/dashboard';
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

export default function TopHosts() {
  const [hosts, setHosts] = useState<TopHost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchDashboardTopHosts(4)
      .then((data) => {
        if (!cancelled) setHosts(data);
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
  }, []);

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Today's Top Hosts</span>
        <button type="button" className="panel-link">
          View all
        </button>
      </div>

      {loading || error || !hosts ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : hosts.length === 0 ? (
        <div className="hourly-bars-empty">No host activity yet.</div>
      ) : (
        <div className="host-list">
          {hosts.map((host, index) => (
            <div className="host-row" key={host.name}>
              <span className="host-avatar" style={{ background: GRADIENTS[index % GRADIENTS.length] }}>
                {initials(host.name)}
              </span>
              <span className="host-info">
                <span className="host-name">{host.name}</span>
                <span className="host-sub">
                  {(host.sparks ?? 0).toLocaleString('en-IN')} sparks · {host.repeatPercent ?? 0}% repeat
                </span>
              </span>
              <span className="host-amount">₹{(host.earnings ?? 0).toLocaleString('en-IN')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
