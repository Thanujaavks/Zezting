import StatCards from '../components/dashboard/StatCards';
import HourlyActivity from '../components/dashboard/HourlyActivity';
import GrowthSignals from '../components/dashboard/GrowthSignals';
import FeatureUsageBreakdown from '../components/dashboard/FeatureUsageBreakdown';
import TopStates from '../components/dashboard/TopStates';

export default function AppAnalytics() {
  return (
    <>
      <StatCards />

      <div className="dash-cols">
        <HourlyActivity />
        <div className="dash-col-stack">
          <GrowthSignals />
        </div>
      </div>

      <div className="dash-cols">
        <FeatureUsageBreakdown />
        <div className="dash-col-stack">
          <TopStates />
        </div>
      </div>
    </>
  );
}
