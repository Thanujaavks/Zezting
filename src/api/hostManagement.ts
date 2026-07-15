import { apiGet, apiPatch } from '../lib/apiClient';
import type { TrendMetric } from '../lib/trend';
import type { TopHost } from './topHosts';

export type { TopHost } from './topHosts';

export interface HostManagementCards {
  totalHosts: TrendMetric;
  caHosts: TrendMetric;
  zeztingHosts: TrendMetric;
  liveCallsNow: { value: number; status: string };
}

export function fetchHostManagementCards(): Promise<HostManagementCards> {
  return apiGet<HostManagementCards>('/api/admin/host-management/cards');
}

export function fetchTopHosts(limit = 3): Promise<TopHost[]> {
  return apiGet<TopHost[]>('/api/admin/host-management/top-hosts', { limit });
}

export type HostType = 'ALL' | 'CA' | 'ZEZTING';
export type HostOnlineStatus = 'ONLINE' | 'OFFLINE' | 'AVAILABLE' | 'BUSY' | 'IN_CALL';
export type HostStatus = 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'BLOCKED' | 'PENDING' | 'REJECTED';

export interface HostListItem {
  hostId: string;
  name: string;
  username: string | null;
  profileImage: string | null;
  age: number | null;
  hostType: 'CA' | 'STANDARD' | string;
  tier: string | null;
  performancePercent: number;
  availability: { hours: number; percentage: number };
  earnedMonthCoins: number;
  estimatedMonthAmount: number;
  currency: string;
  status: HostStatus;
  onlineStatus: HostOnlineStatus;
  isLive: boolean;
  rating: number;
  totalCallsThisMonth: number;
}

export interface HostListPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface HostListResponse {
  data: HostListItem[];
  pagination: HostListPagination;
}

export interface HostListParams {
  page?: number;
  limit?: number;
  type?: HostType;
  search?: string;
  minRating?: number;
  minPerformance?: number;
}

export function fetchHostList(params: HostListParams): Promise<HostListResponse> {
  return apiGet<HostListResponse>('/api/admin/host-management/hosts', { ...params });
}

export type AttentionStatus = 'OPEN' | 'IN_REVIEW' | 'DISMISSED' | 'RESOLVED';

export interface AttentionPartyRef {
  name?: string | null;
  username?: string | null;
}

export interface AttentionItem {
  attentionId: string;
  type: string;
  status: AttentionStatus;
  reportedBy?: AttentionPartyRef | null;
  targetHost?: AttentionPartyRef | null;
  description?: string | null;
  createdAt?: string;
}

export interface AttentionListResponse {
  data: AttentionItem[];
  pagination: HostListPagination;
}

export interface AttentionListParams {
  page?: number;
  limit?: number;
  status?: AttentionStatus;
  type?: string;
  search?: string;
}

export function fetchAttention(params: AttentionListParams = {}): Promise<AttentionListResponse> {
  return apiGet<AttentionListResponse>('/api/admin/host-management/attention', { ...params });
}

export interface AttentionActionPayload {
  reason?: string;
  adminRemark?: string;
}

export function investigateAttention(
  attentionId: string,
  payload?: AttentionActionPayload,
): Promise<AttentionItem> {
  return apiPatch<AttentionItem>(`/api/admin/host-management/attention/${attentionId}/investigate`, payload ?? {});
}

export function dismissAttention(
  attentionId: string,
  payload?: AttentionActionPayload,
): Promise<AttentionItem> {
  return apiPatch<AttentionItem>(`/api/admin/host-management/attention/${attentionId}/dismiss`, payload ?? {});
}
