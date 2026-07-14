interface Host {
  name: string;
  sparks: number;
  repeat: number;
  revenue: number;
  gradient: string;
}

const HOSTS: Host[] = [
  {
    name: 'Priya Sharma',
    sparks: 4120,
    repeat: 84,
    revenue: 28400,
    gradient: 'linear-gradient(135deg, #a970ff, #ff2f9e)',
  },
  {
    name: 'Ananya Verma',
    sparks: 3860,
    repeat: 79,
    revenue: 25150,
    gradient: 'linear-gradient(135deg, #0d9e6e, #1fbf94)',
  },
  {
    name: 'Kavya Reddy',
    sparks: 3540,
    repeat: 76,
    revenue: 23980,
    gradient: 'linear-gradient(135deg, #ff8a3d, #ff2f9e)',
  },
  {
    name: 'Meera Nair',
    sparks: 3210,
    repeat: 71,
    revenue: 21760,
    gradient: 'linear-gradient(135deg, #4f7bff, #a970ff)',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('');
}

export default function TopHosts() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Today's Top Hosts</span>
        <button type="button" className="panel-link">
          View all
        </button>
      </div>
      <div className="host-list">
        {HOSTS.map((host) => (
          <div className="host-row" key={host.name}>
            <span className="host-avatar" style={{ background: host.gradient }}>
              {initials(host.name)}
            </span>
            <span className="host-info">
              <span className="host-name">{host.name}</span>
              <span className="host-sub">
                {host.sparks.toLocaleString('en-IN')} sparks · {host.repeat}% repeat
              </span>
            </span>
            <span className="host-amount">₹{host.revenue.toLocaleString('en-IN')}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
