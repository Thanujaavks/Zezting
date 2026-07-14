interface RevenueStat {
  label: string;
  value: string;
  kind: 'delta' | 'note' | 'warning';
  text: string;
}

const STATS: RevenueStat[] = [
  { label: 'Total Revenue (Mo)', value: '₹6,24,800', kind: 'delta', text: '22%' },
  { label: 'Platform Commission', value: '₹1,87,440', kind: 'note', text: '30% cut' },
  { label: 'Host Payouts Due', value: '₹4,37,360', kind: 'warning', text: '8 pending' },
  { label: 'Bitz Revenue (Mo)', value: '₹56,200', kind: 'delta', text: '32%' },
];

export default function RevenueStats() {
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
          {stat.kind === 'note' && <span className="stat-card-note">{stat.text}</span>}
          {stat.kind === 'warning' && <span className="stat-card-warning">{stat.text}</span>}
        </div>
      ))}
    </div>
  );
}
