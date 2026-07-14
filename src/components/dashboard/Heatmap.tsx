import { Fragment } from 'react';

const COLUMNS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const ROWS = ['12a', '3a', '6a', '9a', '12p', '3p', '6p', '9p', '11p'];

// value 0-100 per [row][col], evening + weekend weighted
const MATRIX: number[][] = [
  [20, 15, 10, 12, 18, 35, 30],
  [5, 5, 5, 5, 8, 15, 12],
  [10, 8, 8, 10, 12, 10, 8],
  [25, 22, 20, 24, 28, 20, 18],
  [35, 30, 32, 34, 38, 45, 40],
  [45, 48, 50, 52, 55, 60, 50],
  [55, 58, 60, 65, 70, 75, 65],
  [70, 75, 78, 80, 85, 100, 90],
  [40, 42, 45, 48, 50, 60, 55],
];

const LEGEND_STEPS = [0.92, 0.7, 0.5, 0.3, 0.12];

function cellColor(value: number) {
  const alpha = 0.08 + (value / 100) * 0.82;
  return `rgba(169, 112, 255, ${alpha.toFixed(2)})`;
}

export default function Heatmap() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Weekly engagement heatmap</span>
        <span className="panel-subtext">Calls per time block</span>
      </div>

      <div className="heatmap-scroll">
        <div className="heatmap-grid">
          <div />
          {COLUMNS.map((col) => (
            <div className="heatmap-col-label" key={col}>
              {col}
            </div>
          ))}

          {ROWS.map((row, rIdx) => (
            <Fragment key={row}>
              <div className="heatmap-row-label">{row}</div>
              {COLUMNS.map((col, cIdx) => {
                const value = MATRIX[rIdx][cIdx];
                return (
                  <div
                    key={`${row}-${col}`}
                    className="heatmap-cell"
                    style={{ background: cellColor(value) }}
                    title={`${col} ${row} · ${value} calls`}
                  />
                );
              })}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="heatmap-legend">
        <span>High</span>
        <span className="heatmap-legend-swatches">
          {LEGEND_STEPS.map((v) => (
            <span
              key={v}
              className="heatmap-legend-swatch"
              style={{ background: cellColor(v * 100) }}
            />
          ))}
        </span>
        <span>Low</span>
      </div>
    </div>
  );
}
