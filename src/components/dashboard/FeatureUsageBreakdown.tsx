interface Feature {
  label: string;
  users: number;
  sessions: number;
  percent: number;
  color: string;
}

const FEATURES: Feature[] = [
  { label: 'Audio Calls', users: 7704, sessions: 1840, percent: 60, color: 'var(--chart-purple)' },
  { label: 'Video Calls', users: 5686, sessions: 2378, percent: 30, color: 'var(--chart-pink)' },
  { label: 'Bitz Requests', users: 1651, sessions: 8412, percent: 10, color: 'var(--feature-amber)' },
];

function buildConicGradient(features: Feature[]) {
  let cursor = 0;
  const stops: string[] = [];
  for (const f of features) {
    const start = cursor;
    const end = cursor + f.percent;
    stops.push(`${f.color} ${start}% ${end}%`);
    cursor = end;
  }
  return `conic-gradient(${stops.join(', ')})`;
}

export default function FeatureUsageBreakdown() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Feature usage breakdown</span>
      </div>

      <div className="feature-usage-wrap">
        <div className="donut" style={{ background: buildConicGradient(FEATURES) }}>
          <div className="donut-hole" />
        </div>

        <div className="feature-list">
          {FEATURES.map((f) => (
            <div className="feature-row" key={f.label}>
              <div className="feature-row-top">
                <span>
                  <span className="feature-row-title">
                    <span className="feature-dot" style={{ background: f.color }} />
                    {f.label}
                  </span>
                  <span className="feature-row-sub">
                    {f.users.toLocaleString('en-IN')} users · {f.sessions.toLocaleString('en-IN')} sessions
                  </span>
                </span>
                <span className="feature-row-percent">{f.percent}%</span>
              </div>
              <span className="feature-bar-track">
                <span
                  className="feature-bar-fill"
                  style={{ width: `${f.percent}%`, background: f.color }}
                />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
