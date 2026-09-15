function VoteButton({ icon: Icon, count, active, onClick, disabled, activeLabel, inactiveLabel }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center gap-1.5 rounded-md px-2 py-1.5 text-xs transition ${active ? "text-amber-500" : "text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"} disabled:cursor-not-allowed disabled:opacity-50`}
      aria-label={active ? activeLabel : inactiveLabel}
    >
      <Icon size={15} />
      <span>{count}</span>
    </button>
  );
}

export default VoteButton;
