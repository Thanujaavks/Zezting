import { useMemo, useState } from 'react';
import { Search, ChevronDown, Lock, Unlock, Check } from 'lucide-react';

type EarningsStatus = 'lockout' | 'available' | 'paid';
type HostType = 'Zezting' | 'CA';

interface EarningsRow {
  name: string;
  age: number;
  type: HostType;
  amount: number;
  requestedOn: string;
  lockoutExpires: string;
  status: EarningsStatus;
  gradient: string;
}

const ROWS: EarningsRow[] = [
  { name: 'Priya Sharma', age: 34, type: 'CA', amount: 28400, requestedOn: '28 Mar 10:14', lockoutExpires: '31 Mar 10:14', status: 'lockout', gradient: 'linear-gradient(135deg, #a970ff, #ff2f9e)' },
  { name: 'Ravi Kumar', age: 29, type: 'Zezting', amount: 34750, requestedOn: '30 Mar 11:00', lockoutExpires: '01 Apr 11:00', status: 'lockout', gradient: 'linear-gradient(135deg, #4f7bff, #a970ff)' },
  { name: 'Anita Desai', age: 42, type: 'CA', amount: 22600, requestedOn: '28 Mar 09:30', lockoutExpires: '30 Mar 09:30', status: 'available', gradient: 'linear-gradient(135deg, #ff8a3d, #ff2f9e)' },
  { name: 'Kavya Reddy', age: 31, type: 'CA', amount: 28400, requestedOn: '28 Mar 10:14', lockoutExpires: '31 Mar 10:14', status: 'paid', gradient: 'linear-gradient(135deg, #22c1c3, #a970ff)' },
  { name: 'Sneha Gupta', age: 31, type: 'Zezting', amount: 30200, requestedOn: '29 Mar 16:45', lockoutExpires: '02 Apr 16:45', status: 'lockout', gradient: 'linear-gradient(135deg, #ff5f6d, #a970ff)' },
  { name: 'Vikram Singh', age: 37, type: 'Zezting', amount: 45500, requestedOn: '27 Mar 14:15', lockoutExpires: '01 Apr 14:15', status: 'available', gradient: 'linear-gradient(135deg, #0d9e6e, #1fbf94)' },
  { name: 'Rahul Mehta', age: 26, type: 'CA', amount: 38900, requestedOn: '30 Mar 12:05', lockoutExpires: '03 Apr 12:05', status: 'lockout', gradient: 'linear-gradient(135deg, #ff2f9e, #7c1fd8)' },
];

const STATUS_META: Record<EarningsStatus, { label: string; icon: typeof Lock; className: string }> = {
  lockout: { label: 'In lockout', icon: Lock, className: 'lockout' },
  available: { label: 'Available', icon: Unlock, className: 'available' },
  paid: { label: 'Paid', icon: Check, className: 'paid' },
};

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('');
}

export default function HostEarningsTable() {
  const [typeFilter, setTypeFilter] = useState<'All' | HostType>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | EarningsStatus>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return ROWS.filter((r) => {
      const matchesType = typeFilter === 'All' || r.type === typeFilter;
      const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
      const matchesQuery = r.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesType && matchesStatus && matchesQuery;
    });
  }, [typeFilter, statusFilter, query]);

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Payout Requests</span>
        <div className="host-search">
          <Search size={15} />
          <input
            type="text"
            placeholder="Search hosts"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="earnings-filters">
        <div className="select-filter">
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as 'All' | HostType)}>
            <option value="All">All</option>
            <option value="Zezting">Zezting</option>
            <option value="CA">CA</option>
          </select>
          <ChevronDown size={14} />
        </div>
        <div className="select-filter">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as 'All' | EarningsStatus)}>
            <option value="All">Status</option>
            <option value="lockout">In lockout</option>
            <option value="available">Available</option>
            <option value="paid">Paid</option>
          </select>
          <ChevronDown size={14} />
        </div>
      </div>

      <div className="host-table-scroll">
        <div className="earnings-table">
          <div className="earnings-table-row earnings-table-head-row">
            <span>Host</span>
            <span>Amount</span>
            <span>Requested On</span>
            <span>Lockout Expires</span>
            <span>Status</span>
            <span>Bonuses</span>
            <span>Action</span>
          </div>

          {filtered.map((row, i) => {
            const status = STATUS_META[row.status];
            const StatusIcon = status.icon;
            return (
              <div className="earnings-table-row" key={`${row.name}-${i}`}>
                <span className="host-table-name-cell">
                  <span className="host-avatar host-avatar-sm" style={{ background: row.gradient }}>
                    {initials(row.name)}
                  </span>
                  <span className="top-host-info">
                    <span className="host-link">{row.name}</span>
                    <span className="host-sub">
                      Age {row.age} · {row.type}
                    </span>
                  </span>
                </span>

                <span className="cell-teal">₹{row.amount.toLocaleString('en-IN')}</span>
                <span className="cell-requested">{row.requestedOn}</span>
                <span className="cell-muted">{row.lockoutExpires}</span>

                <span>
                  <span className={`earn-status ${status.className}`}>
                    <StatusIcon size={11} />
                    {status.label}
                  </span>
                </span>

                <span>
                  <button type="button" className="btn-solid-pink">
                    Add Bonuses
                  </button>
                </span>

                <span>
                  <button type="button" className="btn-ghost-text">
                    Details
                  </button>
                </span>
              </div>
            );
          })}

          {filtered.length === 0 && <div className="host-table-empty">No payout requests match your filters.</div>}
        </div>
      </div>
    </div>
  );
}
