interface PeakRow {
  time: string;
  value: number;
}

const ROWS: PeakRow[] = [
  { time: '9 - 10 PM', value: 1020 },
  { time: '10 - 11 PM', value: 890 },
  { time: '8 - 9 PM', value: 720 },
  { time: '5 - 6 PM', value: 612 },
  { time: '7 - 8 PM', value: 524 },
  { time: '12 - 1 PM', value: 412 },
];

const max = Math.max(...ROWS.map((r) => r.value));

export default function PeakEngagement() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Peak engagement hours</span>
        <span className="panel-subtext">Today</span>
      </div>
      <div className="peak-list">
        {ROWS.map((row, i) => (
          <div className={`peak-row${i === 0 ? ' is-peak' : ''}`} key={row.time}>
            <span className="peak-rank">{i + 1}</span>
            <span className="peak-time">{row.time}</span>
            <span className="peak-bar-track">
              <span className="peak-bar-fill" style={{ width: `${(row.value / max) * 100}%` }} />
            </span>
            <span className="peak-value-wrap">
              <span className="peak-value">{row.value.toLocaleString('en-IN')}</span>
              {i === 0 && <span className="peak-badge">Peak</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
