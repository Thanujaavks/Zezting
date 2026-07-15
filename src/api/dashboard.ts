import { apiGet } from '../lib/apiClient';
import type { TopHost } from './topHosts';

export type { TopHost } from './topHosts';

interface TrendMetric {
  value: number;
  previousValue: number;
  changePercent: number;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
}

export interface DashboardCards {
  dailyActiveUsers: TrendMetric;
  activeHosts: TrendMetric;
  revenueToday: TrendMetric & { currency: string };
  liveCallsNow: { value: number; status: string };
}

export function fetchDashboardCards(): Promise<DashboardCards> {
  return apiGet<DashboardCards>('/api/admin/dashboard/cards');
}

export type PlatformPerformanceRange = 'LAST_24_HOURS' | 'THIS_WEEK' | 'THIS_MONTH';

export interface PlatformPerformanceBucket {
  label: string;
  bucketStart: string;
  bucketEnd: string;
  calls: number;
  usersOnline: number;
  revenue: number;
}

export interface PlatformPerformance {
  summary: {
    peakCalls: number;
    peakUsers: number;
    totalRevenue: number;
    currency: string;
    topEngagementHour: string;
  };
  chart: PlatformPerformanceBucket[];
}

export function fetchPlatformPerformance(range?: PlatformPerformanceRange): Promise<PlatformPerformance> {
  return apiGet<PlatformPerformance>('/api/admin/dashboard/platform-performance', range ? { range } : undefined);
}

export interface PeakEngagementHour {
  rank: number;
  hour: string;
  users: number;
  isPeak: boolean;
}

export function fetchPeakEngagementHours(params?: { date?: string; limit?: number }): Promise<PeakEngagementHour[]> {
  return apiGet<PeakEngagementHour[]>('/api/admin/dashboard/peak-engagement-hours', params);
}

export interface DashboardAlerts {
  openReportsOver6Hours: number;
  pendingHostVerifications: number;
  payoutHolds: number;
}

export function fetchDashboardAlerts(): Promise<DashboardAlerts> {
  return apiGet<DashboardAlerts>('/api/admin/dashboard/alerts');
}

export function fetchDashboardTopHosts(limit = 5): Promise<TopHost[]> {
  return apiGet<TopHost[]>('/api/admin/dashboard/top-hosts', { limit });
}

export interface PlatformRate {
  _id: string;
  coins: number;
  price: number;
  currency: string;
  isActive: boolean;
  sortOrder: number;
}

export function fetchPlatformRates(): Promise<PlatformRate[]> {
  return apiGet<PlatformRate[]>('/api/admin/platform-rates');
}
