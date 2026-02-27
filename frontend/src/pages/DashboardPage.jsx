const cardData = [
  { title: 'Today Revenue', value: '₹2,45,600' },
  { title: 'OPD Patients', value: '312' },
  { title: 'IPD Occupancy', value: '84%' },
  { title: 'Outstanding Dues', value: '₹38,420' },
];

export function DashboardPage({ selectedAction }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {cardData.map((card) => (
          <div key={card.title} className="rounded-lg bg-white p-4 shadow">
            <p className="text-sm text-slate-500">{card.title}</p>
            <h3 className="text-2xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-dashed border-primary bg-blue-50 p-4">
        <strong>Last Shortcut Triggered:</strong> {selectedAction || 'None'}
      </div>
    </div>
  );
}
