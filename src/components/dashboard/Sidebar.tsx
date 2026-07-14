import {
  LayoutGrid,
  BarChart3,
  CircleDollarSign,
  CircleUserRound,
  Wallet,
  ShieldCheck,
  Users,
  PhoneCall,
  Flag,
  PenSquare,
  Receipt,
  UserCog,
  Settings,
  type LucideIcon,
} from 'lucide-react';
import logo from '../../assets/logo.svg';

interface NavItem {
  label: string;
  icon: LucideIcon;
}

interface NavSection {
  title: string;
  items: NavItem[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Core',
    items: [
      { label: 'Dashboard', icon: LayoutGrid },
      { label: 'App Analytics', icon: BarChart3 },
      { label: 'Revenue', icon: CircleDollarSign },
    ],
  },
  {
    title: 'Hosts',
    items: [
      { label: 'Host Management', icon: CircleUserRound },
      { label: 'Host Earnings', icon: Wallet },
      { label: 'Verification', icon: ShieldCheck },
    ],
  },
  {
    title: 'Users',
    items: [{ label: 'Users', icon: Users }],
  },
  {
    title: 'Activites',
    items: [
      { label: 'Call Monitor', icon: PhoneCall },
      { label: 'Reports & Safety', icon: Flag },
    ],
  },
  {
    title: 'Control',
    items: [
      { label: 'Manage App', icon: PenSquare },
      { label: 'Platform Expense', icon: Receipt },
      { label: 'Admin Management', icon: UserCog },
      { label: 'Settings', icon: Settings },
    ],
  },
];

interface SidebarProps {
  active: string;
  onSelect: (label: string) => void;
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ active, onSelect, open, onClose }: SidebarProps) {
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
                const isActive = active === item.label;
                return (
                  <button
                    key={item.label}
                    type="button"
                    className={`dash-nav-item${isActive ? ' active' : ''}`}
                    onClick={() => {
                      onSelect(item.label);
                      onClose();
                    }}
                  >
                    <span className="dash-nav-icon">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
