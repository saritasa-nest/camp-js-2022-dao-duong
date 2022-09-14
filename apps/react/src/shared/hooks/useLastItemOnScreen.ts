import { useRef, useState, useEffect } from 'react';

/**
 * Watch the last item in the list and call the callback when it is visible.
 * @param options Options for intersection observer.
 */
export const useLastItemOnScreen = (options: Object) => {
  const itemRef = useRef(null);
  const [isLastItemVisible, setIsLastItemVisible] = useState(false);

  const callbackFunction = (entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    setIsLastItemVisible(entry.isIntersecting);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [itemRef, options]);

  return { itemRef, isLastItemVisible };
};
