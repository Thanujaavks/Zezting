import { useEffect, useMemo, useState } from 'react';
import { Search, Coins } from 'lucide-react';
import { fetchUsersOverview, type UserDirectoryEntry } from '../../api/users';
import { ApiError } from '../../lib/apiClient';

type FilterTab = 'All' | 'Active' | 'High Spender' | 'New User' | 'Reported';

const TABS: FilterTab[] = ['All', 'Active', 'High Spender', 'New User', 'Reported'];

const UNSUPPORTED_TABS: FilterTab[] = ['High Spender', 'New User'];

function formatStatus(status: UserDirectoryEntry['status']) {
  return status.charAt(0) + status.slice(1).toLowerCase();
}

export default function UserDirectory() {
  const [tab, setTab] = useState<FilterTab>('All');
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState<UserDirectoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchUsersOverview()
      .then((overview) => {
        if (!cancelled) setUsers(overview.directory.data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load users.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesTab =
        tab === 'All' ||
        (tab === 'Active' && u.onlineStatus === 'ONLINE') ||
        (tab === 'Reported' && u.reportsCount > 0);
      const matchesQuery =
        u.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        (u.username ?? '').toLowerCase().includes(query.trim().toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [tab, query, users]);

  return (
    <div className="panel">
      <div className="user-directory-head">
        <span className="panel-title">User Directory</span>

        <div className="host-search">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search user"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="filter-tabs user-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              type="button"
              className={`filter-tab${tab === t ? ' active' : ''}`}
              disabled={UNSUPPORTED_TABS.includes(t)}
              title={UNSUPPORTED_TABS.includes(t) ? 'Coming soon' : undefined}
              onClick={() => setTab(t)}
            >
              {t}
            </button>
          ))}
          <button type="button" className="filter-tab">
            Export
          </button>
        </div>
      </div>

      <div className="host-table-scroll">
        <div className="user-table">
          <div className="user-table-row user-table-head-row">
            <span>User</span>
            <span>Contact</span>
            <span>Coins</span>
            <span>Total Time</span>
            <span>Status</span>
            <span>Reports</span>
            <span>Action</span>
          </div>

          {loading && <div className="host-table-empty">Loading users…</div>}

          {!loading && error && <div className="host-table-empty">{error}</div>}

          {!loading &&
            !error &&
            filtered.map((user) => (
              <div className="user-table-row" key={user.userId}>
                <span className="host-table-name-cell">
                  <span className="user-avatar" />
                  <span className="top-host-info">
                    <span className="user-name">{user.name}</span>
                    <span className="host-sub">{user.username ? `@${user.username}` : formatStatus(user.status)}</span>
                  </span>
                </span>

                <span className="cell-muted">{user.contact}</span>

                <span className="user-coins">
                  <Coins size={14} />
                  {user.coins.toLocaleString('en-IN')}
                </span>

                <span className="cell-muted">{user.totalTimeLabel}</span>

                <span>
                  <span className={`status-pill${user.onlineStatus === 'ONLINE' ? ' online' : ''}`}>
                    <span className="status-dot" />
                    {user.onlineStatus === 'ONLINE' ? 'Online' : 'Offline'}
                  </span>
                </span>

                <span>{user.reportsCount} Report</span>

                <span>
                  <button type="button" className="btn-outline-muted small" disabled={!user.action.canRemove}>
                    Remove
                  </button>
                </span>
              </div>
            ))}

          {!loading && !error && filtered.length === 0 && (
            <div className="host-table-empty">No users match your filters.</div>
          )}
        </div>
      </div>
    </div>
  );
}
