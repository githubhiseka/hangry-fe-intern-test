import { useState } from "react";
import { Search } from "lucide-react";
import DateGroup from "./DateGroup";

const TABS = ["By Date", "By Category", "By Account"];
const UNKNOWN_GROUP = "NO DATE SPECIFIED";

function parseDateFromDmy(dateStr) {
  if (!dateStr) return null;

  const match = /^(\d{2})-(\d{2})-(\d{4})$/.exec(dateStr);
  if (!match) return null;

  const day = Number(match[1]);
  const month = Number(match[2]);
  const year = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null;
  }

  return date;
}

function normalizeDmy(dateStr) {
  const date = parseDateFromDmy(dateStr);
  if (!date) return null;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());

  return `${day}-${month}-${year}`;
}

function formatLabel(dateStr) {
  const date = parseDateFromDmy(dateStr);
  if (!date) return UNKNOWN_GROUP;

  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return "TODAY";
  if (date.toDateString() === yesterday.toDateString()) return "YESTERDAY";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).toUpperCase();
}

export default function TransactionList({ transactions }) {
  const [activeTab, setActiveTab] = useState("By Date");
  const [search, setSearch] = useState("");

  const filtered = transactions.filter((t) =>
    t.note.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = filtered.reduce((acc, t) => {
    const normalizedDate = normalizeDmy(t.date);
    const key = normalizedDate ?? UNKNOWN_GROUP;
    if (!acc[key]) acc[key] = [];
    acc[key].push(t);
    return acc;
  }, {});

  const sortedDates = Object.keys(grouped).sort((a, b) => {
    if (a === UNKNOWN_GROUP) return 1;
    if (b === UNKNOWN_GROUP) return -1;

    const dateA = parseDateFromDmy(a);
    const dateB = parseDateFromDmy(b);

    if (!dateA || !dateB) return 0;
    return dateB - dateA;
  });

  return (
    <div className="flex flex-col items-center">
      {/* Toolbar */}
      <div className="flex h-[45px] w-[856px] items-center justify-between border-b border-border bg-bg-surface-alt px-4 py-2 box-border">
        <div className="flex h-[29px] items-center gap-2 py-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center justify-center gap-1 text-xs font-semibold cursor-pointer whitespace-nowrap
                ${activeTab === tab
                  ? "h-[21px] rounded-[24px] border-[0.8px] border-border bg-bg-white px-2 py-1 text-text-default shadow-[0px_1px_2px_0px_rgba(38,38,38,0.05)]"
                  : "h-[21px] px-2 py-1 text-text-secondary"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex h-[25px] w-[160px] items-center gap-1 rounded-[8px] border-[0.5px] border-border bg-bg-white px-2 py-[6px] box-border">
          <Search size={12} className="h-3 w-3 shrink-0 text-text-secondary" />
          <input
            type="text"
            placeholder="Search transaction"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-xs font-normal text-text-default bg-transparent outline-none placeholder:text-text-muted"
          />
        </div>
      </div>

      {/* Groups */}
      <div className="flex flex-col items-center gap-4 p-4">
        {sortedDates.length === 0 ? (
          <p className="text-sm text-text-muted text-center py-8">No transactions found.</p>
        ) : (
          sortedDates.map((date) => (
            <DateGroup
              key={date}
              label={formatLabel(date)}
              transactions={grouped[date]}
              dailyTotal={grouped[date].reduce((sum, t) =>
                t.type === "income" ? sum + t.amount : sum - t.amount, 0
              )}
            />
          ))
        )}
      </div>
    </div>
  );
}