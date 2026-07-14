import { useMemo, useState } from 'react';
import { Search, Coins } from 'lucide-react';

interface UserRow {
  name: string;
  org: string;
  type: string;
  contact: string;
  coins: number;
  totalTime: string;
  online: boolean;
  reports: number;
  isHighSpender: boolean;
  isNew: boolean;
}

const USERS: UserRow[] = [
  { name: 'Arun', org: 'Zezting', type: 'CA', contact: '+91 98765 ****', coins: 3200, totalTime: '36 hr 25 min', online: true, reports: 3, isHighSpender: false, isNew: false },
  { name: 'Isha', org: 'Zezting', type: 'CA', contact: '+91 91234 ****', coins: 6100, totalTime: '42 hr 10 min', online: true, reports: 0, isHighSpender: true, isNew: true },
  { name: 'Noah', org: 'InnoTech', type: 'CA', contact: '+1 234 890 ****', coins: 5200, totalTime: '50 hr 15 min', online: false, reports: 1, isHighSpender: true, isNew: false },
  { name: 'Liam', org: 'DevSolutions', type: 'UK', contact: '+44 123 456 ****', coins: 2800, totalTime: '15 hr 45 min', online: true, reports: 2, isHighSpender: false, isNew: true },
  { name: 'Maya', org: 'TechWave', type: 'US', contact: '+1 234 567 ****', coins: 4500, totalTime: '28 hr 10 min', online: false, reports: 5, isHighSpender: false, isNew: false },
  { name: 'Ava', org: 'WebMasters', type: 'NZ', contact: '+64 123 456 ****', coins: 3900, totalTime: '32 hr 5 min', online: true, reports: 3, isHighSpender: false, isNew: false },
  { name: 'Sofia', org: 'CodeCrafters', type: 'AU', contact: '+61 987 654 ****', coins: 3600, totalTime: '40 hr 20 min', online: true, reports: 4, isHighSpender: false, isNew: false },
];

type FilterTab = 'All' | 'Active' | 'High Spender' | 'New User' | 'Reported';

const TABS: FilterTab[] = ['All', 'Active', 'High Spender', 'New User', 'Reported'];

export default function UserDirectory() {
  const [tab, setTab] = useState<FilterTab>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return USERS.filter((u) => {
      const matchesTab =
        tab === 'All' ||
        (tab === 'Active' && u.online) ||
        (tab === 'High Spender' && u.isHighSpender) ||
        (tab === 'New User' && u.isNew) ||
        (tab === 'Reported' && u.reports > 0);
      const matchesQuery = u.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

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

          {filtered.map((user) => (
            <div className="user-table-row" key={user.name}>
              <span className="host-table-name-cell">
                <span className="user-avatar" />
                <span className="top-host-info">
                  <span className="user-name">{user.name}</span>
                  <span className="host-sub">
                    {user.org} · {user.type}
                  </span>
                </span>
              </span>

              <span className="cell-muted">{user.contact}</span>

              <span className="user-coins">
                <Coins size={14} />
                {user.coins.toLocaleString('en-IN')}
              </span>

              <span className="cell-muted">{user.totalTime}</span>

              <span>
                <span className={`status-pill${user.online ? ' online' : ''}`}>
                  <span className="status-dot" />
                  {user.online ? 'Online' : 'Offline'}
                </span>
              </span>

              <span>{user.reports} Report</span>

              <span>
                <button type="button" className="btn-outline-muted small">
                  Remove
                </button>
              </span>
            </div>
          ))}

          {filtered.length === 0 && <div className="host-table-empty">No users match your filters.</div>}
        </div>
      </div>
    </div>
  );
}
