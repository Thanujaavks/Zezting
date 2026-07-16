import { apiGet } from '../lib/apiClient';

export interface RecordingReviewSummary {
  totalPending: number;
  newHostPending: number;
  reportedPending: number;
  normalCallPending: number;
  reviewLater: number;
  averageDurationSeconds: number;
  oldestPendingAt: string | null;
  reviewedToday: number;
}

export function fetchRecordingReviewSummary(): Promise<RecordingReviewSummary> {
  return apiGet<RecordingReviewSummary>('/api/admin/recording-reviews/summary');
}

export type RecordingTriggerType = 'NEW_HOST' | 'REPORTED';
export type RecordingReviewStatus = 'PENDING' | 'REVIEW_LATER' | 'APPROVED' | 'REJECTED';

export interface RecordingReviewHost {
  id: string | null;
  name: string;
  profilePicture: string | null;
  category: string;
}

export interface RecordingReviewUser {
  id: string;
  name: string;
}

export interface RecordingReviewItem {
  id: string;
  callId: string;
  host: RecordingReviewHost;
  user: RecordingReviewUser;
  triggerType: RecordingTriggerType;
  triggerLabel: string;
  recordedAt: string;
  durationSeconds: number;
  durationLabel: string;
  reviewStatus: RecordingReviewStatus;
  recordingUrl: string;
  nextReviewDate: string | null;
  reviewedAt: string | null;
}

export interface RecordingReviewPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface RecordingReviewsResponse {
  items: RecordingReviewItem[];
  pagination: RecordingReviewPagination;
}

export interface RecordingReviewsParams {
  page?: number;
  limit?: number;
  sortBy?: 'recordedAt';
  sortOrder?: 'asc' | 'desc';
  triggerType?: RecordingTriggerType;
}

export function fetchRecordingReviews(
  params: RecordingReviewsParams = {},
): Promise<RecordingReviewsResponse> {
  return apiGet<RecordingReviewsResponse>('/api/admin/recording-reviews', { ...params });
}
