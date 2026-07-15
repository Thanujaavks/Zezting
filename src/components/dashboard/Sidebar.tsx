import { Link, useLocation } from 'react-router-dom';
import { NAV_SECTIONS } from './navConfig';
import logo from '../../assets/logo.svg';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();
  const activePath = location.pathname.replace(/^\/dashboard\/?/, '');

  return (
    <>
      {open && <div className="dash-sidebar-backdrop" onClick={onClose} />}
      <aside className={`dash-sidebar${open ? ' open' : ''}`}>
        <div className="dash-sidebar-logo">
          <img src={logo} alt="Zezting" />
        </div>
        <nav className="dash-sidebar-scroll">
          {NAV_SECTIONS.map((section) => (
            <div className="dash-nav-section" key={section.title}>
              <div className="dash-nav-title">{section.title}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activePath === item.path;
                return (
                  <Link
                    key={item.label}
                    to={`/dashboard/${item.path}`}
                    className={`dash-nav-item${isActive ? ' active' : ''}`}
                    onClick={onClose}
                  >
                    <span className="dash-nav-icon">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
