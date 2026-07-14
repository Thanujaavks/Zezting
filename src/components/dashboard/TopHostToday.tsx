interface HostRow {
  name: string;
  sparks: number;
  repeat: number;
  earnings: number;
  calls: number;
  rating: number;
  gradient: string;
}

const HOSTS: HostRow[] = [
  {
    name: 'Priya Sharma',
    sparks: 4120,
    repeat: 84,
    earnings: 28400,
    calls: 320,
    rating: 4.8,
    gradient: 'linear-gradient(135deg, #a970ff, #ff2f9e)',
  },
  {
    name: 'Ananya Verma',
    sparks: 3860,
    repeat: 79,
    earnings: 25150,
    calls: 296,
    rating: 4.7,
    gradient: 'linear-gradient(135deg, #0d9e6e, #1fbf94)',
  },
  {
    name: 'Kavya Reddy',
    sparks: 3540,
    repeat: 76,
    earnings: 23980,
    calls: 271,
    rating: 4.6,
    gradient: 'linear-gradient(135deg, #ff8a3d, #ff2f9e)',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('');
}

export default function TopHostToday() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Top Host Today</span>
      </div>

      <div className="top-host-list">
        {HOSTS.map((host) => (
          <div className="top-host-card" key={host.name}>
            <span className="host-avatar" style={{ background: host.gradient }}>
              {initials(host.name)}
            </span>
            <span className="top-host-info">
              <span className="host-link">{host.name}</span>
              <span className="host-sub">
                {host.sparks.toLocaleString('en-IN')} sparks · {host.repeat}% repeat
              </span>
            </span>

            <span className="top-host-metric">
              <span className="top-host-metric-label">Earnings</span>
              <span className="top-host-metric-value earn">₹{host.earnings.toLocaleString('en-IN')}</span>
            </span>
            <span className="top-host-metric">
              <span className="top-host-metric-label">Calls</span>
              <span className="top-host-metric-value">{host.calls}</span>
            </span>
            <span className="top-host-metric">
              <span className="top-host-metric-label">Rating</span>
              <span className="top-host-metric-value">{host.rating}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
