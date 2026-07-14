import { Bell, ChevronDown, Menu } from 'lucide-react';

interface TopbarProps {
  title: string;
  onMenuClick: () => void;
}

export default function Topbar({ title, onMenuClick }: TopbarProps) {
  return (
    <header className="dash-topbar">
      <div className="dash-topbar-left">
        <button type="button" className="dash-menu-btn" aria-label="Open menu" onClick={onMenuClick}>
          <Menu size={18} />
        </button>
        <h1 className="dash-title">{title}</h1>
      </div>

      <div className="dash-topbar-right">
        <button type="button" className="dash-bell" aria-label="Notifications">
          <Bell size={17} />
        </button>
        <div className="dash-profile">
          <div className="dash-avatar">SA</div>
          <div className="dash-profile-text">
            <span className="dash-profile-name">Super Admin</span>
            <span className="dash-profile-email">superadmin@gmail.com</span>
          </div>
          <ChevronDown size={16} className="dash-profile-chevron" />
        </div>
      </div>
    </header>
  );
}
