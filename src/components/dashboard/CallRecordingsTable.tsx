import { useMemo, useState } from 'react';
import { Play, Sparkles, Flag } from 'lucide-react';

interface RecordingRow {
  id: number;
  host: string;
  org: string;
  type: string;
  trigger: 'new-host' | 'reported';
  recordedAt: string;
  duration: string;
  status: 'Pending' | 'Reviewed';
}

const RECORDINGS: RecordingRow[] = [
  { id: 1, host: 'Arun', org: 'Zezting', type: 'CA', trigger: 'new-host', recordedAt: '30 Mar 10:42 PM', duration: '60s', status: 'Pending' },
  { id: 2, host: 'Arun', org: 'Zezting', type: 'CA', trigger: 'new-host', recordedAt: '30 Mar 10:42 PM', duration: '60s', status: 'Pending' },
  { id: 3, host: 'Arun', org: 'Zezting', type: 'CA', trigger: 'new-host', recordedAt: '30 Mar 10:42 PM', duration: '60s', status: 'Pending' },
  { id: 4, host: 'Arun', org: 'Zezting', type: 'CA', trigger: 'reported', recordedAt: '30 Mar 10:42 PM', duration: '60s', status: 'Pending' },
  { id: 5, host: 'Arun', org: 'Zezting', type: 'CA', trigger: 'new-host', recordedAt: '30 Mar 10:42 PM', duration: '60s', status: 'Pending' },
  { id: 6, host: 'Arun', org: 'Zezting', type: 'CA', trigger: 'new-host', recordedAt: '30 Mar 10:42 PM', duration: '60s', status: 'Pending' },
  { id: 7, host: 'Arun', org: 'Zezting', type: 'CA', trigger: 'new-host', recordedAt: '30 Mar 10:42 PM', duration: '60s', status: 'Pending' },
];

type FilterTab = 'All' | 'New Host Check' | 'Report Check';

const TABS: FilterTab[] = ['All', 'New Host Check', 'Report Check'];

export default function CallRecordingsTable() {
  const [tab, setTab] = useState<FilterTab>('All');

  const filtered = useMemo(() => {
    if (tab === 'New Host Check') return RECORDINGS.filter((r) => r.trigger === 'new-host');
    if (tab === 'Report Check') return RECORDINGS.filter((r) => r.trigger === 'reported');
    return RECORDINGS;
  }, [tab]);

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

          {filtered.map((rec) => (
            <div className="call-table-row" key={rec.id}>
              <span className="host-table-name-cell">
                <span className="user-avatar" />
                <span className="top-host-info">
                  <span className="user-name">{rec.host}</span>
                  <span className="host-sub">
                    {rec.org} · {rec.type}
                  </span>
                </span>
              </span>

              <span>
                {rec.trigger === 'new-host' ? (
                  <span className="trigger-badge new-host">
                    <Sparkles size={12} />
                    New host
                  </span>
                ) : (
                  <span className="trigger-badge reported">
                    <Flag size={12} />
                    Reported
                  </span>
                )}
              </span>

              <span className="cell-muted">{rec.recordedAt}</span>

              <span className="cell-muted">{rec.duration}</span>

              <span className={`call-status${rec.status === 'Pending' ? ' pending' : ''}`}>
                {rec.status}
              </span>

              <span className="call-actions">
                <button type="button" className="btn-listen">
                  <Play size={12} fill="currentColor" />
                  Listen
                </button>
                <button type="button" className="btn-review-later">
                  Review Later
                </button>
              </span>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="host-table-empty">No recordings match this filter.</div>
          )}
        </div>
      </div>
    </div>
  );
}
