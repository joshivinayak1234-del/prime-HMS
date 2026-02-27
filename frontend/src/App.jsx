import { useCallback, useMemo, useState } from 'react';
import { ModuleTabs } from './components/ModuleTabs';
import { ShortcutPanel } from './components/ShortcutPanel';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { defaultShortcuts } from './shortcuts/defaultShortcuts';
import { DashboardPage } from './pages/DashboardPage';

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [selectedAction, setSelectedAction] = useState('');

  const shortcuts = useMemo(() => defaultShortcuts, []);

  const handleShortcut = useCallback((shortcut) => {
    setSelectedAction(shortcut.label);

    const tabMap = {
      NEW_PATIENT: 'Registration',
      SEARCH_PATIENT: 'Registration',
      OPD_BILLING: 'Billing',
      IPD_ADMISSION: 'IPD',
      PHARMACY_BILLING: 'Pharmacy',
      LAB_ENTRY: 'Laboratory',
      DISCHARGE: 'IPD',
    };

    const nextTab = tabMap[shortcut.action];
    if (nextTab) setActiveTab(nextTab);
  }, []);

  useKeyboardShortcuts(shortcuts, handleShortcut);

  return (
    <main className="mx-auto max-w-7xl p-4">
      <header className="mb-4 rounded-lg bg-primary p-4 text-white shadow">
        <h1 className="text-2xl font-semibold">Prime HMS - Keyboard First</h1>
        <p className="text-sm">Fast OPD/IPD, billing, pharmacy and laboratory workflows.</p>
      </header>

      <ModuleTabs active={activeTab} onChange={setActiveTab} />
      <DashboardPage selectedAction={selectedAction} />
      <div className="mt-4">
        <ShortcutPanel shortcuts={shortcuts} />
      </div>
    </main>
  );
}
