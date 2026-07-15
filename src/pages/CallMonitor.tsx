import { useEffect, useState } from 'react';
import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import CallRecordingsTable from '../components/dashboard/CallRecordingsTable';
import { fetchRecordingReviewSummary, type RecordingReviewSummary } from '../api/callMonitor';
import { ApiError } from '../lib/apiClient';

function buildStats(data: RecordingReviewSummary): StatCard[] {
  return [
    {
      label: 'New Hosts - Monitoring',
      value: data.newHostPending.toLocaleString('en-IN'),
      note: 'First call auto-recorded',
      noteTone: 'good',
    },
    {
      label: 'Reported- Monitoring',
      value: data.reportedPending.toLocaleString('en-IN'),
      note: 'Every call 1-min recorded',
      noteTone: 'good',
    },
    {
      label: 'Recordings Pending Review',
      value: data.totalPending.toLocaleString('en-IN'),
      note: 'Needs admin action',
      noteTone: 'critical',
    },
    {
      label: 'Normal Call ( No Record)',
      value: data.normalCallPending.toLocaleString('en-IN'),
      note: 'No monitoring needed',
      noteTone: 'muted',
    },
  ];
}

export default function CallMonitor() {
  const [stats, setStats] = useState<StatCard[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchRecordingReviewSummary()
      .then((data) => {
        if (cancelled) return;
        setStats(buildStats(data));
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load call monitor stats.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {loading || error ? (
        <div className="stat-grid">
          <div className="stat-card">
            <span className="stat-card-label">Call Monitor Stats</span>
            <span className="stat-card-value">{error ?? 'Loading…'}</span>
          </div>
        </div>
      ) : (
        <StatCards stats={stats ?? undefined} />
      )}

      <CallRecordingsTable />
    </>
  );
}
