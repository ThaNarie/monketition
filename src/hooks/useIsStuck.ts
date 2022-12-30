import { useMount } from '@mediamonks/react-hooks';
import { type MutableRefObject, useRef, useState } from 'react';

export function useIsStuck(): { isStuck: boolean; ref: MutableRefObject<null> } {
  const ref = useRef(null);
  const [isStuck, setIsStuck] = useState(false);
  useMount(() => {
    const options = {
      // sticky offset + sticky height
      rootMargin: '-145px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      setIsStuck(!entries[0].isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }
  });

  return { ref, isStuck };
}
