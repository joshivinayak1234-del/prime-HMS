import { useEffect } from 'react';

function normalize(event) {
  if (event.ctrlKey && event.key.toLowerCase() === 's') return 'CTRL+S';
  if (event.ctrlKey && event.key.toLowerCase() === 'p') return 'CTRL+P';
  return event.key.toUpperCase();
}

export function useKeyboardShortcuts(shortcuts, handler) {
  useEffect(() => {
    const onKeyDown = (event) => {
      const hotkey = normalize(event);
      if (!shortcuts[hotkey]) return;
      event.preventDefault();
      handler(shortcuts[hotkey]);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [handler, shortcuts]);
}
