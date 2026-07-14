import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import PendingVerifications from '../components/dashboard/PendingVerifications';

const STATS: StatCard[] = [
  { label: 'New Host', value: '230' },
  { label: 'Pending', value: '128' },
  { label: 'Completed', value: '200' },
  { label: 'Rejected', value: '12' },
];

export default function HostVerification() {
  return (
    <>
      <StatCards stats={STATS} />
      <PendingVerifications />
    </>
  );
}
