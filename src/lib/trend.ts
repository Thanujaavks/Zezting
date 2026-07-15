import type { StatCard } from '../components/dashboard/StatCards';

export interface TrendMetric {
  value: number;
  previousValue: number;
  changePercent: number;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
}

export function trendDelta(metric: TrendMetric): Partial<StatCard> {
  if (metric.trend === 'NEUTRAL') {
    return { note: 'No change vs yesterday', noteTone: 'muted' };
  }
  return { delta: `${Math.abs(metric.changePercent)}% vs yesterday` };
}
