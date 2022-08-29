import { useRef, useState, useEffect } from 'react';

const useLastItemOnScreen = (options: Object) => {
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

export default useLastItemOnScreen;
