import { useEffect, useState } from 'react';
import {
  fetchAttention,
  investigateAttention,
  dismissAttention,
  type AttentionItem,
  type AttentionPartyRef,
} from '../../api/hostManagement';
import { ApiError } from '../../lib/apiClient';

const TYPE_LABELS: Record<string, string> = {
  FAKE_PROFILE: 'Fake profile suspected',
  ABUSE: 'Abuse reported',
  SPAM: 'Spam reported',
  FRAUD: 'Suspicious payout pattern',
};

function typeLabel(type: string) {
  return TYPE_LABELS[type] ?? type.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase());
}

function partyHandle(party?: AttentionPartyRef | null) {
  if (!party) return '@unknown';
  if (party.username) return `@${party.username}`;
  return party.name ?? '@unknown';
}

export default function HostsNeedingAttention() {
  const [items, setItems] = useState<AttentionItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actioningId, setActioningId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchAttention({ status: 'OPEN', limit: 5 })
      .then((res) => {
        if (cancelled) return;
        setItems(res.data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load attention items.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleAction(item: AttentionItem, action: 'investigate' | 'dismiss') {
    setActioningId(item.attentionId);
    setError(null);
    try {
      if (action === 'investigate') {
        await investigateAttention(item.attentionId);
      } else {
        await dismissAttention(item.attentionId);
      }
      setItems((prev) => (prev ? prev.filter((i) => i.attentionId !== item.attentionId) : prev));
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to update report.');
    } finally {
      setActioningId(null);
    }
  }

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Hosts Needing Attention</span>
        <button type="button" className="btn-solid-purple">
          View all
        </button>
      </div>

      {loading || !items ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : items.length === 0 ? (
        <div className="hourly-bars-empty">No hosts currently need attention.</div>
      ) : (
        <>
          {error && <span className="stat-note critical">{error}</span>}
          <div className="attention-list">
            {items.map((item) => (
              <div className="attention-card" key={item.attentionId}>
                <span className="attention-title">{typeLabel(item.type)}</span>
                <p className="attention-detail">
                  <span className="mention">{partyHandle(item.reportedBy)}</span> reported{' '}
                  <span className="mention">{partyHandle(item.targetHost)}</span>{' '}
                  {item.description ?? ''}
                </p>
                <div className="attention-actions">
                  <button
                    type="button"
                    className="btn-solid-pink"
                    disabled={actioningId === item.attentionId}
                    onClick={() => handleAction(item, 'investigate')}
                  >
                    Investigate
                  </button>
                  <button
                    type="button"
                    className="btn-outline-muted"
                    disabled={actioningId === item.attentionId}
                    onClick={() => handleAction(item, 'dismiss')}
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
