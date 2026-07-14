interface RevenueRow {
  label: string;
  value: string;
}

const ROWS: RevenueRow[] = [
  { label: 'Total user spends', value: '₹98,200' },
  { label: 'Host earnings', value: '₹42,200' },
  { label: 'Call Aunty contributes', value: '₹32,200' },
  { label: 'Platform earns', value: '₹56,200' },
];

export default function RevenueOverview() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Revenue Overview</span>
        <button type="button" className="btn-ghost">
          This month
        </button>
      </div>

      <div className="revenue-total-card">
        <span className="revenue-total-label">Total Earnings</span>
        <span className="revenue-total-value">₹56,200</span>
      </div>

      <div className="revenue-rows">
        {ROWS.map((row) => (
          <div className="revenue-row" key={row.label}>
            <span className="revenue-row-label">{row.label}</span>
            <span className="revenue-row-value">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
