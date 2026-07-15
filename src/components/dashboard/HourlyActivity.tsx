import { useEffect, useState } from 'react';
import { fetchHourlyActivity, type HourlyActivityBucket } from '../../api/appAnalytics';
import { ApiError } from '../../lib/apiClient';

function todayDate(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export default function HourlyActivity() {
  const [buckets, setBuckets] = useState<HourlyActivityBucket[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchHourlyActivity(todayDate())
      .then((data) => {
        if (cancelled) return;
        setBuckets(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load hourly activity.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const maxScore = buckets ? Math.max(1, ...buckets.map((b) => b.activityScore)) : 1;
  const peakScore = buckets ? Math.max(...buckets.map((b) => b.activityScore)) : 0;

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Hourly Activity — Today</span>
      </div>

      {loading || error || !buckets ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : (
        <>
          <div className="hourly-bars">
            {buckets.map((bucket) => {
              const height = bucket.activityScore > 0 ? (bucket.activityScore / maxScore) * 100 : 2;
              const peak = bucket.activityScore === peakScore && peakScore > 0;
              return (
                <div className="hourly-bar-col" key={bucket.hour}>
                  <div
                    className="hourly-bar"
                    style={{
                      height: `${height}%`,
                      background: peak ? 'var(--chart-pink)' : 'var(--chart-purple)',
                    }}
                    title={`${bucket.label}: ${bucket.activeUsers} active users, ${bucket.calls} calls`}
                  />
                </div>
              );
            })}
          </div>
          <div className="hourly-labels">
            {buckets.map((bucket) => (
              <span className="hourly-label-col" key={bucket.hour}>
                {bucket.label}
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
