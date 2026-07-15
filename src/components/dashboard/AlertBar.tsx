import { useEffect, useState, type CSSProperties } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { fetchDashboardAlerts } from '../../api/dashboard';
import { ApiError } from '../../lib/apiClient';

interface Alert {
  label: string;
  color: string;
}

type AlertPillStyle = CSSProperties & { '--alert-color': string };

export default function AlertBar() {
  const [alerts, setAlerts] = useState<Alert[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setError(null);

    fetchDashboardAlerts()
      .then((data) => {
        if (cancelled) return;
        setAlerts([
          { label: `${data.openReportsOver6Hours} reports open >6 hrs`, color: 'var(--status-critical)' },
          { label: `${data.pendingHostVerifications} host verifications pending`, color: 'var(--status-warning)' },
          { label: `${data.payoutHolds} Payout holds`, color: 'var(--status-good)' },
        ]);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load alerts.');
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="dash-alerts">
        <span className="dash-alert-pill">{error}</span>
      </div>
    );
  }

  if (!alerts) return null;

  return (
    <div className="dash-alerts">
      {alerts.map((alert) => (
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
