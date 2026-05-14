export default function Navbar({ activePage, onChangePage, userName = "My Name" }) {
  return (
    <div className="w-full border-b border-border">
      <div className="mx-auto flex h-[56px] w-[1440px] items-center justify-between px-4 py-3 box-border">
        <div className="font-mono text-base font-[var(--font-weight-bold)]">
          Expense Tracker
        </div>

        <div className="flex items-center gap-2 text-sm font-[var(--font-weight-semibold)]">
          {["Transactions", "Accounts", "Settings"].map((label) => (
            <button
              key={label}
              onClick={() => onChangePage(label)}
              className={`flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap
                ${activePage === label
                  ? "h-[21px] rounded-[24px] border-[0.8px] border-border bg-bg-white px-2 py-1 text-text-default shadow-[0px_1px_2px_0px_rgba(38,38,38,0.05)]"
                  : "h-[21px] px-2 py-1 text-text-secondary"
                }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-sm font-[var(--font-weight-semibold)]">
          <div className="h-4 w-4 rounded-full border border-border bg-bg-white" />
          <span className="text-text-default">{userName}</span>
        </div>
      </div>
    </div>
  );
}
