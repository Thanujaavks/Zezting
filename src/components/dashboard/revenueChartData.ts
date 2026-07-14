import { bell, round } from './chartData';

export interface RevenueRangeData {
  labels: string[];
  zezting: number[];
  ca: number[];
  bars: number[];
  axisMax: number;
  selectedIndex: number;
  headline: number;
  growthPercent: number;
}

function buildRange(labels: string[], zPeak: number, cPeak: number, width: number, zAmp: number, cAmp: number): RevenueRangeData {
  const n = labels.length;
  const zezting: number[] = [];
  const ca: number[] = [];
  const bars: number[] = [];
  for (let i = 0; i < n; i++) {
    zezting.push(round(bell(i, zPeak, width, zAmp) + zAmp * 0.28));
    ca.push(round(bell(i, cPeak, width, cAmp) + cAmp * 0.3));
    bars.push(round(bell(i, cPeak, width * 0.8, 100) + 22));
  }
  const axisMax = Math.ceil(Math.max(...zezting, ...ca) / 10000) * 10000;
  const selectedIndex = bars.indexOf(Math.max(...bars));
  const headline = zezting.reduce((a, b) => a + b, 0) + ca.reduce((a, b) => a + b, 0);
  const growthPercent = Math.round(((Math.max(...ca) - ca[0]) / ca[0]) * 1000) / 10;
  return { labels, zezting, ca, bars, axisMax, selectedIndex, headline, growthPercent };
}

export type RevenueRange = 'day' | 'week' | 'month' | 'year';

export function getRevenueRangeData(range: RevenueRange): RevenueRangeData {
  if (range === 'day') {
    const labels = Array.from({ length: 12 }, (_, i) => (i === 0 ? '12a' : i === 6 ? '12p' : String(i > 6 ? i - 6 : i)));
    return buildRange(labels, 8, 8.5, 2.2, 9000, 11000);
  }
  if (range === 'week') {
    return buildRange(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], 3.5, 4.2, 1.8, 14000, 24000);
  }
  if (range === 'month') {
    return buildRange(['W1', 'W2', 'W3', 'W4'], 1.4, 1.8, 1.1, 16000, 28000);
  }
  return buildRange(
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    2.4,
    4.2,
    2.6,
    18000,
    32000,
  );
}
