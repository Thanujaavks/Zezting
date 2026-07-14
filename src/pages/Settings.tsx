import { useState } from 'react';
import { User, Bell, MonitorSmartphone, LogOut, type LucideIcon } from 'lucide-react';
import AdminProfileForm from '../components/dashboard/AdminProfileForm';

type SettingsSection = 'Admin profile' | 'Notification' | 'Login Activity';

const SECTIONS: { label: SettingsSection; icon: LucideIcon }[] = [
  { label: 'Admin profile', icon: User },
  { label: 'Notification', icon: Bell },
  { label: 'Login Activity', icon: MonitorSmartphone },
];

export default function Settings() {
  const [section, setSection] = useState<SettingsSection>('Admin profile');

  return (
    <div className="settings-wrap">
      <aside className="settings-nav">
        <span className="settings-nav-title">Settings</span>

        {SECTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.label}
              type="button"
              className={`settings-nav-item${section === item.label ? ' active' : ''}`}
              onClick={() => setSection(item.label)}
            >
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}

        <button type="button" className="settings-nav-item settings-logout">
          <LogOut size={17} />
          <span>Login Activity</span>
        </button>
      </aside>

      <div className="settings-content">
        {section === 'Admin profile' ? (
          <AdminProfileForm />
        ) : (
          <div className="panel settings-panel">
            <span className="settings-section-title">{section}</span>
            <p className="settings-placeholder">{section} settings are coming soon.</p>
          </div>
        )}
      </div>
    </div>
  );
}
