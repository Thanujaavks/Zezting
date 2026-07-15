import { apiGet } from '../lib/apiClient';

export type UserAccountStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BLOCKED' | 'REMOVED' | 'PENDING';
export type UserOnlineStatus = 'ONLINE' | 'OFFLINE';

export interface UserDirectoryEntry {
  userId: string;
  name: string;
  username: string | null;
  profileImage: string | null;
  subtitle: string | null;
  contact: string;
  coins: number;
  totalTimeSeconds: number;
  totalTimeLabel: string;
  status: UserAccountStatus;
  onlineStatus: UserOnlineStatus;
  reportsCount: number;
  action: { canRemove: boolean };
}

interface KpiMetric {
  value: number;
  previousValue: number;
  changePercent: number;
  trend: 'UP' | 'DOWN' | 'NEUTRAL';
}

export interface UsersCards {
  totalUsers: KpiMetric;
  onlineNow: KpiMetric;
  avgSpendPerUser: KpiMetric & { currency: string };
  neverCalledRisk: { value: number; unit: string; description: string; riskLabel: string };
}

export interface UsersOverview {
  cards: UsersCards;
  directory: {
    data: UserDirectoryEntry[];
    pagination: { page: number; limit: number; total: number; totalPages: number };
  };
}

export type UsersOverviewRange = 'TODAY' | 'LAST_24_HOURS' | 'THIS_WEEK' | 'THIS_MONTH';

export function fetchUsersOverview(range?: UsersOverviewRange): Promise<UsersOverview> {
  return apiGet<UsersOverview>('/api/admin/users/overview', range ? { range } : undefined);
}

export function fetchUsersCards(): Promise<UsersCards> {
  return apiGet<UsersCards>('/api/admin/users/cards');
}
