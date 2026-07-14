interface HourBar {
  label: string;
  value: number;
  peak?: boolean;
}

const BARS: HourBar[] = [
  { label: '12 AM', value: 92, peak: true },
  { label: '3 AM', value: 74 },
  { label: '6 AM', value: 58 },
  { label: '9 AM', value: 34 },
  { label: '12 PM', value: 26 },
  { label: '2 PM', value: 16 },
  { label: '4 PM', value: 42 },
  { label: '6 PM', value: 68 },
  { label: '8 PM', value: 78 },
  { label: '11 PM', value: 96, peak: true },
];

export default function HourlyActivity() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Hourly Activity — Today</span>
      </div>

      <div className="hourly-bars">
        {BARS.map((bar) => (
          <div className="hourly-bar-col" key={bar.label}>
            <div
              className="hourly-bar"
              style={{
                height: `${bar.value}%`,
                background: bar.peak ? 'var(--chart-pink)' : 'var(--chart-purple)',
              }}
              title={`${bar.label}: ${bar.value * 21} calls`}
            />
          </div>
        ))}
      </div>
      <div className="hourly-labels">
        {BARS.map((bar) => (
          <span className="hourly-label-col" key={bar.label}>
            {bar.label}
          </span>
        ))}
      </div>
    </div>
  );
}
