import { useEffect } from 'react';

export default function useKeyPress(key: string, action: any) {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) action();
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [action, key]);
}