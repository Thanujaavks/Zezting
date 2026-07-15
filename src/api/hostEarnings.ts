import { apiGet } from '../lib/apiClient';
import type { TrendMetric } from '../lib/trend';
import type { TopHost } from './topHosts';

export type { TopHost } from './topHosts';

export interface HostEarningsAvg extends TrendMetric {
  currency: string;
  zeztingComparisonRatio?: number | null;
  comparisonLabel?: string | null;
}

export interface HostEarningsCards {
  totalPayoutMonth: TrendMetric & { currency: string };
  caHostAvg: HostEarningsAvg;
  zeztingHostAvg: TrendMetric & { currency: string };
  bonusesAwarded: TrendMetric & { currency: string; bonusCoins: number; countThisWeek: number };
}

export function fetchHostEarningsCards(): Promise<HostEarningsCards> {
  return apiGet<HostEarningsCards>('/api/admin/host-earnings/cards');
}

export function fetchTopEarningHosts(limit = 3): Promise<TopHost[]> {
  return apiGet<TopHost[]>('/api/admin/host-earnings/top-hosts', { limit });
}
