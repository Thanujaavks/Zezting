interface Payout {
  name: string;
  tag: string;
  due: string;
  calls: number;
  amount: number;
  gradient: string;
}

const PAYOUTS: Payout[] = [
  {
    name: 'Priya Sharma',
    tag: 'CA + Zezting',
    due: '31 Mar',
    calls: 1204,
    amount: 28400,
    gradient: 'linear-gradient(135deg, #a970ff, #ff2f9e)',
  },
  {
    name: 'Ananya Verma',
    tag: 'CA + Zezting',
    due: '31 Mar',
    calls: 986,
    amount: 24150,
    gradient: 'linear-gradient(135deg, #0d9e6e, #1fbf94)',
  },
  {
    name: 'Kavya Reddy',
    tag: 'Host',
    due: '2 Apr',
    calls: 1052,
    amount: 21980,
    gradient: 'linear-gradient(135deg, #ff8a3d, #ff2f9e)',
  },
  {
    name: 'Meera Nair',
    tag: 'CA + Zezting',
    due: '2 Apr',
    calls: 874,
    amount: 19760,
    gradient: 'linear-gradient(135deg, #4f7bff, #a970ff)',
  },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((p) => p[0])
    .join('');
}

export default function PendingPayouts() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Pending Payouts</span>
        <button type="button" className="btn-outline">
          Pay All
        </button>
      </div>

      <div className="payout-list">
        {PAYOUTS.map((p) => (
          <div className="payout-row" key={p.name}>
            <span className="payout-avatar" style={{ background: p.gradient }}>
              {initials(p.name)}
            </span>
            <div className="payout-info">
              <div className="payout-name-row">
                <span className="payout-name">{p.name}</span>
                <span className="chip">{p.tag}</span>
              </div>
              <span className="payout-sub">
                Due {p.due} · {p.calls.toLocaleString('en-IN')} calls
              </span>
            </div>
            <span className="payout-amount">₹{p.amount.toLocaleString('en-IN')}</span>
            <button type="button" className="btn-outline small">
              Pay
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
