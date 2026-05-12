import TransactionItem from "./TransactionItem";

export default function DateGroup({ label, transactions, dailyTotal }) {
  const isPositive = dailyTotal > 0;
  const isNegative = dailyTotal < 0;
  const totalToneClass = isPositive
    ? "text-success"
    : isNegative
      ? "text-danger"
      : "text-text-default";
  const totalPrefix = isPositive ? "+" : isNegative ? "-" : "";

  return (
    <div className="flex flex-col items-center">
      {/* Date header */}
      <div className="flex h-[21px] w-[856px] items-center justify-between px-4 py-1">
        <span className="text-xs font-semibold text-text-muted uppercase tracking-wide">
          {label}
        </span>
        <span className={`text-xs font-medium font-mono ${totalToneClass}`}>
          {totalPrefix}Rp{Math.abs(dailyTotal).toLocaleString("id-ID")}
        </span>
      </div>

      {/* Transactions */}
      <div className="flex flex-col items-center gap-1">
        {transactions.map((t) => (
          <TransactionItem key={t.id} transaction={t} />
        ))}
      </div>
    </div>
  );
}