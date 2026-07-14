import { useEffect, useState } from 'react';
import {
  AppWindow,
  ArrowLeft,
  Briefcase,
  Calendar,
  ChartPie,
  Eye,
  EyeOff,
  IdCard,
  Lock,
  Mail,
  MapPin,
  Phone,
  Settings,
  Shield,
  ShieldCheck,
  Sparkles,
  User,
  UserRoundPlus,
  Users,
  Wallet,
} from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

interface AddAdminModalProps {
  onClose: () => void;
}

interface PermissionItem {
  id: string;
  title: string;
  desc: string;
  icon: ComponentType<{ size?: number | string }>;
  defaultOn: boolean;
}

const PERMISSION_ITEMS: PermissionItem[] = [
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    desc: 'View analytics, reports and dashboards',
    icon: ChartPie,
    defaultOn: true,
  },
  {
    id: 'users',
    title: 'User Management',
    desc: 'View, edit and manage users',
    icon: Users,
    defaultOn: true,
  },
  {
    id: 'hosts',
    title: 'Host Management',
    desc: 'Approve, suspend and manage hosts',
    icon: IdCard,
    defaultOn: true,
  },
  {
    id: 'revenue',
    title: 'Revenue & Finance',
    desc: 'View revenue, payouts and finances',
    icon: Wallet,
    defaultOn: true,
  },
  {
    id: 'safety',
    title: 'Safety & Support',
    desc: 'Handle reports, emergencies and support',
    icon: Shield,
    defaultOn: true,
  },
  {
    id: 'app',
    title: 'App Management',
    desc: 'Manage app settings, features and rates',
    icon: AppWindow,
    defaultOn: false,
  },
  {
    id: 'admins',
    title: 'Admin Management',
    desc: 'Add, edit and manage admin accounts',
    icon: UserRoundPlus,
    defaultOn: false,
  },
  {
    id: 'location',
    title: 'Location Control',
    desc: 'Manage district restrictions',
    icon: MapPin,
    defaultOn: false,
  },
  {
    id: 'verification',
    title: 'Verification Management',
    desc: 'Manage verification processes',
    icon: ShieldCheck,
    defaultOn: true,
  },
  {
    id: 'system',
    title: 'System Settings',
    desc: 'Access system logs and configuration',
    icon: Settings,
    defaultOn: false,
  },
];

function ModalField({
  label,
  icon,
  type = 'text',
  placeholder,
}: {
  label: string;
  icon: ReactNode;
  type?: string;
  placeholder: string;
}) {
  return (
    <label className="adm-field">
      <span className="adm-field-label">{label}</span>
      <span className="adm-input-wrap">
        <span className="adm-input-icon">{icon}</span>
        <input type={type} className="adm-input" placeholder={placeholder} />
      </span>
    </label>
  );
}

function ModalPasswordField({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="adm-field">
      <span className="adm-field-label">{label}</span>
      <span className="adm-input-wrap">
        <span className="adm-input-icon">
          <Lock size={16} />
        </span>
        <input
          type={visible ? 'text' : 'password'}
          className="adm-input"
          placeholder="Enter password"
        />
        <button
          type="button"
          className="adm-eye-btn"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((v) => !v)}
        >
          {visible ? <Eye size={17} /> : <EyeOff size={17} />}
        </button>
      </span>
    </label>
  );
}

export default function AddAdminModal({ onClose }: AddAdminModalProps) {
  const [passwordMode, setPasswordMode] = useState<'generate' | 'custom'>('generate');
  const [permissions, setPermissions] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(PERMISSION_ITEMS.map((item) => [item.id, item.defaultOn])),
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const togglePermission = (id: string) =>
    setPermissions((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="adm-overlay" role="dialog" aria-modal="true" aria-label="Add Admin">
      <div className="adm-modal">
        <div className="adm-modal-head">
          <button type="button" className="adm-back-btn" aria-label="Go back" onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <div className="adm-head-text">
            <span className="adm-modal-title">Add Admin</span>
            <span className="adm-modal-subtitle">
              Create a new admin account and assign permissions
            </span>
          </div>
          <div className="adm-head-actions">
            <button type="button" className="btn-adm-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="button" className="btn-adm-next">
              Next
            </button>
          </div>
        </div>

        <div className="adm-modal-grid">
          <section className="adm-panel">
            <span className="adm-panel-title">Personal Information</span>

            <div className="adm-field-row">
              <ModalField label="Your Name" icon={<User size={16} />} placeholder="StarVoice_482" />
              <ModalField
                label="Phone number"
                icon={<Phone size={16} />}
                type="tel"
                placeholder="+91 98765 43210"
              />
            </div>

            <ModalField
              label="Date of birth"
              icon={<Calendar size={16} />}
              placeholder="14 March 1991"
            />
            <ModalField label="Profession" icon={<Briefcase size={16} />} placeholder="Teacher" />
            <ModalField
              label="Mail"
              icon={<Mail size={16} />}
              type="email"
              placeholder="example@email.com"
            />
          </section>

          <section className="adm-panel">
            <span className="adm-panel-title">Account &amp; Security</span>

            <ModalField
              label="Email Address"
              icon={<Mail size={16} />}
              type="email"
              placeholder="starvoice482@admin.com"
            />
            <ModalPasswordField label="Password" />
            <ModalPasswordField label="Confirm Password" />

            <span className="adm-field-label">Account Options</span>

            <label
              className={`adm-option${passwordMode === 'generate' ? ' selected' : ''}`}
            >
              <input
                type="radio"
                name="password-mode"
                className="adm-option-input"
                checked={passwordMode === 'generate'}
                onChange={() => setPasswordMode('generate')}
              />
              <span className="adm-radio" aria-hidden="true" />
              <span className="adm-option-text">
                <span className="adm-option-title">Generate temporary password</span>
                <span className="adm-option-desc">
                  System will generate a secure temporary password
                </span>
              </span>
              <span className="adm-option-icon">
                <Sparkles size={16} />
              </span>
            </label>

            <label className={`adm-option${passwordMode === 'custom' ? ' selected' : ''}`}>
              <input
                type="radio"
                name="password-mode"
                className="adm-option-input"
                checked={passwordMode === 'custom'}
                onChange={() => setPasswordMode('custom')}
              />
              <span className="adm-radio" aria-hidden="true" />
              <span className="adm-option-text">
                <span className="adm-option-title">Set custom password</span>
                <span className="adm-option-desc">Create a password for the admin account</span>
              </span>
              <span className="adm-option-icon">
                <Lock size={16} />
              </span>
            </label>
          </section>
        </div>

        <section className="adm-panel adm-perms-panel">
          <span className="adm-panel-title">Assign Permissions</span>

          <div className="adm-perms-grid">
            {PERMISSION_ITEMS.map((item) => {
              const Icon = item.icon;
              const on = permissions[item.id];
              return (
                <div className="adm-perm-card" key={item.id}>
                  <span className="adm-perm-icon">
                    <Icon size={17} />
                  </span>
                  <div className="adm-perm-body">
                    <div className="adm-perm-top">
                      <span className="adm-perm-title">{item.title}</span>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={on}
                        aria-label={`Toggle ${item.title}`}
                        className={`adm-switch${on ? ' on' : ''}`}
                        onClick={() => togglePermission(item.id)}
                      >
                        <span className="adm-switch-knob" />
                      </button>
                    </div>
                    <span className="adm-perm-desc">{item.desc}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
