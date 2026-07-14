import AlertBar from '../components/dashboard/AlertBar';
import StatCards from '../components/dashboard/StatCards';
import PerformancePanel from '../components/dashboard/PerformancePanel';
import PeakEngagement from '../components/dashboard/PeakEngagement';
import TopHosts from '../components/dashboard/TopHosts';
import Heatmap from '../components/dashboard/Heatmap';
import GrowthSignals from '../components/dashboard/GrowthSignals';

export default function DashboardHome() {
  return (
    <>
      <AlertBar />
      <StatCards />

      <div className="dash-cols">
        <PerformancePanel />
        <div className="dash-col-stack">
          <PeakEngagement />
          <TopHosts />
        </div>
      </div>

      <div className="dash-cols dash-cols-equal">
        <Heatmap />
        <div className="dash-col-stack">
          <GrowthSignals />
        </div>
      </div>
    </>
  );
}
