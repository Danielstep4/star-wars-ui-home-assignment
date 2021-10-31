import { useCallback } from "react";

/** useLocalStorage is a custom hook to help with local sotrage functionality and types
 */
export function useLocalStorage<T>(
  key: string
): [() => T | null, (data: T) => void] {
  if (!key) throw new Error("Key has to be string and can't be falsy");
  const getter = useCallback(() => {
    const cachedData = localStorage.getItem(key);
    if (cachedData) {
      return JSON.parse(cachedData) as T;
    }
    return null;
  }, [key]);
  const setter = useCallback(
    (data: T) => localStorage.setItem(key, JSON.stringify(data)),
    [key]
  );
  return [getter, setter];
}
