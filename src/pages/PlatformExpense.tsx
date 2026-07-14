import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import ExpenseTable from '../components/dashboard/ExpenseTable';

const STATS: StatCard[] = [
  { label: 'Revenue(Mo)', value: '₹6,24,800', note: '▲ 19%', noteTone: 'good' },
  { label: 'Host Payouts', value: '₹1,12,400', note: '▲ 8% vs last', noteTone: 'critical' },
  { label: 'Platfrom Costs', value: '₹1,12,400', note: '18% of rev', noteTone: 'muted' },
  { label: 'Net Profit', value: '₹75,040', note: '12% margin', noteTone: 'muted' },
];

export default function PlatformExpense() {
  return (
    <>
      <StatCards stats={STATS} />
      <ExpenseTable />
    </>
  );
}
