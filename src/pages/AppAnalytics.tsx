import { useEffect, useState } from 'react';
import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import HourlyActivity from '../components/dashboard/HourlyActivity';
import GrowthSignals from '../components/dashboard/GrowthSignals';
import FeatureUsageBreakdown from '../components/dashboard/FeatureUsageBreakdown';
import TopStates from '../components/dashboard/TopStates';
import { fetchAppAnalyticsCards } from '../api/appAnalytics';
import { ApiError } from '../lib/apiClient';
import { trendDelta } from '../lib/trend';
import { formatCurrency } from '../lib/format';

export default function AppAnalytics() {
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchAppAnalyticsCards()
      .then((data) => {
        if (cancelled) return;
        setStats([
          {
            label: 'Daily Active Users',
            value: data.dailyActiveUsers.value.toLocaleString('en-IN'),
            ...trendDelta(data.dailyActiveUsers),
          },
          {
            label: 'Active Hosts',
            value: data.activeHosts.value.toLocaleString('en-IN'),
            ...trendDelta(data.activeHosts),
          },
          {
            label: 'Revenue (Today)',
            value: formatCurrency(data.revenueToday.value, data.revenueToday.currency),
            ...trendDelta(data.revenueToday),
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
        setError(err instanceof ApiError ? err.message : 'Failed to load app analytics stats.');
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
            <span className="stat-card-label">App Analytics Stats</span>
            <span className="stat-card-value">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <StatCards stats={stats ?? undefined} />
      )}

      <div className="dash-cols">
        <HourlyActivity />
        <div className="dash-col-stack">
          <GrowthSignals />
        </div>
      </div>

      <div className="dash-cols">
        <FeatureUsageBreakdown />
        <div className="dash-col-stack">
          <TopStates />
        </div>
      </div>
    </>
  );
}
