import { useEffect, useState } from 'react';
import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import TopHostToday from '../components/dashboard/TopHostToday';
import HostEarningsTable from '../components/dashboard/HostEarningsTable';
import { fetchHostEarningsCards, fetchTopEarningHosts } from '../api/hostEarnings';
import { ApiError } from '../lib/apiClient';
import { trendDelta } from '../lib/trend';
import { formatCurrency } from '../lib/format';

export default function HostEarnings() {
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchHostEarningsCards()
      .then((data) => {
        if (cancelled) return;
        setStats([
          {
            label: 'Total Payout (Mo)',
            value: formatCurrency(data.totalPayoutMonth.value, data.totalPayoutMonth.currency),
            ...trendDelta(data.totalPayoutMonth),
          },
          {
            label: 'CA Host Avg',
            value: formatCurrency(data.caHostAvg.value, data.caHostAvg.currency),
            ...(data.caHostAvg.comparisonLabel
              ? { delta: data.caHostAvg.comparisonLabel }
              : trendDelta(data.caHostAvg)),
          },
          {
            label: 'Zezting Host Avg',
            value: formatCurrency(data.zeztingHostAvg.value, data.zeztingHostAvg.currency),
            ...trendDelta(data.zeztingHostAvg),
          },
          {
            label: 'Bonuses Awarded',
            value: formatCurrency(data.bonusesAwarded.value, data.bonusesAwarded.currency),
            delta: `${data.bonusesAwarded.countThisWeek} this week`,
          },
        ]);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load host earnings stats.');
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
            <span className="stat-card-label">Host Earnings Stats</span>
            <span className="stat-card-value">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <StatCards stats={stats ?? undefined} />
      )}

      <TopHostToday fetchHosts={fetchTopEarningHosts} />
      <HostEarningsTable />
    </>
  );
}
