import { useMemo, useRef, useState } from 'react';
import { catmullRomPath } from './chartData';

export interface ChartSeries {
  id: string;
  label: string;
  color: string;
  values: number[];
  axis: 'left' | 'right';
}

interface LineChartProps {
  series: ChartSeries[];
  xLabels: string[];
  leftTicks: number[];
  rightTicks: number[];
  leftMax: number;
  rightMax: number;
  formatLeft: (v: number) => string;
  formatRight: (v: number) => string;
  labelStep?: number;
}

const WIDTH = 1000;
const HEIGHT = 380;
const PAD_LEFT = 46;
const PAD_RIGHT = 54;
const PAD_TOP = 12;
const PAD_BOTTOM = 30;

export default function LineChart({
  series,
  xLabels,
  leftTicks,
  rightTicks,
  leftMax,
  rightMax,
  formatLeft,
  formatRight,
  labelStep = 1,
}: LineChartProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const n = xLabels.length;
  const plotWidth = WIDTH - PAD_LEFT - PAD_RIGHT;
  const plotHeight = HEIGHT - PAD_TOP - PAD_BOTTOM;

  const xAt = (i: number) => PAD_LEFT + (n === 1 ? 0 : (i / (n - 1)) * plotWidth);
  const yAt = (value: number, axisMax: number) => PAD_TOP + (1 - value / axisMax) * plotHeight;

  const paths = useMemo(
    () =>
      series.map((s) => {
        const axisMax = s.axis === 'left' ? leftMax : rightMax;
        const points = s.values.map((v, i) => ({ x: xAt(i), y: yAt(v, axisMax) }));
        return { ...s, points, d: catmullRomPath(points) };
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [series, leftMax, rightMax, n],
  );

  const handleMove = (clientX: number) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((clientX - rect.left) / rect.width) * WIDTH;
    const ratio = (relX - PAD_LEFT) / plotWidth;
    const idx = Math.round(ratio * (n - 1));
    setHoverIndex(Math.min(n - 1, Math.max(0, idx)));
  };

  const tooltipLeftPct = hoverIndex !== null ? (xAt(hoverIndex) / WIDTH) * 100 : 0;
  const tooltipTopPct =
    hoverIndex !== null
      ? (Math.max(PAD_TOP, Math.min(...paths.map((p) => p.points[hoverIndex].y)) - 14) / HEIGHT) * 100
      : 0;

  return (
    <div className="linechart-wrap">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        onMouseMove={(e) => handleMove(e.clientX)}
        onMouseLeave={() => setHoverIndex(null)}
        onTouchMove={(e) => e.touches[0] && handleMove(e.touches[0].clientX)}
        onTouchEnd={() => setHoverIndex(null)}
      >
        {leftTicks.map((tick, i) => {
          const y = yAt(tick, leftMax);
          return (
            <g key={`grid-${tick}-${i}`}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={y}
                y2={y}
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={1}
              />
              <text x={PAD_LEFT - 10} y={y + 4} textAnchor="end" fontSize="11" fill="#746e7f">
                {formatLeft(tick)}
              </text>
              <text
                x={WIDTH - PAD_RIGHT + 10}
                y={y + 4}
                textAnchor="start"
                fontSize="11"
                fill="#746e7f"
              >
                {formatRight(rightTicks[i] ?? 0)}
              </text>
            </g>
          );
        })}

        {xLabels.map((label, i) =>
          i % labelStep === 0 ? (
            <text
              key={`xlabel-${i}`}
              x={xAt(i)}
              y={HEIGHT - 6}
              textAnchor="middle"
              fontSize="11"
              fill="#746e7f"
            >
              {label}
            </text>
          ) : null,
        )}

        {hoverIndex !== null && (
          <line
            x1={xAt(hoverIndex)}
            x2={xAt(hoverIndex)}
            y1={PAD_TOP}
            y2={HEIGHT - PAD_BOTTOM}
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={1}
            strokeDasharray="3 4"
          />
        )}

        {paths.map((p) => (
          <path key={p.id} d={p.d} fill="none" stroke={p.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
        ))}

        {hoverIndex !== null &&
          paths.map((p) => (
            <circle
              key={`dot-${p.id}`}
              cx={p.points[hoverIndex].x}
              cy={p.points[hoverIndex].y}
              r={5}
              fill={p.color}
              stroke="#0f0817"
              strokeWidth={2}
            />
          ))}
      </svg>

      {hoverIndex !== null && (
        <div
          className="linechart-tooltip"
          style={{ left: `${tooltipLeftPct}%`, top: `${tooltipTopPct}%` }}
        >
          <div className="linechart-tooltip-title">{xLabels[hoverIndex]}</div>
          {series.map((s) => (
            <div className="linechart-tooltip-row" key={s.id}>
              <span className="key">
                <span className="dot" style={{ background: s.color }} />
                {s.label}
              </span>
              <span className="val">
                {s.axis === 'left' ? formatLeft(s.values[hoverIndex]) : formatRight(s.values[hoverIndex])}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
