import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import TopHostToday from '../components/dashboard/TopHostToday';
import HostsNeedingAttention from '../components/dashboard/HostsNeedingAttention';
import HostList from '../components/dashboard/HostList';

const STATS: StatCard[] = [
  { label: 'Total Hosts', value: '2,847', delta: '22% vs yesterday' },
  { label: 'CA Host', value: '634', delta: '22% vs yesterday' },
  { label: 'Zezting Host', value: '5', delta: '22% vs yesterday' },
  { label: 'Live Call Now', value: '563', live: true },
];

export default function HostManagement() {
  return (
    <>
      <StatCards stats={STATS} />

      <div className="dash-cols">
        <TopHostToday />
        <div className="dash-col-stack">
          <HostsNeedingAttention />
        </div>
      </div>

      <HostList />
    </>
  );
}
