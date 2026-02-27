const tabs = ['Dashboard', 'Registration', 'OPD', 'IPD', 'Billing', 'Pharmacy', 'Laboratory', 'Reports'];

export function ModuleTabs({ active, onChange }) {
  return (
    <div className="mb-4 flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className={`rounded px-3 py-2 text-sm font-medium ${
            active === tab ? 'bg-primary text-white' : 'bg-white text-slate-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
