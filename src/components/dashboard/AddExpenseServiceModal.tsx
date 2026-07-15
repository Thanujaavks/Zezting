import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  ChevronDown,
  Circle,
  CircleCheck,
  Clock,
  DollarSign,
  HelpCircle,
  Info,
  Layers,
  LayoutGrid,
  ShieldCheck,
  SlidersHorizontal,
  Tag,
  X,
} from 'lucide-react';
import type { ReactNode } from 'react';

interface AddExpenseServiceModalProps {
  onClose: () => void;
}

type BillingType = 'one-time' | 'recurring';
type ServiceStatus = 'active' | 'inactive';

const EXPENSE_CATEGORIES = [
  'Hosting & Infrastructure',
  'Payment Gateway',
  'Marketing & Ads',
  'Tools & Software',
  'Legal & Compliance',
];

const BILLING_CYCLES = ['Weekly', 'Monthly', 'Quarterly', 'Yearly'];

const CURRENCIES = ['INR (₹)', 'USD ($)', 'EUR (€)', 'GBP (£)'];

const REMINDER_OPTIONS = ['1 day', '3 days', '5 days', '7 days', '15 days'];

function ModalTextField({
  label,
  required,
  icon,
  type = 'text',
  placeholder,
  hint,
}: {
  label: string;
  required?: boolean;
  icon: ReactNode;
  type?: string;
  placeholder: string;
  hint?: string;
}) {
  return (
    <label className="adm-field">
      <span className="adm-field-label">
        {label}
        {required && <span className="exp-required">*</span>}
      </span>
      <span className="adm-input-wrap">
        <span className="adm-input-icon">{icon}</span>
        <input type={type} className="adm-input" placeholder={placeholder} />
      </span>
      {hint && <span className="exp-helper-text">{hint}</span>}
    </label>
  );
}

function ModalSelectField({
  label,
  required,
  tooltip,
  icon,
  placeholder,
  options,
  hint,
}: {
  label: string;
  required?: boolean;
  tooltip?: boolean;
  icon: ReactNode;
  placeholder: string;
  options: string[];
  hint?: string;
}) {
  return (
    <label className="adm-field">
      <span className="adm-field-label">
        {label}
        {required && <span className="exp-required">*</span>}
        {tooltip && <HelpCircle size={12} className="exp-tooltip-icon" />}
      </span>
      <span className="adm-input-wrap exp-select-wrap">
        <span className="adm-input-icon">{icon}</span>
        <select className="adm-input exp-select" defaultValue="">
          <option value="" disabled hidden>
            {placeholder}
          </option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ChevronDown size={15} className="exp-select-chevron" />
      </span>
      {hint && <span className="exp-helper-text">{hint}</span>}
    </label>
  );
}

