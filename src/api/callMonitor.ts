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
