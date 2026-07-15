import { useEffect, useState } from 'react';
import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import ExpenseTable from '../components/dashboard/ExpenseTable';
import { fetchPlatformExpenseSummary, type PlatformExpenseSummary } from '../api/platformExpense';
import { ApiError } from '../lib/apiClient';

const currentMonth = new Date().toISOString().slice(0, 7);

function formatInr(value: number): string {
  return `₹${value.toLocaleString('en-IN')}`;
}

function formatPercent(value: number): string {
  const arrow = value >= 0 ? '▲' : '▼';
  return `${arrow} ${Math.abs(value)}%`;
}

function buildStats(data: PlatformExpenseSummary): StatCard[] {
  const revenueOfCosts = data.revenueMo > 0 ? Math.round((data.platformCosts / data.revenueMo) * 100) : 0;

  return [
    {
      label: 'Revenue(Mo)',
      value: formatInr(data.revenueMo),
      note: formatPercent(data.revenueGrowthPercent),
      noteTone: data.revenueGrowthPercent >= 0 ? 'good' : 'critical',
    },
    {
      label: 'Host Payouts',
      value: formatInr(data.hostPayouts),
      note: `${formatPercent(data.hostPayoutChangePercent)} vs last`,
      noteTone: data.hostPayoutChangePercent > 0 ? 'critical' : 'good',
    },
    {
      label: 'Platfrom Costs',
      value: formatInr(data.platformCosts),
      note: `${revenueOfCosts}% of rev`,
      noteTone: 'muted',
    },
    {
      label: 'Net Profit',
      value: formatInr(data.netProfit),
      note: `${data.netProfitMargin}% margin`,
      noteTone: 'muted',
    },
  ];
}

export default function PlatformExpense() {
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchPlatformExpenseSummary(currentMonth)
      .then((data) => {
        if (cancelled) return;
        setStats(buildStats(data));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load platform expense stats.');
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
            <span className="stat-card-label">Platform Expense Stats</span>
            <span className="stat-card-value">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <StatCards stats={stats ?? undefined} />
      )}

      <ExpenseTable />
    </>
  );
}
