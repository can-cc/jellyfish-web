import { useEffect, useRef, useState } from 'react';

export function useFocus() {
  const ref = useRef(null);
  const [value, setValue] = useState(false);

  const handleFocus = () => setValue(true);
  const handleBur = () => setValue(false);

  useEffect(() => {
    const node = ref.current;
    if (node) {
      setValue(node === window.document.activeElement);
      node.addEventListener('focus', handleFocus);
      node.addEventListener('blur', handleBur);

      return () => {
        node.removeEventListener('focus', handleFocus);
        node.removeEventListener('blur', handleBur);
      };
    }
  }, [ref]);

  return [ref, value];
}
