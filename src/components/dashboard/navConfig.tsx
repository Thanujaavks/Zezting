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
import type { ComponentType } from 'react';
import DashboardHome from '../../pages/DashboardHome';
import AppAnalytics from '../../pages/AppAnalytics';
import Revenue from '../../pages/Revenue';
import HostManagement from '../../pages/HostManagement';
import HostEarnings from '../../pages/HostEarnings';
import HostVerification from '../../pages/HostVerification';
import UserManagement from '../../pages/UserManagement';
import CallMonitor from '../../pages/CallMonitor';
import ReportsSafety from '../../pages/ReportsSafety';
import ManageApp from '../../pages/ManageApp';
import AdminManagementPage from '../../pages/AdminManagement';
import PlatformExpense from '../../pages/PlatformExpense';
import SettingsPage from '../../pages/Settings';

export interface NavItem {
  label: string;
  path: string;
  icon: LucideIcon;
  element: ComponentType;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const NAV_SECTIONS: NavSection[] = [
  {
    title: 'Core',
    items: [
      { label: 'Dashboard', path: '', icon: LayoutGrid, element: DashboardHome },
      { label: 'App Analytics', path: 'app-analytics', icon: BarChart3, element: AppAnalytics },
      { label: 'Revenue', path: 'revenue', icon: CircleDollarSign, element: Revenue },
    ],
  },
  {
    title: 'Hosts',
    items: [
      { label: 'Host Management', path: 'host-management', icon: CircleUserRound, element: HostManagement },
      { label: 'Host Earnings', path: 'host-earnings', icon: Wallet, element: HostEarnings },
      { label: 'Verification', path: 'verification', icon: ShieldCheck, element: HostVerification },
    ],
  },
  {
    title: 'Users',
    items: [{ label: 'Users', path: 'users', icon: Users, element: UserManagement }],
  },
  {
    title: 'Activites',
    items: [
      { label: 'Call Monitor', path: 'call-monitor', icon: PhoneCall, element: CallMonitor },
      { label: 'Reports & Safety', path: 'reports-safety', icon: Flag, element: ReportsSafety },
    ],
  },
  {
    title: 'Control',
    items: [
      { label: 'Manage App', path: 'manage-app', icon: PenSquare, element: ManageApp },
      { label: 'Platform Expense', path: 'platform-expense', icon: Receipt, element: PlatformExpense },
      { label: 'Admin Management', path: 'admin-management', icon: UserCog, element: AdminManagementPage },
      { label: 'Settings', path: 'settings', icon: Settings, element: SettingsPage },
    ],
  },
];

export const PAGE_TITLES: Record<string, string> = {
  'Manage App': 'Manage application',
};

export const NAV_ITEMS: NavItem[] = NAV_SECTIONS.flatMap((section) => section.items);
