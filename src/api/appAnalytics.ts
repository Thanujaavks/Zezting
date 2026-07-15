import { apiGet } from '../lib/apiClient';
import type { TrendMetric } from '../lib/trend';

export interface AppAnalyticsCards {
  dailyActiveUsers: TrendMetric;
  activeHosts: TrendMetric;
  revenueToday: TrendMetric & { currency: string };
  liveCallsNow: { value: number; status: string };
}

export function fetchAppAnalyticsCards(): Promise<AppAnalyticsCards> {
  return apiGet<AppAnalyticsCards>('/api/admin/app-analytics/cards');
}

export interface HourlyActivityBucket {
  hour: number;
  label: string;
  bucketStart: string;
  bucketEnd: string;
  activeUsers: number;
  newUsers: number;
  calls: number;
  purchases: number;
  activityScore: number;
}

export function fetchHourlyActivity(date: string): Promise<HourlyActivityBucket[]> {
  return apiGet<HourlyActivityBucket[]>('/api/admin/app-analytics/hourly-activity', { date });
}

export interface GrowthSignal {
  key: string;
  label: string;
  value: number;
  unit: 'COUNT' | 'PERCENT' | 'HOURS';
  progressPercent: number;
  previousValue: number;
  changePercent: number;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
}

export function fetchGrowthSignals(): Promise<GrowthSignal[]> {
  return apiGet<GrowthSignal[]>('/api/admin/app-analytics/growth-signals');
}

export interface FeatureUsage {
  key: string;
  label: string;
  users: number;
  sessions: number;
  percentage: number;
}

export function fetchFeatureUsage(): Promise<FeatureUsage[]> {
  return apiGet<FeatureUsage[]>('/api/admin/app-analytics/feature-usage');
}

export interface TopState {
  label: string;
  activeUsers: number;
}

export function fetchTopStates(limit = 6): Promise<TopState[]> {
  return apiGet<TopState[]>('/api/admin/app-analytics/top-states', { limit });
}
