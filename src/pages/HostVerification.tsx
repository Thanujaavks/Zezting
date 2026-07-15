import { useEffect, useState } from 'react';
import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import PendingVerifications from '../components/dashboard/PendingVerifications';
import { fetchHostVerificationCards } from '../api/hostVerification';
import { ApiError } from '../lib/apiClient';

export default function HostVerification() {
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchHostVerificationCards()
      .then((data) => {
        if (cancelled) return;
        setStats([
          { label: 'New Host', value: data.newHost.toLocaleString('en-IN') },
          { label: 'Pending', value: data.pending.toLocaleString('en-IN') },
          { label: 'Completed', value: data.completed.toLocaleString('en-IN') },
          { label: 'Rejected', value: data.rejected.toLocaleString('en-IN') },
        ]);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load host verification stats.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {loading || error ? (
        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-card-label">Host Verification Stats</span>
            <span className="stat-card-value">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <StatCards stats={stats ?? undefined} />
      )}

      <PendingVerifications />
    </>
  );
}
