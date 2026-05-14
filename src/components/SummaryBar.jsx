export default function SummaryBar({ transactions }) {
  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const income = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const total = income - expense;

  function getTotalTone() {
    if (total > 0) return "text-success";
    if (total < 0) return "text-danger";
    return "text-text-default";
  }

  return (
    <div className="flex h-[48px] w-full items-center border-b border-border bg-bg-surface box-border">
      <div className="flex h-[48px] flex-1 min-w-0 items-center justify-between border-r border-border px-4 py-4 box-border font-mono">
        <span className="text-xs font-medium text-text-secondary uppercase">Expense ↗</span>
        <span className="text-sm font-medium text-danger">
          Rp{expense.toLocaleString("id-ID")}
        </span>
      </div>

      <div className="flex h-[48px] flex-1 min-w-0 items-center justify-between border-r border-border px-4 py-4 box-border font-mono">
        <span className="text-xs font-medium text-text-secondary uppercase">Income ↘</span>
        <span className="text-sm font-medium text-success">
          Rp{income.toLocaleString("id-ID")}
        </span>
      </div>

      <div className="flex h-[48px] flex-1 min-w-0 items-center justify-between px-4 py-4 box-border font-mono">
        <span className="text-xs font-medium text-text-secondary uppercase">Total</span>
        <div className={`text-sm font-medium ${getTotalTone()}`}>
          Rp{Math.abs(total).toLocaleString("id-ID")}
        </div>
      </div>
    </div>
  );
}