import { useEffect, useMemo, useState } from 'react';
import LineChart from './LineChart';
import type { ChartSeries } from './LineChart';
import { formatK, formatRupee, niceTicks, type ChartRange } from './chartData';
import { fetchPlatformPerformance, type PlatformPerformance, type PlatformPerformanceRange } from '../../api/dashboard';
import { ApiError } from '../../lib/apiClient';

const RANGES: { id: ChartRange; label: string }[] = [
  { id: 'day', label: 'Last 24h' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
];

const RANGE_PARAM: Record<ChartRange, PlatformPerformanceRange> = {
  day: 'LAST_24_HOURS',
  week: 'THIS_WEEK',
  month: 'THIS_MONTH',
};

function axisMax(values: number[]): number {
  const max = Math.max(0, ...values);
  return max === 0 ? 1 : Math.ceil(max * 1.2);
}

export default function PerformancePanel() {
  const [range, setRange] = useState<ChartRange>('day');
  const [performance, setPerformance] = useState<PlatformPerformance | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchPlatformPerformance(RANGE_PARAM[range])
      .then((data) => {
        if (!cancelled) setPerformance(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load performance data.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [range]);

  const chart = useMemo(() => {
    if (!performance) return null;

    const xLabels = performance.chart.map((b) => b.label);
    const calls = performance.chart.map((b) => b.calls);
    const usersOnline = performance.chart.map((b) => b.usersOnline);
    const revenue = performance.chart.map((b) => b.revenue);

    const series: ChartSeries[] = [
      { id: 'call', label: 'Call', color: 'var(--chart-purple)', values: calls, axis: 'left' },
      { id: 'online', label: 'User Online', color: 'var(--chart-green)', values: usersOnline, axis: 'left' },
      { id: 'revenue', label: 'Revenue (₹, right axis)', color: 'var(--chart-pink)', values: revenue, axis: 'right' },
    ];

    return {
      xLabels,
      series,
      labelStep: xLabels.length > 12 ? 2 : 1,
      leftMax: axisMax([...calls, ...usersOnline]),
      rightMax: axisMax(revenue),
    };
  }, [performance]);

  const leftTicks = useMemo(() => (chart ? niceTicks(chart.leftMax, 5) : []), [chart]);
  const rightTicks = useMemo(() => (chart ? niceTicks(chart.rightMax, 5) : []), [chart]);

  const miniStats = performance
    ? [
        { label: 'Peak Calls', value: performance.summary.peakCalls.toLocaleString('en-IN') },
        { label: 'Peak Users', value: performance.summary.peakUsers.toLocaleString('en-IN') },
        {
          label: 'Total Revenue',
          value: `₹${performance.summary.totalRevenue.toLocaleString('en-IN')}`,
        },
        { label: 'Top Engagement', value: performance.summary.topEngagementHour },
      ]
    : [];

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

      {loading || error || !chart ? (
        <div className="mini-stats">
          <div className="mini-stat">
            <span className="mini-stat-label">Platform Performance</span>
            <span className="mini-stat-value">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <>
          <div className="mini-stats">
            {miniStats.map((s) => (
              <div className="mini-stat" key={s.label}>
                <span className="mini-stat-label">{s.label}</span>
                <span className="mini-stat-value">{s.value}</span>
              </div>
            ))}
          </div>

          <div className="chart-legend">
            {chart.series.map((s) => (
              <span className="chart-legend-item" key={s.id}>
                <span className="chart-legend-swatch" style={{ background: s.color }} />
                {s.label}
              </span>
            ))}
          </div>

          <LineChart
            series={chart.series}
            xLabels={chart.xLabels}
            leftTicks={leftTicks}
            rightTicks={rightTicks}
            leftMax={chart.leftMax}
            rightMax={chart.rightMax}
            formatLeft={formatK}
            formatRight={formatRupee}
            labelStep={chart.labelStep}
          />
        </>
      )}
    </div>
  );
}
