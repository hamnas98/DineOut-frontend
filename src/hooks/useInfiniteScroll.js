import { useRef, useCallback } from "react";

function useInfiniteScroll(callback, hasMore, loading) {
  const observer = useRef();

  const lastElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          callback();
        }
      });

      if (node) observer.current.observe(node);
    },
    [callback, hasMore, loading],
  );

  return lastElementRef;
}

export default useInfiniteScroll;
