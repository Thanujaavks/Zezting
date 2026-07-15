import { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import AddExpenseServiceModal from './AddExpenseServiceModal';

interface ExpenseRow {
  id: number;
  date: string;
  service: string;
  amount: string;
  type: 'Auto' | 'Manual';
  expiryDate: string;
  paid: boolean;
}

const EXPENSES: ExpenseRow[] = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  date: 'Apr 25',
  service: 'Razorpay',
  amount: '₹5,200',
  type: 'Auto' as const,
  expiryDate: 'Apr 25',
  paid: i % 2 === 1,
}));

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export default function ExpenseTable() {
  const [rows, setRows] = useState(EXPENSES);
  const [monthIndex, setMonthIndex] = useState(2); // March
  const [year, setYear] = useState(2026);
  const [showAddService, setShowAddService] = useState(false);

  const shiftMonth = (delta: number) => {
    const next = monthIndex + delta;
    if (next < 0) {
      setMonthIndex(11);
      setYear((y) => y - 1);
    } else if (next > 11) {
      setMonthIndex(0);
      setYear((y) => y + 1);
    } else {
      setMonthIndex(next);
    }
  };

  const togglePaid = (id: number) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, paid: !r.paid } : r)));
  };

  return (
    <div className="panel">
      <div className="panel-head expense-head">
        <span className="panel-title">Expense categories</span>

        <div className="expense-head-actions">
          <div className="month-picker">
            <span className="month-picker-icon">
              <Calendar size={15} />
            </span>
            <span className="month-picker-label">
              {MONTHS[monthIndex]} {year}
            </span>
            <button type="button" className="month-picker-nav" onClick={() => shiftMonth(-1)} aria-label="Previous month">
              <ChevronLeft size={15} />
            </button>
            <button type="button" className="month-picker-nav" onClick={() => shiftMonth(1)} aria-label="Next month">
              <ChevronRight size={15} />
            </button>
          </div>

          <button type="button" className="btn-add-service" onClick={() => setShowAddService(true)}>
            <Plus size={15} />
            Add Service
          </button>
        </div>
      </div>

      {showAddService && <AddExpenseServiceModal onClose={() => setShowAddService(false)} />}

      <div className="host-table-scroll">
        <div className="expense-table">
          <div className="user-table-row user-table-head-row">
            <span>Date</span>
            <span>Services</span>
            <span>Amount</span>
            <span>Type</span>
            <span>Expiry Date</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {rows.map((row) => (
            <div className="expense-table-row" key={row.id}>
              <span className="expense-date">{row.date}</span>
              <span>{row.service}</span>
              <span className="expense-amount">{row.amount}</span>
              <span>{row.type}</span>
              <span className="cell-muted">{row.expiryDate}</span>
              <span className={`expense-status ${row.paid ? 'paid' : 'pending'}`}>
                {row.paid ? 'Paid' : 'Pending'}
              </span>
              <span>
                <button type="button" className="expense-action-btn" onClick={() => togglePaid(row.id)}>
                  {row.paid ? 'Unpaid' : 'Mark as paid'}
                </button>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
