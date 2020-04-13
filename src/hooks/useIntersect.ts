import { useEffect, useState, useRef } from 'react';

export const useIntersect = () => {
  const [intersecting, setIntersecting] = useState(false);
  const [node, setNode] = useState<Element | null>(null);

  const observeOptions = {
    root: null,
    rootMargin: "0px",
  };

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    const intersecting = entries.some(entry => entry.isIntersecting);
    setIntersecting(intersecting);
  };

  const observer = useRef(new IntersectionObserver(observerCallback, observeOptions));

  useEffect(() => {
    const { current: currentObserver } = observer;
    if (currentObserver) {
      currentObserver.disconnect();
    }
    if (node) {
      currentObserver.observe(node);
    }

    return () => {
      currentObserver.disconnect();
    }
  }, [node])

  return { intersecting, ref: setNode };
};