export default function AddExpenseServiceModal({ onClose }: AddExpenseServiceModalProps) {
  const [billingType, setBillingType] = useState<BillingType>('recurring');
  const [status, setStatus] = useState<ServiceStatus>('active');
  const [requiresApproval, setRequiresApproval] = useState(true);

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

  return (
    <div className="adm-overlay" role="dialog" aria-modal="true" aria-label="Add Expense Service">
      <div className="adm-modal exp-modal">
        <div className="adm-modal-head">
          <button type="button" className="adm-back-btn" aria-label="Go back" onClick={onClose}>
            <ArrowLeft size={20} />
          </button>
          <div className="adm-head-text">
            <span className="adm-modal-title">Add Expense Service</span>
            <span className="adm-modal-subtitle">Create a new service under an expense category</span>
          </div>
          <button type="button" className="exp-close-btn" aria-label="Close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <section className="adm-panel exp-panel">
          <span className="exp-panel-title">
            <span className="exp-panel-icon">
              <Info size={15} />
            </span>
            1. Service Information
          </span>

          <ModalTextField
            label="Service Name"
            required
            icon={<Tag size={16} />}
            placeholder="Enter service name"
            hint="Example: AWS Hosting"
          />
          <ModalSelectField
            label="Expense Category"
            required
            icon={<LayoutGrid size={16} />}
            placeholder="Select category"
            options={EXPENSE_CATEGORIES}
          />
        </section>

        <section className="adm-panel exp-panel">
          <span className="exp-panel-title">
            <span className="exp-panel-icon">
              <Layers size={15} />
            </span>
            2. Expense Configuration
          </span>

          <div className="exp-config-row exp-config-row-3">
            <div className="adm-field">
              <span className="adm-field-label">
                Billing Type<span className="exp-required">*</span>
              </span>
              <div className="exp-toggle-group">
                <button
                  type="button"
                  className={`exp-toggle-btn${billingType === 'one-time' ? ' selected' : ''}`}
                  onClick={() => setBillingType('one-time')}
                >
                  <span className="exp-radio-dot" aria-hidden="true" />
                  One Time Expense
                </button>
                <button
                  type="button"
                  className={`exp-toggle-btn${billingType === 'recurring' ? ' selected' : ''}`}
                  onClick={() => setBillingType('recurring')}
                >
                  <span className="exp-radio-dot" aria-hidden="true" />
                  Recurring Expense
                </button>
              </div>
            </div>

            <ModalSelectField
              label="Billing Cycle"
              required
              icon={<Calendar size={16} />}
              placeholder="Monthly"
              options={BILLING_CYCLES}
            />

            <ModalTextField
              label="Default Amount"
              required
              icon={<DollarSign size={16} />}
              placeholder="0.00"
              hint="Example: ₹ 25,000"
            />
          </div>

          <div className="exp-config-row exp-config-row-2">
            <ModalSelectField
              label="Currency"
              required
              icon={<span className="exp-currency-icon">₹</span>}
              placeholder="INR (₹)"
              options={CURRENCIES}
            />

            <ModalTextField
              label="Next Billing Date (Optional)"
              icon={<Calendar size={16} />}
              type="date"
              placeholder="Select date"
            />
          </div>
        </section>

        <div className="exp-bottom-grid">
          <section className="adm-panel exp-panel">
            <span className="exp-panel-title">
              <span className="exp-panel-icon">
                <ShieldCheck size={15} />
              </span>
              4. Status
            </span>

            <div className="adm-field">
              <span className="adm-field-label">
                Service Status<span className="exp-required">*</span>
              </span>
              <div className="exp-toggle-group">
                <button
                  type="button"
                  className={`exp-toggle-btn${status === 'active' ? ' selected' : ''}`}
                  onClick={() => setStatus('active')}
                >
                  <CircleCheck size={15} />
                  Active
                </button>
                <button
                  type="button"
                  className={`exp-toggle-btn${status === 'inactive' ? ' selected' : ''}`}
                  onClick={() => setStatus('inactive')}
                >
                  <Circle size={15} />
                  Inactive
                </button>
              </div>
            </div>
            <span className="exp-helper-text">Inactive services won't appear while adding expenses.</span>
          </section>

          <section className="adm-panel exp-panel">
            <span className="exp-panel-title">
              <span className="exp-panel-icon">
                <SlidersHorizontal size={15} />
              </span>
              5. Additional Controls
            </span>

            <div className="exp-config-row exp-config-row-2">
              <div className="adm-field">
                <span className="adm-field-label">
                  Requires approval
                  <HelpCircle size={12} className="exp-tooltip-icon" />
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={requiresApproval}
                  aria-label="Requires approval"
                  className={`adm-switch${requiresApproval ? ' on' : ''}`}
                  onClick={() => setRequiresApproval((v) => !v)}
                >
                  <span className="adm-switch-knob" />
                </button>
                <span className="exp-helper-text">This expense requires admin approval</span>
              </div>

              <ModalSelectField
                label="Remind before due date"
                tooltip
                icon={<Clock size={16} />}
                placeholder="5 days"
                options={REMINDER_OPTIONS}
                hint="Send reminder before the due date"
              />
            </div>
          </section>
        </div>

        <div className="exp-footer">
          <button type="button" className="btn-adm-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="btn-solid-purple exp-create-btn">
            Create Service
          </button>
        </div>
      </div>
    </div>
  );
}
