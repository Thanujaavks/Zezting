import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import HostEarningsTable from '../components/dashboard/HostEarningsTable';

const STATS: StatCard[] = [
  { label: 'Total Payout (Mo)', value: '₹4,37,360', delta: '22%' },
  { label: 'CA Host Avg', value: '₹9,100', delta: '2.2x Zezting' },
  { label: 'Zezting Host Avg', value: '18,342', delta: '22% vs yesterday' },
  { label: 'Bonuses Awarded', value: '₹12,500', delta: '3 this week' },
];

export default function HostEarnings() {
  return (
    <>
      <StatCards stats={STATS} />
      <HostEarningsTable />
    </>
  );
}
