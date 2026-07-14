import { useState } from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import ComingSoon from '../components/dashboard/ComingSoon';
import DashboardHome from './DashboardHome';
import AppAnalytics from './AppAnalytics';
import Revenue from './Revenue';
import HostManagement from './HostManagement';
import HostEarnings from './HostEarnings';
import HostVerification from './HostVerification';
import UserManagement from './UserManagement';
import CallMonitor from './CallMonitor';
import ReportsSafety from './ReportsSafety';
import ManageApp from './ManageApp';
import AdminManagement from './AdminManagement';
import PlatformExpense from './PlatformExpense';
import Settings from './Settings';
import '../styles/dashboard.css';

function renderPage(activeNav: string) {
  switch (activeNav) {
    case 'Dashboard':
      return <DashboardHome />;
    case 'App Analytics':
      return <AppAnalytics />;
    case 'Revenue':
      return <Revenue />;
    case 'Host Management':
      return <HostManagement />;
    case 'Host Earnings':
      return <HostEarnings />;
    case 'Verification':
      return <HostVerification />;
    case 'Users':
      return <UserManagement />;
    case 'Call Monitor':
      return <CallMonitor />;
    case 'Reports & Safety':
      return <ReportsSafety />;
    case 'Manage App':
      return <ManageApp />;
    case 'Admin Management':
      return <AdminManagement />;
    case 'Platform Expense':
      return <PlatformExpense />;
    case 'Settings':
      return <Settings />;
    default:
      return <ComingSoon section={activeNav} />;
  }
}

const PAGE_TITLES: Record<string, string> = {
  'Manage App': 'Manage application',
};

export default function Dashboard() {
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dash-shell">
      <Sidebar
        active={activeNav}
        onSelect={setActiveNav}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="dash-main">
        <Topbar title={PAGE_TITLES[activeNav] ?? activeNav} onMenuClick={() => setSidebarOpen(true)} />

        <div className="dash-content">{renderPage(activeNav)}</div>
      </div>
    </div>
  );
}
