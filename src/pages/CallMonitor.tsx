import StatCards, { type StatCard } from '../components/dashboard/StatCards';
import CallRecordingsTable from '../components/dashboard/CallRecordingsTable';

const STATS: StatCard[] = [
  { label: 'New Hosts - Monitoring', value: '7', note: 'First call auto-recorded', noteTone: 'good' },
  { label: 'Reported- Monitoring', value: '12', note: 'Every call 1-min recorded', noteTone: 'good' },
  { label: 'Recordings Pending Review', value: '120', note: 'Needs admin action', noteTone: 'critical' },
  { label: 'Normal Call ( No Record)', value: '400', note: 'No monitoring needed', noteTone: 'muted' },
];

export default function CallMonitor() {
  return (
    <>
      <StatCards stats={STATS} />
      <CallRecordingsTable />
    </>
  );
}
