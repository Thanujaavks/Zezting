interface Signal {
  label: string;
  value: string;
  percent: number;
}

const SIGNALS: Signal[] = [
  { label: 'New Users', value: '284', percent: 81 },
  { label: 'New Hosts', value: '96', percent: 80 },
  { label: 'CA Activations', value: '312', percent: 78 },
  { label: 'Host Activation', value: '88%', percent: 88 },
  { label: 'User Retention (30D)', value: '74%', percent: 74 },
  { label: 'Cost-to-First-Call', value: '₹42', percent: 68 },
  { label: 'CA Conversion Rate', value: '61%', percent: 61 },
];

export default function GrowthSignals() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Growth Signals</span>
      </div>
      <div className="growth-list">
        {SIGNALS.map((s) => (
          <div className="growth-row" key={s.label}>
            <span className="growth-label">{s.label}</span>
            <span className="growth-bar-track">
              <span className="growth-bar-fill" style={{ width: `${s.percent}%` }} />
            </span>
            <span className="growth-value">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
