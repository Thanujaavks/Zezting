import { apiGet } from '../lib/apiClient';

export interface PlatformExpenseSummary {
  revenueMo: number;
  hostPayouts: number;
  platformCosts: number;
  netProfit: number;
  netProfitMargin: number;
  revenueGrowthPercent: number;
  hostPayoutChangePercent: number;
}

export function fetchPlatformExpenseSummary(month: string): Promise<PlatformExpenseSummary> {
  return apiGet<PlatformExpenseSummary>('/api/admin/platform-expenses/summary', { month });
}
