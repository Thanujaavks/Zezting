import { useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import Topbar from '../components/dashboard/Topbar';
import ComingSoon from '../components/dashboard/ComingSoon';
import { NAV_ITEMS, PAGE_TITLES } from '../components/dashboard/navConfig';
import '../styles/dashboard.css';

function useActiveLabel() {
  const location = useLocation();
  const activePath = location.pathname.replace(/^\/dashboard\/?/, '');
  const match = NAV_ITEMS.find((item) => item.path === activePath);
  return match?.label ?? activePath;
}

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const activeLabel = useActiveLabel();

  return (
    <div className="dash-shell">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="dash-main">
        <Topbar title={PAGE_TITLES[activeLabel] ?? activeLabel} onMenuClick={() => setSidebarOpen(true)} />

        <div className="dash-content">
          <Routes>
            {NAV_ITEMS.map((item) =>
              item.path === '' ? (
                <Route key={item.label} index element={<item.element />} />
              ) : (
                <Route key={item.label} path={item.path} element={<item.element />} />
              )
            )}
            <Route path="*" element={<ComingSoon section={activeLabel} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
