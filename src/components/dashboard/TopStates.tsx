interface StateRow {
  name: string;
  users: number;
}

const STATES: StateRow[] = [
  { name: 'Maharashtra', users: 6200 },
  { name: 'Tamil Nadu', users: 7100 },
  { name: 'Karnataka', users: 5500 },
  { name: 'Gujarat', users: 3900 },
  { name: 'Rajasthan', users: 4300 },
  { name: 'Kerala', users: 4820 },
]
  .sort((a, b) => b.users - a.users);

export default function TopStates() {
  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Top states by active users</span>
      </div>
      <div className="state-list">
        {STATES.map((state, i) => (
          <div className="state-row" key={state.name}>
            <span className="state-rank">{i + 1}</span>
            <span className="state-name">{state.name}</span>
            <span className="state-value">{state.users.toLocaleString('en-IN')} active users</span>
          </div>
        ))}
      </div>
    </div>
  );
}
