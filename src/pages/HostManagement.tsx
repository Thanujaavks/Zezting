import { useEffect, useState } from 'react';
import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import TopHostToday from '../components/dashboard/TopHostToday';
import HostsNeedingAttention from '../components/dashboard/HostsNeedingAttention';
import HostList from '../components/dashboard/HostList';
import { fetchHostManagementCards, fetchTopHosts } from '../api/hostManagement';
import { ApiError } from '../lib/apiClient';
import { trendDelta } from '../lib/trend';

export default function HostManagement() {
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchHostManagementCards()
      .then((data) => {
        if (cancelled) return;
        setStats([
          {
            label: 'Total Hosts',
            value: data.totalHosts.value.toLocaleString('en-IN'),
            ...trendDelta(data.totalHosts),
          },
          {
            label: 'CA Host',
            value: data.caHosts.value.toLocaleString('en-IN'),
            ...trendDelta(data.caHosts),
          },
          {
            label: 'Zezting Host',
            value: data.zeztingHosts.value.toLocaleString('en-IN'),
            ...trendDelta(data.zeztingHosts),
          },
          {
            label: 'Live Call Now',
            value: data.liveCallsNow.value.toLocaleString('en-IN'),
            live: true,
          },
        ]);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load host management stats.');
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
            <span className="stat-card-label">Host Management Stats</span>
            <span className="stat-card-value">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <StatCards stats={stats ?? undefined} />
      )}

      <div className="dash-cols">
        <TopHostToday fetchHosts={fetchTopHosts} />
        <div className="dash-col-stack">
          <HostsNeedingAttention />
        </div>
      </div>

      <HostList />
    </>
  );
}
