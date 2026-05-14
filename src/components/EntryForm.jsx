import { useEffect, useState, useRef } from "react";
import { ACCOUNTS, CATEGORIES } from "../constants";

function formatDisplay(date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }); // "29 Apr 2026"
}

function formatDmy(date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = String(date.getFullYear());
  return `${day}-${month}-${year}`;
}

function parseLocalDate(dateStr) {
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

function formatAmountWithDots(value) {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export default function EntryForm({ onAdd, containerRef }) {
  const emptyTransaction = {
    type: "expense",
    date: "",
    account: "",
    category: "",
    note: "",
    amount: "",
  };

  const [form, setForm] = useState(emptyTransaction);
  const [focusedField, setFocusedField] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dateRef = useRef(null);
  const accountButtonRef = useRef(null);
  const categoryButtonRef = useRef(null);
  const accountDropdownRef = useRef(null);
  const categoryDropdownRef = useRef(null);
  const amountRef = useRef(null);

  const parsedDate = parseLocalDate(form.date);
  const currentDate = parsedDate ?? new Date();
  const isDateActive = focusedField === "date";
  const isAccountActive = focusedField === "account" || openDropdown === "account";
  const isCategoryActive = focusedField === "category" || openDropdown === "category";
  const dateDisplay = form.date
    ? formatDisplay(currentDate)
    : isDateActive
      ? "Select date"
      : "-";
  const accountDisplay = form.account
    ? form.account
    : isAccountActive
      ? "Select account"
      : "-";
  const categoryDisplay = form.category
    ? form.category
    : isCategoryActive
      ? "Select category"
      : "-";

  function setDate(date) {
    setForm(prev => ({ ...prev, date: formatDmy(date) }));
  }

  function handleDateKeyDown(e) {
    if (e.key === "t" || e.key === "T") {
      e.preventDefault();
      setDate(new Date());
    }
    if (e.key === "y" || e.key === "Y") {
      e.preventDefault();
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      setDate(yesterday);
    }
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = new Date(currentDate);
      prev.setDate(prev.getDate() - 1);
      setDate(prev);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = new Date(currentDate);
      next.setDate(next.getDate() + 1);
      setDate(next);
    }
    if (e.key === "Escape") setFocusedField(null);
  }

  function handleSubmit() {
    const amountValue = Number(form.amount.replace(/\./g, ""));
    if (!amountValue || amountValue <= 0) {
      amountRef.current?.focus();
      return;
    }
    onAdd({ ...form, amount: amountValue });
    setForm(emptyTransaction);
  }

  function handleAmountChange(e) {
    const formatted = formatAmountWithDots(e.target.value);
    setForm(prev => ({ ...prev, amount: formatted }));
  }

  function handleDropdownToggle(name, event) {
    setOpenDropdown(prev => {
      const next = prev === name ? null : name;
      if (!next) {
        event?.preventDefault();
        setFocusedField(null);
        if (name === "account") accountButtonRef.current?.blur();
        if (name === "category") categoryButtonRef.current?.blur();
      }
      return next;
    });
  }

  function handleDropdownSelect(name, value) {
    setForm(prev => ({ ...prev, [name]: value }));
    setOpenDropdown(null);
    setFocusedField(null);
  }

  useEffect(() => {
    function handlePointerDown(event) {
      const target = event.target;
      const isInside = [
        dateRef.current,
        accountButtonRef.current,
        categoryButtonRef.current,
        accountDropdownRef.current,
        categoryDropdownRef.current,
      ].some(node => node && node.contains(target));

      if (!isInside) {
        setOpenDropdown(null);
        setFocusedField(null);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, []);

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div
      ref={containerRef}
      className="w-full bg-bg-surface-alt overflow-visible box-border"
      onKeyDown={handleKeyDown}
    >
      {/* Form toolbar */}
      <div className="w-full h-[35px] flex items-center gap-[4px] bg-bg-surface px-[12px] py-[8px] border-b border-border box-border font-mono text-xs">
        <button
          onClick={() => setForm(prev => ({
            ...prev,
            type: prev.type === "expense" ? "income" : "expense",
            date: "",
            account: "",
            category: "",
            note: "",
            amount: "",
          }))}
          className={`font-medium rounded cursor-pointer py-[2px] px-[6px] mr-[8px] ${form.type === "expense" ? "bg-danger-bg text-danger" : "bg-success-bg text-success"}`}
        >
          {form.type === "expense" ? "Expense" : "Income"}
        </button>

        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1">
            <span className="h-[15px] border-l border-border self-center mr-[8px]" />
            <kbd className="bg-bg-white border-[0.8px] border-border rounded-[4px] px-[4px] text-text-secondary font-normal">Tab</kbd>
            <span className="text-text-muted font-medium">Next</span>
          </span>

          <span className="flex items-center gap-1">
            <kbd className="bg-bg-white border-[0.8px] border-border rounded-[4px] px-[4px] text-text-secondary font-normal">Enter</kbd>
            <span className="text-text-muted font-medium">Submit</span>
          </span>

          <span className="flex items-center gap-1">
            <span className="h-[15px] border-l border-border self-center mr-[8px]" />
            <kbd className="bg-bg-white border-[0.8px] border-border rounded-[4px] px-[4px] text-text-secondary font-normal">⌘←</kbd>
            <span className="text-text-muted font-medium">Back</span>
          </span>

          <span className="flex items-center gap-1">
            <kbd className="bg-bg-white border-[0.8px] border-border rounded-[4px] px-[4px] text-text-secondary font-normal">⌘→</kbd>
            <span className="text-text-muted font-medium">Fwd</span>
          </span>

          <span className="flex items-center gap-1">
            <span className="h-[15px] border-l border-border self-center mr-[8px]" />
            <kbd className="bg-bg-white border-[0.8px] border-border rounded-[4px] px-[4px] text-text-secondary font-normal">T</kbd>
            <span className="text-text-muted font-medium">Today</span>
          </span>

          <span className="flex items-center gap-1">
            <kbd className="bg-bg-white border-[0.8px] border-border rounded-[4px] px-[4px] text-text-secondary font-normal">Y</kbd>
            <span className="text-text-muted font-medium">Yesterday</span>
          </span>
        </div>
      </div>

      {/* Form fields */}
      <div className="grid w-full grid-cols-5 bg-bg-white font-mono font-medium">
        {/* DATE */}
        <div className="group relative flex flex-col px-4 py-3 border-r border-border border-b border-border min-w-0 box-border focus-within:shadow-[inset_0_-2px_0_0_#000]">
          <span className="text-xs text-text-muted uppercase mb-1 group-focus-within:text-text-default">Date</span>
          <button
            ref={dateRef}
            onKeyDown={handleDateKeyDown}
            onFocus={() => {
              setOpenDropdown(null);
              setFocusedField("date");
            }}
            onBlur={() => setFocusedField(null)}
            className={`text-sm text-left outline-none cursor-pointer ${form.date ? "text-text-default" : "text-text-muted"}`}
          >
            {dateDisplay}
          </button>
        </div>

        {/* ACCOUNT */}
        <div className="group relative flex flex-col px-4 py-3 border-r border-border border-b border-border min-w-0 box-border focus-within:shadow-[inset_0_-2px_0_0_#000]">
          <span className="text-xs text-text-muted uppercase mb-1 group-focus-within:text-text-default">Account</span>
          <button
            ref={accountButtonRef}
            type="button"
            onMouseDown={(event) => handleDropdownToggle("account", event)}
            onFocus={() => setFocusedField("account")}
            onBlur={() => setFocusedField(null)}
            className={`text-sm text-left outline-none cursor-pointer ${form.account ? "text-text-default" : "text-text-muted"}`}
          >
            {accountDisplay}
          </button>
          {openDropdown === "account" && (
            <div ref={accountDropdownRef} className="absolute left-[-12px] top-full z-50 w-[calc(100%+24px)] rounded-lg border border-border bg-bg-white">
              {ACCOUNTS.map((a, index) => (
                <button
                  key={a}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleDropdownSelect("account", a);
                  }}
                  className="flex w-full items-center gap-2 border-b border-border px-4 py-3 text-left font-sans text-sm font-medium last:border-b-0"
                >
                  <span className="text-text-muted">{index + 1}</span>
                  <span className="text-text-default">{a}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* CATEGORY */}
        <div className="group relative flex flex-col px-4 py-3 border-r border-border border-b border-border min-w-0 box-border focus-within:shadow-[inset_0_-2px_0_0_#000]">
          <span className="text-xs text-text-muted uppercase mb-1 group-focus-within:text-text-default">Category</span>
          <button
            ref={categoryButtonRef}
            type="button"
            onMouseDown={(event) => handleDropdownToggle("category", event)}
            onFocus={() => setFocusedField("category")}
            onBlur={() => setFocusedField(null)}
            className={`text-sm text-left outline-none cursor-pointer ${form.category ? "text-text-default" : "text-text-muted"}`}
          >
            {categoryDisplay}
          </button>
          {openDropdown === "category" && (
            <div ref={categoryDropdownRef} className="absolute left-[-12px] top-full z-50 w-[calc(100%+24px)] rounded-lg border border-border bg-bg-white">
              {CATEGORIES[form.type].map((c, index) => (
                <button
                  key={c}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleDropdownSelect("category", c);
                  }}
                  className="flex w-full items-center gap-2 border-b border-border px-4 py-3 text-left font-sans text-sm font-medium last:border-b-0"
                >
                  <span className="text-text-muted">{index + 1}</span>
                  <span className="text-text-default">{c}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NOTE */}
        <div className="group flex flex-col px-4 py-3 border-r border-border border-b border-border min-w-0 box-border focus-within:shadow-[inset_0_-2px_0_0_#000]">
          <span className="text-xs text-text-muted uppercase mb-1 group-focus-within:text-text-default">Note</span>
          <input
            type="text"
            placeholder={focusedField === "note" ? "Add a note" : "-"}
            value={form.note}
            onFocus={() => setFocusedField("note")}
            onBlur={() => setFocusedField(null)}
            onChange={(e) => setForm(prev => ({ ...prev, note: e.target.value }))}
            className="text-sm outline-none bg-transparent placeholder:text-text-muted"
          />
        </div>

        {/* AMOUNT */}
        <div className="group flex flex-col px-4 py-3 border-b border-border min-w-0 box-border focus-within:shadow-[inset_0_-2px_0_0_#000]">
          <span className="text-xs text-text-muted uppercase mb-1 group-focus-within:text-text-default">Amount</span>
          <input
            ref={amountRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9.]*"
            placeholder={focusedField === "amount" ? "Add Amount" : "-"}
            value={form.amount}
            onFocus={() => setFocusedField("amount")}
            onBlur={() => setFocusedField(null)}
            onChange={handleAmountChange}
            className="text-sm outline-none bg-transparent placeholder:text-text-muted"
          />
        </div>
      </div>

    </div>
  );
}
