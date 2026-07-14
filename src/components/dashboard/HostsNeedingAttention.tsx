interface Report {
  title: string;
  reporter: string;
  target: string;
  detail: string;
}

const REPORTS: Report[] = [
  {
    title: 'Fake profile suspected',
    reporter: '@kiran_m',
    target: '@some_user',
    detail: 'for fake profile photo. Account 3 days old.',
  },
  {
    title: 'Suspicious payout pattern',
    reporter: '@rhea_k',
    target: '@another_host',
    detail: 'flagged for repeated same-caller payouts this week.',
  },
];

export default function HostsNeedingAttention() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Hosts Needing Attention</span>
        <button type="button" className="btn-solid-purple">
          View all
        </button>
      </div>

      <div className="attention-list">
        {REPORTS.map((report) => (
          <div className="attention-card" key={report.title + report.reporter}>
            <span className="attention-title">{report.title}</span>
            <p className="attention-detail">
              <span className="mention">{report.reporter}</span> reported{' '}
              <span className="mention">{report.target}</span> {report.detail}
            </p>
            <div className="attention-actions">
              <button type="button" className="btn-solid-pink">
                Investigate
              </button>
              <button type="button" className="btn-outline-muted">
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
