import { apiGet } from '../lib/apiClient';

export interface HostVerificationCards {
  newHost: number;
  pending: number;
  completed: number;
  rejected: number;
}

export function fetchHostVerificationCards(): Promise<HostVerificationCards> {
  return apiGet<HostVerificationCards>('/api/admin/verifications/hosts/cards');
}

export interface PendingHostVerification {
  verificationId: string;
  hostId: string;
  name: string;
  username?: string | null;
  profileImage?: string | null;
  gender: string;
  age: number;
  city: string;
  state?: string | null;
  isCaEligible: boolean;
  submittedAt: string;
}

export interface HostVerificationPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PendingHostVerificationsResponse {
  data: PendingHostVerification[];
  pagination: HostVerificationPagination;
}

export type HostVerificationSort = 'OLD' | 'NEW';

export interface PendingHostVerificationsParams {
  page?: number;
  limit?: number;
  sort?: HostVerificationSort;
}

export function fetchPendingHostVerifications(
  params: PendingHostVerificationsParams = {},
): Promise<PendingHostVerificationsResponse> {
  return apiGet<PendingHostVerificationsResponse>('/api/admin/verifications/hosts/pending', { ...params });
}
