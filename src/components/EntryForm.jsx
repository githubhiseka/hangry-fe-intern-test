export default function EntryForm({ onAdd }) {
  return (
    <div
      className="w-full bg-bg-surface-alt overflow-visible box-border"
      onKeyDown={handleKeyDown}
    >
      {/* Form toolbar */}
      <div className="w-[856px] h-[35px] flex items-center gap-[4px] bg-bg-surface px-[12px] py-[8px] border-b border-border box-border font-mono text-xs">
        <button
          onClick={() => setForm(prev => ({
            ...prev,
            type: prev.type === "expense" ? "income" : "expense",
            category: "",
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
    </div>
  );
}