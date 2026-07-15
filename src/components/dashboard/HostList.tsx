import { useEffect, useState } from 'react';
import { Search, SlidersHorizontal, Gem } from 'lucide-react';
import { fetchHostList, type HostListItem, type HostType } from '../../api/hostManagement';
import { ApiError } from '../../lib/apiClient';
import { formatCurrency } from '../../lib/format';

type FilterTab = 'All' | 'Zezting' | 'CA';

const TAB_TO_TYPE: Record<FilterTab, HostType> = {
  All: 'ALL',
  Zezting: 'ZEZTING',
  CA: 'CA',
};

const GRADIENTS = [
  'linear-gradient(135deg, #a970ff, #ff2f9e)',
  'linear-gradient(135deg, #0d9e6e, #1fbf94)',
  'linear-gradient(135deg, #ff8a3d, #ff2f9e)',
  'linear-gradient(135deg, #4f7bff, #a970ff)',
  'linear-gradient(135deg, #ff5f6d, #a970ff)',
  'linear-gradient(135deg, #22c1c3, #a970ff)',
  'linear-gradient(135deg, #ff2f9e, #7c1fd8)',
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('');
}

function typeLabel(hostType: HostListItem['hostType']): 'Zezting' | 'CA' {
  return hostType === 'CA' ? 'CA' : 'Zezting';
}

const LIMIT = 20;

export default function HostList() {
  const [tab, setTab] = useState<FilterTab>('All');
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [page, setPage] = useState(1);

  const [hosts, setHosts] = useState<HostListItem[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 400);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    setPage(1);
  }, [tab, debouncedQuery]);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchHostList({
      page,
      limit: LIMIT,
      type: TAB_TO_TYPE[tab],
      search: debouncedQuery || undefined,
    })
      .then((res) => {
        if (cancelled) return;
        setHosts(res.data);
        setTotalPages(Math.max(1, res.pagination.totalPages));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load hosts.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [tab, debouncedQuery, page]);

  return (
    <div className="panel">
      <div className="host-list-head">
        <span className="panel-title">Host List</span>

        <div className="filter-tabs">
          {(['All', 'Zezting', 'CA'] as FilterTab[]).map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-tab${tab === t ? ' active' : ''}`}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="host-list-actions">
          <div className="host-search">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search hosts"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button type="button" className="icon-btn" aria-label="Filter options">
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      <div className="host-table-scroll">
        <div className="host-table">
          <div className="host-table-row host-table-head-row">
            <span>Host</span>
            <span>Tier</span>
            <span>Performance</span>
            <span>Avail.</span>
            <span>Earned(Mo)</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {loading || error || !hosts ? (
            <div className="host-table-empty">{error ?? 'Loading…'}</div>
          ) : hosts.length === 0 ? (
            <div className="host-table-empty">No hosts match your filters.</div>
          ) : (
            hosts.map((host, index) => (
              <div className="host-table-row" key={host.hostId}>
                <span className="host-table-name-cell">
                  <span
                    className="host-avatar host-avatar-sm"
                    style={
                      host.profileImage
                        ? { backgroundImage: `url(${host.profileImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                        : { background: GRADIENTS[index % GRADIENTS.length] }
                    }
                  >
                    {!host.profileImage && initials(host.name)}
                  </span>
                  <span className="top-host-info">
                    <span className="host-link">{host.name}</span>
                    <span className="host-sub">
                      {host.age != null ? `Age ${host.age}` : 'Age —'} · {typeLabel(host.hostType)}
                    </span>
                  </span>
                </span>

                <span>
                  <span className="tier-badge">
                    <Gem size={11} />
                    {host.tier ?? 'Unranked'}
                  </span>
                </span>

                <span className="cell-teal">{host.performancePercent}%</span>
                <span className="cell-muted">
                  {host.availability.hours}h/d · {host.availability.percentage}%
                </span>
                <span className="cell-teal">{formatCurrency(host.estimatedMonthAmount, host.currency)}</span>

                <span>
                  <span className={`status-pill${host.onlineStatus !== 'OFFLINE' ? ' online' : ''}`}>
                    <span className="status-dot" />
                    {host.onlineStatus !== 'OFFLINE' ? 'Online' : 'Offline'}
                  </span>
                </span>

                <span>
                  <button type="button" className="btn-outline-muted small">
                    View
                  </button>
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {!loading && !error && hosts && hosts.length > 0 && (
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
