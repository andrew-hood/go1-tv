import { useEffect, useState } from 'react';

export default function useIncrementIndex(
  keys: string[], 
  enabled = false, 
  min = 0, 
  max = 10
): [number, (x: boolean) => void, (x: number) => void] {
  const [down, up] = keys;
  const [isEnabled, setIsEnabled] = useState(enabled);
  const [maxCount, setMaxCount] = useState(max);
  let [index, setIndex] = useState(min);

  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (!isEnabled) return setIndex(0);
      if (e.key === up && index < (maxCount - 1)) setIndex(++index);
      if (e.key === down && index > min) setIndex(--index);
    }
    window.addEventListener('keyup', onKeyup);
    return () => window.removeEventListener('keyup', onKeyup);
  }, [isEnabled, maxCount]);

  return [index, setIsEnabled, setMaxCount];
}