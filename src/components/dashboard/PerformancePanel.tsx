import { useMemo, useState } from 'react';
import LineChart from './LineChart';
import { formatK, formatRupee, getRangeData, niceTicks, type ChartRange } from './chartData';

const RANGES: { id: ChartRange; label: string }[] = [
  { id: 'day', label: 'Last 24h' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
];

export default function PerformancePanel() {
  const [range, setRange] = useState<ChartRange>('day');
  const data = useMemo(() => getRangeData(range), [range]);
  const leftTicks = useMemo(() => niceTicks(data.leftMax, 5), [data.leftMax]);
  const rightTicks = useMemo(() => niceTicks(data.rightMax, 5), [data.rightMax]);

  const miniStats = [
    { label: 'Peak Calls', value: data.totals.peakCalls.toLocaleString('en-IN') },
    { label: 'Peak Users', value: data.totals.peakUsers.toLocaleString('en-IN') },
    { label: 'Total Revenue', value: `₹${data.totals.totalRevenue.toLocaleString('en-IN')}` },
    { label: 'Top Engagement', value: data.totals.topEngagement },
  ];

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Platform performance</span>
        <div className="dash-toggle-group">
          {RANGES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`dash-toggle-btn${range === r.id ? ' active' : ''}`}
              onClick={() => setRange(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mini-stats">
        {miniStats.map((s) => (
          <div className="mini-stat" key={s.label}>
            <span className="mini-stat-label">{s.label}</span>
            <span className="mini-stat-value">{s.value}</span>
            <span className="mini-stat-delta">▲ 22%</span>
          </div>
        ))}
      </div>

      <div className="chart-legend">
        {data.series.map((s) => (
          <span className="chart-legend-item" key={s.id}>
            <span className="chart-legend-swatch" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
      </div>

      <LineChart
        series={data.series}
        xLabels={data.xLabels}
        leftTicks={leftTicks}
        rightTicks={rightTicks}
        leftMax={data.leftMax}
        rightMax={data.rightMax}
        formatLeft={formatK}
        formatRight={formatRupee}
        labelStep={data.labelStep}
      />
    </div>
  );
}
