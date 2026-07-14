import RevenueStats from '../components/dashboard/RevenueStats';
import RevenueTrendChart from '../components/dashboard/RevenueTrendChart';
import RevenueOverview from '../components/dashboard/RevenueOverview';
import PendingPayouts from '../components/dashboard/PendingPayouts';

export default function Revenue() {
  return (
    <>
      <RevenueStats />

      <div className="dash-cols">
        <RevenueTrendChart />
        <div className="dash-col-stack">
          <RevenueOverview />
        </div>
      </div>

      <div className="dash-cols">
        <PendingPayouts />
      </div>
    </>
  );
}
