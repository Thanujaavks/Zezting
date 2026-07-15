import { useEffect, useState } from 'react';
import { ChevronRight, ArrowLeftRight } from 'lucide-react';
import { fetchPendingHostVerifications, type PendingHostVerification } from '../../api/hostVerification';
import { ApiError } from '../../lib/apiClient';

type SortOrder = 'old' | 'new';

const SORT_PARAM: Record<SortOrder, 'OLD' | 'NEW'> = { old: 'OLD', new: 'NEW' };

export default function PendingVerifications() {
  const [sort, setSort] = useState<SortOrder>('new');
  const [cards, setCards] = useState<PendingHostVerification[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchPendingHostVerifications({ page: 1, limit: 12, sort: SORT_PARAM[sort] })
      .then((res) => {
        if (cancelled) return;
        setCards(res.data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load pending verifications.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [sort]);

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Pending verifications</span>
        <div className="sort-toggle">
          <button
            type="button"
            className={sort === 'old' ? 'active' : ''}
            onClick={() => setSort('old')}
          >
            Old
          </button>
          <ArrowLeftRight size={13} />
          <button
            type="button"
            className={sort === 'new' ? 'active' : ''}
            onClick={() => setSort('new')}
          >
            New
          </button>
        </div>
      </div>

      {loading || !cards ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : cards.length === 0 ? (
        <div className="hourly-bars-empty">No pending verifications.</div>
      ) : (
        <>
          {error && <span className="stat-note critical">{error}</span>}
          <div className="verification-grid">
            {cards.map((card) => (
              <button type="button" className="verification-card" key={card.verificationId}>
                <span className="verification-card-head">
                  <span className="verification-card-name">{card.name}</span>
                  <ChevronRight size={16} />
                </span>
                <span className="verification-card-sub">
                  {card.gender} <span className="dot-sep">•</span> {card.age} <span className="dot-sep">•</span> {card.city}
                </span>
                <span className="verification-badges">
                  <span className="badge-pending">Pending Approval</span>
                  <span className="badge-eligible">{card.isCaEligible ? 'CA' : 'Zezting'} Eligible</span>
                </span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
