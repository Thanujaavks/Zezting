import { Siren } from 'lucide-react';

export default function EmergencyAlert() {
  return (
    <div className="emergency-banner">
      <span className="emergency-icon">
        <Siren size={20} />
      </span>

      <div className="emergency-text">
        <span className="emergency-title">2 emergency support requests — respond immediately</span>
        <span className="emergency-sub">
          Host Priya S. and User @raj_k have active emergency requests. SLA: respond within 5 minutes.
        </span>
      </div>

      <button type="button" className="btn-emergency">
        View Emergencies
      </button>
    </div>
  );
}
