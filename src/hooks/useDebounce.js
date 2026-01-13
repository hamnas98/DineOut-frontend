import { useState, useEffect } from "react";

const useDebounce = (value, deley) => {
  
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {

    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, deley);

    return () => clearTimeout(handler);

  }, [value, deley]);

  return debounceValue;
};

export default useDebounce;
