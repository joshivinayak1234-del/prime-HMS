export function ShortcutPanel({ shortcuts }) {
  return (
    <div className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">Keyboard Command Center</h2>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
        {Object.values(shortcuts).map((item) => (
          <div key={item.key} className="rounded border border-slate-200 p-2 text-sm">
            <kbd>{item.key}</kbd> <span className="ml-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
