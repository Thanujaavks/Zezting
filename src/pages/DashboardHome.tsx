import { useEffect, useState } from 'react';
import AlertBar from '../components/dashboard/AlertBar';
import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import PerformancePanel from '../components/dashboard/PerformancePanel';
import PeakEngagement from '../components/dashboard/PeakEngagement';
import TopHosts from '../components/dashboard/TopHosts';
import Heatmap from '../components/dashboard/Heatmap';
import GrowthSignals from '../components/dashboard/GrowthSignals';
import { fetchDashboardCards } from '../api/dashboard';
import { ApiError } from '../lib/apiClient';

function formatCurrency(value: number, currency: string) {
  const symbol = currency === 'INR' ? '₹' : `${currency} `;
  return `${symbol}${value.toLocaleString('en-IN')}`;
}

function trendDelta(metric: { changePercent: number; trend: 'UP' | 'DOWN' | 'NEUTRAL' }): Partial<StatCard> {
  if (metric.trend === 'NEUTRAL') {
    return { note: 'No change vs yesterday', noteTone: 'muted' };
  }
  return { delta: `${Math.abs(metric.changePercent)}% vs yesterday` };
}

export default function DashboardHome() {
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchDashboardCards()
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
        setError(err instanceof ApiError ? err.message : 'Failed to load dashboard stats.');
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
      <AlertBar />

      {loading || error ? (
        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-card-label">Dashboard Stats</span>
            <span className="stat-card-value">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <StatCards stats={stats ?? undefined} />
      )}

      <div className="dash-cols">
        <PerformancePanel />
        <div className="dash-col-stack">
          <PeakEngagement />
          <TopHosts />
        </div>
      </div>

      <div className="dash-cols dash-cols-equal">
        <Heatmap />
        <div className="dash-col-stack">
          <GrowthSignals />
        </div>
      </div>
    </>
  );
}
