import {useEffect, useState} from 'react';

import {DEBOUNCE_MS} from '@constants/student';

export const useDebouncedValue = <T>(
  value: T,
  delay: number = DEBOUNCE_MS,
): T => {
  const [debouncedValue, setDebouncedValue] =
    useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};