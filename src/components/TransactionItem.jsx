import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function TransactionItem({ transaction }) {
  const { type, account, category, note, amount } = transaction;
  const isIncome = type === "income";

  return (
    <div className="flex h-[47px] w-[824px] items-center justify-between gap-3 rounded-[8px] border-[0.8px] border-border bg-bg-white px-3 py-2 box-border">
      {/* Arrow icon */}
      <div className={`p-1.5 rounded-full ${isIncome ? "bg-success-bg text-success" : "bg-danger-bg text-danger"}`}>
        {isIncome
          ? <ArrowDownRight size={16} />
          : <ArrowUpRight size={16} />
        }
      </div>

      {/* Badges + note */}
      <div className="flex flex-col gap-0.5 flex-1">
        <div className="flex items-center gap-1">
          <span className="text-xs font-semibold font-mono text-bca">{account}</span>
          <span className="text-xs font-semibold font-mono text-border">/</span>
          <span className="text-xs font-semibold font-mono text-text-secondary">{category}</span>
        </div>
        <span className="text-sm font-medium text-text-default">{note}</span>
      </div>

      {/* Amount */}
      <span className="text-sm font-medium font-mono text-text-default">
        Rp{amount.toLocaleString("id-ID")}
      </span>
    </div>
  );
}