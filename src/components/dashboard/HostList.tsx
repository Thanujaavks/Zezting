import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, Gem } from 'lucide-react';

interface Host {
  name: string;
  age: number;
  type: 'Zezting' | 'CA';
  tier: string;
  performance: number;
  availHours: number;
  availPercent: number;
  earned: number;
  online: boolean;
  gradient: string;
}

const HOSTS: Host[] = [
  { name: 'Priya Sharma', age: 34, type: 'CA', tier: 'Diamond', performance: 84, availHours: 88.2, availPercent: 4, earned: 28400, online: true, gradient: 'linear-gradient(135deg, #a970ff, #ff2f9e)' },
  { name: 'Ananya Verma', age: 29, type: 'Zezting', tier: 'Diamond', performance: 79, availHours: 76.4, availPercent: 6, earned: 25150, online: true, gradient: 'linear-gradient(135deg, #0d9e6e, #1fbf94)' },
  { name: 'Kavya Reddy', age: 31, type: 'CA', tier: 'Platinum', performance: 76, availHours: 64.8, availPercent: 8, earned: 23980, online: false, gradient: 'linear-gradient(135deg, #ff8a3d, #ff2f9e)' },
  { name: 'Meera Nair', age: 27, type: 'Zezting', tier: 'Diamond', performance: 71, availHours: 58.1, availPercent: 5, earned: 21760, online: true, gradient: 'linear-gradient(135deg, #4f7bff, #a970ff)' },
  { name: 'Sneha Iyer', age: 33, type: 'CA', tier: 'Gold', performance: 68, availHours: 50.4, availPercent: 9, earned: 19420, online: false, gradient: 'linear-gradient(135deg, #ff5f6d, #a970ff)' },
  { name: 'Divya Menon', age: 26, type: 'Zezting', tier: 'Platinum', performance: 65, availHours: 45.7, availPercent: 7, earned: 17980, online: true, gradient: 'linear-gradient(135deg, #22c1c3, #a970ff)' },
  { name: 'Riya Kapoor', age: 30, type: 'CA', tier: 'Gold', performance: 61, availHours: 39.2, availPercent: 10, earned: 15630, online: true, gradient: 'linear-gradient(135deg, #ff2f9e, #7c1fd8)' },
];

type FilterTab = 'All' | 'Zezting' | 'CA';

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('');
}

export default function HostList() {
  const [tab, setTab] = useState<FilterTab>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return HOSTS.filter((h) => {
      const matchesTab = tab === 'All' || h.type === tab;
      const matchesQuery = h.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

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

          {filtered.map((host) => (
            <div className="host-table-row" key={host.name}>
              <span className="host-table-name-cell">
                <span className="host-avatar host-avatar-sm" style={{ background: host.gradient }}>
                  {initials(host.name)}
                </span>
                <span className="top-host-info">
                  <span className="host-link">{host.name}</span>
                  <span className="host-sub">
                    Age {host.age} · {host.type}
                  </span>
                </span>
              </span>

              <span>
                <span className="tier-badge">
                  <Gem size={11} />
                  {host.tier}
                </span>
              </span>

              <span className="cell-teal">{host.performance}%</span>
              <span className="cell-muted">
                {host.availHours}h/d · {host.availPercent}%
              </span>
              <span className="cell-teal">₹{host.earned.toLocaleString('en-IN')}</span>

              <span>
                <span className={`status-pill${host.online ? ' online' : ''}`}>
                  <span className="status-dot" />
                  {host.online ? 'Online' : 'Offline'}
                </span>
              </span>

              <span>
                <button type="button" className="btn-outline-muted small">
                  View
                </button>
              </span>
            </div>
          ))}

          {filtered.length === 0 && <div className="host-table-empty">No hosts match your filters.</div>}
        </div>
      </div>
    </div>
  );
}
