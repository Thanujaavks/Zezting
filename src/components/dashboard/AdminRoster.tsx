interface AdminEntry {
  name: string;
  email: string;
  role: 'Admin' | 'Viewer';
  online: boolean;
}

const ADMINS: AdminEntry[] = [
  { name: 'Rahul Sharma', email: 'rahul@zezting.com', role: 'Admin', online: true },
  { name: 'Maya Kapoor', email: 'maya@designhub.com', role: 'Admin', online: false },
  { name: 'James Smith', email: 'james@creativespace.com', role: 'Admin', online: true },
  { name: 'Lily Tan', email: 'lily@innovate.com', role: 'Viewer', online: true },
];

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export default function AdminRoster() {
  return (
    <div className="panel admin-roster-panel">
      <div className="admin-card-list">
        {ADMINS.map((admin) => (
          <div className="admin-card" key={admin.email}>
            <div className="admin-card-main">
              <span className="admin-avatar">{initials(admin.name)}</span>

              <div className="admin-card-info">
                <span className="admin-name">{admin.name}</span>
                <span className="admin-email">{admin.email}</span>

                <div className="admin-card-actions">
                  <button type="button" className="admin-btn edit">
                    Edit
                  </button>
                  <button type="button" className="admin-btn remove">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="admin-card-side">
              <span className="role-badge">{admin.role}</span>
              <span className={`status-pill${admin.online ? ' online' : ''}`}>
                <span className="status-dot" />
                {admin.online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
