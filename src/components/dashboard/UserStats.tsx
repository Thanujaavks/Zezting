interface UserStat {
  label: string;
  value: string;
  kind: 'delta' | 'warning';
  text: string;
}

const STATS: UserStat[] = [
  { label: 'Total Users', value: '18,342', kind: 'delta', text: '22%' },
  { label: 'Online Now', value: '2,841', kind: 'delta', text: '18%' },
  { label: 'Avg Spend / User', value: '₹348', kind: 'delta', text: '22%' },
  { label: 'Never Called (Risk)', value: '34%', kind: 'warning', text: 'cost-to-first-call' },
];

export default function UserStats() {
  return (
    <div className="stat-grid">
      {STATS.map((stat) => (
        <div className="stat-card" key={stat.label}>
          <span className="stat-card-label">{stat.label}</span>
          <span className="stat-card-value">{stat.value}</span>
          {stat.kind === 'delta' && (
            <span className="stat-card-delta">
              <span className="tri">▲</span>
              {stat.text}
            </span>
          )}
          {stat.kind === 'warning' && <span className="stat-card-warning">{stat.text}</span>}
        </div>
      ))}
    </div>
  );
}
