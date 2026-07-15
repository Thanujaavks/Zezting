import { useEffect, useState } from 'react';
import { fetchFeatureUsage, type FeatureUsage } from '../../api/appAnalytics';
import { ApiError } from '../../lib/apiClient';

const COLOR_BY_KEY: Record<string, string> = {
  AUDIO_CALLS: 'var(--chart-purple)',
  VIDEO_CALLS: 'var(--chart-pink)',
  BITZ_REQUESTS: 'var(--feature-amber)',
};

function colorFor(key: string, index: number): string {
  const palette = ['var(--chart-purple)', 'var(--chart-pink)', 'var(--feature-amber)'];
  return COLOR_BY_KEY[key] ?? palette[index % palette.length];
}

function buildConicGradient(features: FeatureUsage[]) {
  let cursor = 0;
  const stops: string[] = [];
  for (const [index, f] of features.entries()) {
    const start = cursor;
    const end = cursor + f.percentage;
    stops.push(`${colorFor(f.key, index)} ${start}% ${end}%`);
    cursor = end;
  }
  return `conic-gradient(${stops.join(', ')})`;
}

export default function FeatureUsageBreakdown() {
  const [features, setFeatures] = useState<FeatureUsage[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchFeatureUsage()
      .then((data) => {
        if (cancelled) return;
        setFeatures(data);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Failed to load feature usage.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="panel">
      <div className="panel-head">
        <span className="panel-title">Feature usage breakdown</span>
      </div>

      {loading || error || !features ? (
        <div className="hourly-bars-empty">{error ?? 'Loading…'}</div>
      ) : (
        <div className="feature-usage-wrap">
          <div className="donut" style={{ background: buildConicGradient(features) }}>
            <div className="donut-hole" />
          </div>

          <div className="feature-list">
            {features.map((f, index) => {
              const color = colorFor(f.key, index);
              return (
                <div className="feature-row" key={f.key}>
                  <div className="feature-row-top">
                    <span>
                      <span className="feature-row-title">
                        <span className="feature-dot" style={{ background: color }} />
                        {f.label}
                      </span>
                      <span className="feature-row-sub">
                        {f.users.toLocaleString('en-IN')} users · {f.sessions.toLocaleString('en-IN')} sessions
                      </span>
                    </span>
                    <span className="feature-row-percent">{f.percentage}%</span>
                  </div>
                  <span className="feature-bar-track">
                    <span
                      className="feature-bar-fill"
                      style={{ width: `${f.percentage}%`, background: color }}
                    />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
