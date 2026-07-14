import { useMemo, useRef, useState } from 'react';
import { catmullRomPath, formatK, niceTicks } from './chartData';
import { getRevenueRangeData, type RevenueRange } from './revenueChartData';

const RANGES: { id: RevenueRange; label: string }[] = [
  { id: 'day', label: 'Last 24h' },
  { id: 'week', label: 'This week' },
  { id: 'month', label: 'This month' },
  { id: 'year', label: 'This year' },
];

const WIDTH = 1000;
const HEIGHT = 320;
const PAD_LEFT = 46;
const PAD_RIGHT = 14;
const PAD_TOP = 12;
const PAD_BOTTOM = 28;

export default function RevenueTrendChart() {
  const [range, setRange] = useState<RevenueRange>('year');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const data = useMemo(() => getRevenueRangeData(range), [range]);
  const ticks = useMemo(() => niceTicks(data.axisMax, 5), [data.axisMax]);
  const focusedIndex = hoverIndex ?? data.selectedIndex;

  const n = data.labels.length;
  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;
  const catWidth = plotWidth / n;

  const xAt = (i: number) => PAD_LEFT + (n === 1 ? 0 : (i / (n - 1)) * plotWidth);
  const yAt = (value: number) => PAD_TOP + (1 - value / data.axisMax) * plotHeight;

  const zPoints = useMemo(
    () => data.zezting.map((v, i) => ({ x: xAt(i), y: yAt(v) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  const cPoints = useMemo(
    () => data.ca.map((v, i) => ({ x: xAt(i), y: yAt(v) })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data],
  );
  const zPath = useMemo(() => catmullRomPath(zPoints), [zPoints]);
  const cPath = useMemo(() => catmullRomPath(cPoints), [cPoints]);

  const maxBar = Math.max(...data.bars);
  const barMaxHeight = plotHeight * 0.92;

  const handleMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((clientX - rect.left) / rect.width) * WIDTH;
    const ratio = (relX - PAD_LEFT) / plotWidth;
    const idx = Math.round(ratio * (n - 1));
    setHoverIndex(Math.min(n - 1, Math.max(0, idx)));
  };

  const headline = `₹${data.headline.toLocaleString('en-IN')}`;

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Zezting VS CA</span>
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

      <div className="revenue-trend-top">
        <div className="revenue-trend-headline">
          <span className="revenue-trend-amount">{headline}</span>
          <span className="revenue-trend-badge">{data.growthPercent}%</span>
        </div>
        <div className="chart-legend">
          <span className="chart-legend-item">
            <span className="chart-legend-swatch" style={{ background: 'var(--chart-purple)' }} />
            Zezting
          </span>
          <span className="chart-legend-item">
            <span className="chart-legend-swatch" style={{ background: 'var(--chart-pink)' }} />
            CA
          </span>
        </div>
      </div>

      <div className="linechart-wrap">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseLeave={() => setHoverIndex(null)}
          onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
          onTouchEnd={() => setHoverIndex(null)}
        >
          {ticks.map((tick) => {
            const y = yAt(tick);
            return (
              <g key={`grid-${tick}`}>
                <line x1={PAD_LEFT} x2={WIDTH - PAD_RIGHT} y1={y} y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth={1} />
                <text x={PAD_LEFT - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#746e7f">
                  {formatK(tick)}
                </text>
              </g>
            );
          })}

          {data.bars.map((bar, i) => {
            const barHeight = (bar / maxBar) * barMaxHeight;
            const barWidth = Math.min(34, catWidth * 0.46);
            const cx = xAt(i);
            const isFocused = i === focusedIndex;
            return (
              <rect
                key={`bar-${i}`}
                x={cx - barWidth / 2}
                y={HEIGHT - PAD_BOTTOM - barHeight}
                width={barWidth}
                height={barHeight}
                rx={5}
                fill="var(--chart-purple)"
                opacity={isFocused ? 0.85 : 0.1}
              />
            );
          })}

          <line
            x1={xAt(focusedIndex)}
            x2={xAt(focusedIndex)}
            y1={PAD_TOP}
            y2={HEIGHT - PAD_BOTTOM}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1}
            strokeDasharray="3 4"
          />

          {data.labels.map((label, i) => (
            <text key={`xlabel-${i}`} x={xAt(i)} y={HEIGHT - 6} textAnchor="middle" fontSize="11" fill="#746e7f">
              {label}
            </text>
          ))}

          <path d={zPath} fill="none" stroke="var(--chart-purple)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <path d={cPath} fill="none" stroke="var(--chart-pink)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />

          <circle cx={cPoints[focusedIndex].x} cy={cPoints[focusedIndex].y} r={5} fill="var(--chart-pink)" stroke="#0f0817" strokeWidth={2} />
        </svg>

        <div
          className="linechart-tooltip"
          style={{
            left: `${(xAt(focusedIndex) / WIDTH) * 100}%`,
            top: `${(Math.min(zPoints[focusedIndex].y, cPoints[focusedIndex].y) / HEIGHT) * 100}%`,
          }}
        >
          <div className="linechart-tooltip-title">{data.labels[focusedIndex]}</div>
          <div className="linechart-tooltip-row">
            <span className="key">
              <span className="dot" style={{ background: 'var(--chart-purple)' }} />
              Zezting
            </span>
            <span className="val">{formatK(data.zezting[focusedIndex])}</span>
          </div>
          <div className="linechart-tooltip-row">
            <span className="key">
              <span className="dot" style={{ background: 'var(--chart-pink)' }} />
              CA
            </span>
            <span className="val">{formatK(data.ca[focusedIndex])}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
