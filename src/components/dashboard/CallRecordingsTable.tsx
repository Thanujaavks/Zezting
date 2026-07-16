import { useEffect, useState } from 'react';
import { Play, Sparkles, Flag } from 'lucide-react';
import {
  fetchRecordingReviews,
  type RecordingReviewItem,
  type RecordingTriggerType,
} from '../../api/callMonitor';
import { ApiError } from '../../lib/apiClient';

type FilterTab = 'All' | 'New Host Check' | 'Report Check';

const TABS: FilterTab[] = ['All', 'New Host Check', 'Report Check'];

const TAB_TO_TRIGGER: Record<FilterTab, RecordingTriggerType | undefined> = {
  All: undefined,
  'New Host Check': 'NEW_HOST',
  'Report Check': 'REPORTED',
};

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  REVIEW_LATER: 'Review Later',
  APPROVED: 'Approved',
  REJECTED: 'Rejected',
};

function statusLabel(status: string) {
  return STATUS_LABELS[status] ?? status;
}

function formatRecordedAt(iso: string) {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

const LIMIT = 20;

export default function CallRecordingsTable() {
  const [tab, setTab] = useState<FilterTab>('All');
  const [page, setPage] = useState(1);

  const [items, setItems] = useState<RecordingReviewItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPage(1);
  }, [tab]);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchRecordingReviews({
      page,
      limit: LIMIT,
      sortBy: 'recordedAt',
      sortOrder: 'desc',
      triggerType: TAB_TO_TRIGGER[tab],
    })
      .then((res) => {
        if (cancelled) return;
        setItems(res.items);
        setTotalPages(Math.max(1, res.pagination.totalPages));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load recordings.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab, page]);

  return (
    <div className="panel">
      <div className="panel-head call-monitor-head">
        <span className="panel-title">Recordings pending admin review</span>

        <div className="filter-tabs call-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-tab call-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="host-table-scroll">
        <div className="call-table">
          <div className="user-table-row user-table-head-row">
            <span>Host</span>
            <span>Trigger</span>
            <span>Recorded At</span>
            <span>Duration</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {loading || error || !items ? (
            <div className="host-table-empty">{error ?? 'Loading…'}</div>
          ) : items.length === 0 ? (
            <div className="host-table-empty">No recordings match this filter.</div>
          ) : (
            items.map((rec) => (
              <div className="call-table-row" key={rec.id}>
                <span className="host-table-name-cell">
                  <span
                    className="user-avatar"
                    style={
                      rec.host.profilePicture
                        ? {
                            backgroundImage: `url(${rec.host.profilePicture})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : undefined
                    }
                  />
                  <span className="top-host-info">
                    <span className="user-name">{rec.host.name}</span>
                    <span className="host-sub">
                      {rec.host.category} · Call with {rec.user.name}
                    </span>
                  </span>
                </span>

                <span>
                  {rec.triggerType === 'NEW_HOST' ? (
                    <span className="trigger-badge new-host">
                      <Sparkles size={12} />
                      {rec.triggerLabel}
                    </span>
                  ) : (
                    <span className="trigger-badge reported">
                      <Flag size={12} />
                      {rec.triggerLabel}
                    </span>
                  )}
                </span>

                <span className="cell-muted">{formatRecordedAt(rec.recordedAt)}</span>

                <span className="cell-muted">{rec.durationLabel}</span>

                <span className={`call-status${rec.reviewStatus === 'PENDING' ? ' pending' : ''}`}>
                  {statusLabel(rec.reviewStatus)}
                </span>

                <span className="call-actions">
                  <a
                    className="btn-listen"
                    href={rec.recordingUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Play size={12} fill="currentColor" />
                    Listen
                  </a>
                  <button type="button" className="btn-review-later">
                    Review Later
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {!loading && !error && items && items.length > 0 && (
        <div className="host-list-pagination">
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            type="button"
            className="btn-outline-muted small"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <button
            type="button"
            className="btn-outline-muted small"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
