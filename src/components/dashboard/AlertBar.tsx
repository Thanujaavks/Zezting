import type { CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';

interface Alert {
  label: string;
  color: string;
}

type AlertPillStyle = CSSProperties & { '--alert-color': string };

const ALERTS: Alert[] = [
  { label: '8 reports open >6 hrs', color: 'var(--status-critical)' },
  { label: '12 host verifications pending', color: 'var(--status-warning)' },
  { label: '14 Payout holds', color: 'var(--status-good)' },
];

export default function AlertBar() {
  return (
    <div className="dash-alerts">
      {ALERTS.map((alert) => (
        <button
          type="button"
          className="dash-alert-pill"
          key={alert.label}
          style={{ '--alert-color': alert.color } as AlertPillStyle}
        >
          <span className="dash-alert-dot" />
          <span>{alert.label}</span>
          <ArrowUpRight size={14} />
        </button>
      ))}
    </div>
  );
}
