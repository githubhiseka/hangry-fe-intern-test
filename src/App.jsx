import { useState } from "react";
import EntryForm from "./components/EntryForm";
import Navbar from "./components/Navbar";
import SummaryBar from "./components/SummaryBar";
import TransactionList from "./components/TransactionList";

export default function App() {
  const [activePage, setActivePage] = useState("Transactions");
  const [transactions, setTransactions] = useState([
    {
      id: "seed-1",
      type: "expense",
      account: "BCA",
      category: "Food",
      note: "Lunch",
      amount: 50000000,
      date: "13-05-2026",
    },
    {
      id: "seed-2",
      type: "income",
      account: "Jago",
      category: "Salary",
      note: "May payout",
      amount: 2500000,
      date: "13-05-2026",
    },
  ]);

  function addTransaction(form) {
    setTransactions(prev => [...prev, {
      ...form,
      id: crypto.randomUUID(),
    }]);
  }

  return (
    <div className="min-h-screen bg-bg-surface">
      <Navbar
        activePage={activePage}
        onChangePage={setActivePage}
      />

      {activePage === "Transactions" ? (
        <div className="min-h-screen max-w-5xl mx-auto px-4 pb-8 flex flex-col items-center gap-0">
          <div className="w-[856px] border-x border-border box-border">
            <EntryForm onAdd={addTransaction} />
            <SummaryBar transactions={transactions} />
          </div>
          <div className="w-[856px] flex-1 min-h-0 border-x border-border box-border">
            <TransactionList transactions={transactions} />
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4">
          <span className="text-sm text-text-muted">In development</span>
        </div>
      )}
    </div>
  );
}