import { useEffect, useState } from 'react';
import { fetchUsersCards, type UsersCards } from '../../api/users';
import { ApiError } from '../../lib/apiClient';
import { formatCurrency } from '../../lib/format';

export default function UserStats() {
  const [cards, setCards] = useState<UsersCards | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchUsersCards()
      .then((data) => {
        if (!cancelled) setCards(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load stats.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading || error || !cards) {
    return (
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-card-label">User Stats</span>
          <span className="stat-card-value">{error ?? 'Loading…'}</span>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: 'Total Users',
      value: cards.totalUsers.value.toLocaleString('en-IN'),
      trend: cards.totalUsers.trend,
      text: `${Math.abs(cards.totalUsers.changePercent)}%`,
    },
    {
      label: 'Online Now',
      value: cards.onlineNow.value.toLocaleString('en-IN'),
      trend: cards.onlineNow.trend,
      text: `${Math.abs(cards.onlineNow.changePercent)}%`,
    },
    {
      label: 'Avg Spend / User',
      value: formatCurrency(cards.avgSpendPerUser.value, cards.avgSpendPerUser.currency),
      trend: cards.avgSpendPerUser.trend,
      text: `${Math.abs(cards.avgSpendPerUser.changePercent)}%`,
    },
  ] as const;

  return (
    <div className="stat-grid">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <span className="stat-card-label">{stat.label}</span>
          <span className="stat-card-value">{stat.value}</span>
          {stat.trend !== 'NEUTRAL' && (
            <span className="stat-card-delta">
              <span className="tri">{stat.trend === 'UP' ? '▲' : '▼'}</span>
              {stat.text}
            </span>
          )}
        </div>
      ))}

      <div className="stat-card">
        <span className="stat-card-label">Never Called (Risk)</span>
        <span className="stat-card-value">
          {cards.neverCalledRisk.value}
          {cards.neverCalledRisk.unit === 'PERCENT' ? '%' : ''}
        </span>
        <span className="stat-card-warning">{cards.neverCalledRisk.riskLabel}</span>
      </div>
    </div>
  );
}
