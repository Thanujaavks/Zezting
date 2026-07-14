import type { ChartSeries } from './LineChart';

export function bell(x: number, peak: number, width: number, amplitude: number) {
  return amplitude * Math.exp(-((x - peak) ** 2) / (2 * width * width));
}

export function round(n: number) {
  return Math.round(n);
}

export function catmullRomPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export interface RangeData {
  xLabels: string[];
  series: ChartSeries[];
  labelStep: number;
  leftMax: number;
  rightMax: number;
  totals: { peakCalls: number; peakUsers: number; totalRevenue: number; topEngagement: string };
}

function hourLabel(i: number) {
  if (i === 0) return '12a';
  if (i === 12) return '12p';
  return String(i % 12 === 0 ? 12 : i % 12);
}

function buildDay(): RangeData {
  const n = 24;
  const calls: number[] = [];
  const users: number[] = [];
  const revenue: number[] = [];
  for (let i = 0; i < n; i++) {
    calls.push(round(bell(i, 21, 4.5, 1020) + 8));
    users.push(round(bell(i, 19, 5.5, 4700) + 20));
    revenue.push(round(bell(i, 17, 5, 84220) + 300));
  }
  return {
    xLabels: Array.from({ length: n }, (_, i) => hourLabel(i)),
    labelStep: 2,
    leftMax: 5000,
    rightMax: 100000,
    series: [
      { id: 'call', label: 'Call', color: 'var(--chart-purple)', values: calls, axis: 'left' },
      { id: 'online', label: 'User Online', color: 'var(--chart-green)', values: users, axis: 'left' },
      { id: 'revenue', label: 'Revenue (₹, right axis)', color: 'var(--chart-pink)', values: revenue, axis: 'right' },
    ],
    totals: { peakCalls: Math.max(...calls), peakUsers: 2840, totalRevenue: 84220, topEngagement: '9 PM IST' },
  };
}

function buildWeek(): RangeData {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const n = labels.length;
  const calls: number[] = [];
  const users: number[] = [];
  const revenue: number[] = [];
  for (let i = 0; i < n; i++) {
    calls.push(round(bell(i, 5, 2.2, 4200) + 900));
    users.push(round(bell(i, 5, 2.4, 16800) + 2600));
    revenue.push(round(bell(i, 4.3, 2, 312000) + 60000));
  }
  return {
    xLabels: labels,
    labelStep: 1,
    leftMax: 20000,
    rightMax: 400000,
    series: [
      { id: 'call', label: 'Call', color: 'var(--chart-purple)', values: calls, axis: 'left' },
      { id: 'online', label: 'User Online', color: 'var(--chart-green)', values: users, axis: 'left' },
      { id: 'revenue', label: 'Revenue (₹, right axis)', color: 'var(--chart-pink)', values: revenue, axis: 'right' },
    ],
    totals: {
      peakCalls: Math.max(...calls),
      peakUsers: Math.max(...users),
      totalRevenue: revenue.reduce((a, b) => a + b, 0),
      topEngagement: 'Saturday',
    },
  };
}

function buildMonth(): RangeData {
  const labels = ['W1', 'W2', 'W3', 'W4'];
  const n = labels.length;
  const calls: number[] = [];
  const users: number[] = [];
  const revenue: number[] = [];
  for (let i = 0; i < n; i++) {
    calls.push(round(bell(i, 2.3, 1.6, 17500) + 4200));
    users.push(round(bell(i, 2.3, 1.6, 68000) + 12000));
    revenue.push(round(bell(i, 2.1, 1.5, 1180000) + 260000));
  }
  return {
    xLabels: labels,
    labelStep: 1,
    leftMax: 80000,
    rightMax: 1600000,
    series: [
      { id: 'call', label: 'Call', color: 'var(--chart-purple)', values: calls, axis: 'left' },
      { id: 'online', label: 'User Online', color: 'var(--chart-green)', values: users, axis: 'left' },
      { id: 'revenue', label: 'Revenue (₹, right axis)', color: 'var(--chart-pink)', values: revenue, axis: 'right' },
    ],
    totals: {
      peakCalls: Math.max(...calls),
      peakUsers: Math.max(...users),
      totalRevenue: revenue.reduce((a, b) => a + b, 0),
      topEngagement: 'Week 3',
    },
  };
}

export type ChartRange = 'day' | 'week' | 'month';

export function getRangeData(range: ChartRange): RangeData {
  if (range === 'week') return buildWeek();
  if (range === 'month') return buildMonth();
  return buildDay();
}

export function formatK(v: number): string {
  if (v >= 1000) return `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K`;
  return String(v);
}

export function formatRupee(v: number): string {
  if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
  if (v >= 1000) return `₹${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}K`;
  return `₹${v}`;
}

export function niceTicks(max: number, steps = 6): number[] {
  const ticks: number[] = [];
  for (let i = steps; i >= 0; i--) {
    ticks.push(round((max / steps) * i));
  }
  return ticks;
}
