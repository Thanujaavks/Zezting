import { useMemo, useState } from 'react';
import { Search, AlertTriangle } from 'lucide-react';

interface ReportItem {
  id: number;
  title: string;
  reporter: string;
  reporterRole: string;
  against: string;
  againstRole: string;
  age: string;
  priorWarns: number;
  resolveAction: 'Resolve' | 'Review' | 'Delete' | 'Investigate';
  emergency: boolean;
  category: 'host' | 'user';
}

const REPORTS: ReportItem[] = [
  {
    id: 1,
    title: 'Inappropriate Bitz request in CA Chat',
    reporter: '@user_89',
    reporterRole: 'User',
    against: 'Meena',
    againstRole: 'Host',
    age: '5 min age',
    priorWarns: 2,
    resolveAction: 'Resolve',
    emergency: true,
    category: 'host',
  },
  {
    id: 2,
    title: 'Offensive Language in Game Chat',
    reporter: '@gamer_23',
    reporterRole: 'Player',
    against: 'Alex',
    againstRole: 'Moderotor',
    age: '10 min age',
    priorWarns: 3,
    resolveAction: 'Review',
    emergency: true,
    category: 'user',
  },
  {
    id: 3,
    title: 'Spam Messages in Forum',
    reporter: '@forum_user_67',
    reporterRole: 'Member',
    against: 'Jordan',
    againstRole: 'Admin',
    age: '1 hour age',
    priorWarns: 4,
    resolveAction: 'Delete',
    emergency: false,
    category: 'host',
  },
  {
    id: 4,
    title: 'Harassment in Private Messages',
    reporter: '@user_55',
    reporterRole: 'Member',
    against: 'Sam',
    againstRole: 'Support',
    age: '30 min age',
    priorWarns: 1,
    resolveAction: 'Investigate',
    emergency: false,
    category: 'user',
  },
];

type ReportTab = 'All Reports' | 'Emergency' | 'Host Reports' | 'User Reports';

const TABS: { key: ReportTab; label: string }[] = [
  { key: 'All Reports', label: 'All Reports(14)' },
  { key: 'Emergency', label: 'Emergency(2)' },
  { key: 'Host Reports', label: 'Host Reports (6)' },
  { key: 'User Reports', label: 'User Reports (5)' },
];

export default function ReportsFeed() {
  const [tab, setTab] = useState<ReportTab>('All Reports');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return REPORTS.filter((r) => {
      const matchesTab =
        tab === 'All Reports' ||
        (tab === 'Emergency' && r.emergency) ||
        (tab === 'Host Reports' && r.category === 'host') ||
        (tab === 'User Reports' && r.category === 'user');
      const q = query.trim().toLowerCase();
      const matchesQuery =
        q === '' ||
        r.title.toLowerCase().includes(q) ||
        r.reporter.toLowerCase().includes(q) ||
        r.against.toLowerCase().includes(q);
      return matchesTab && matchesQuery;
    });
  }, [tab, query]);

  return (
    <>
      <div className="report-tabs-bar">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            className={`report-tab${tab === t.key ? ' active' : ''}${t.key === 'Emergency' ? ' emergency' : ''}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="host-search report-search">
        <Search size={15} />
        <input
          type="text"
          placeholder="Search user"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="report-list">
        {filtered.map((report) => (
          <div className="report-row" key={report.id}>
            <span className="report-accent" />

            <div className="report-card">
              <div className="report-card-main">
                <div className="report-card-head">
                  <span className="report-dot" />
                  <span className="report-title">{report.title}</span>
                </div>

                <div className="report-meta">
                  <span className="report-meta-label">By:</span>{' '}
                  <span className="report-meta-name">
                    {report.reporter}({report.reporterRole})
                  </span>{' '}
                  <span className="report-meta-label">Against:</span>{' '}
                  <span className="report-meta-against">
                    {report.against}({report.againstRole})
                  </span>
                </div>

                <div className="report-actions">
                  <button type="button" className="report-action warn">
                    <AlertTriangle size={13} />
                    Warn
                  </button>
                  <button type="button" className="report-action suspend">
                    Suspend
                  </button>
                  <button type="button" className="report-action ban">
                    Ban
                  </button>
                  <button type="button" className="report-action resolve">
                    {report.resolveAction}
                  </button>
                </div>
              </div>

              <div className="report-card-side">
                <span className="report-age">{report.age}</span>
                <span className="warn-pill">{report.priorWarns} prior warn</span>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="host-table-empty">No reports match your filters.</div>
        )}
      </div>
    </>
  );
}
