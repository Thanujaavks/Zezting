import { RefreshCw, TrendingUp } from 'lucide-react';

export interface StatCard {
  label: string;
  value: string;
  delta?: string;
  live?: boolean;
  note?: string;
  noteTone?: 'good' | 'critical' | 'muted';
}

const DEFAULT_STATS: StatCard[] = [
  { label: 'Daily Active Users', value: '18,342', delta: '22% vs yesterday' },
  { label: 'Active Hosts', value: '2,847', delta: '22% vs yesterday' },
  { label: 'Revenue (Today)', value: '₹84,220', delta: '22% vs yesterday' },
  { label: 'Live Call Now', value: '563', live: true },
];

interface StatCardsProps {
  stats?: StatCard[];
}

export default function StatCards({ stats = DEFAULT_STATS }: StatCardsProps) {
  return (
    <div className="stat-grid">
      {stats.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <span className="stat-card-label">{stat.label}</span>
          <span className="stat-card-value">{stat.value}</span>
          {stat.live && (
            <span className="stat-card-live">
              <RefreshCw size={13} className="spin" />
              live
            </span>
          )}
          {!stat.live && stat.delta && (
            <span className="stat-card-delta">
              <TrendingUp size={14} />
              {stat.delta}
            </span>
          )}
          {!stat.live && !stat.delta && stat.note && (
            <span className={`stat-note ${stat.noteTone ?? 'muted'}`}>{stat.note}</span>
          )}
        </div>
      ))}
    </div>
  );
}
