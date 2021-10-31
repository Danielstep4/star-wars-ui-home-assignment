/** useSessionStorage is a custom hook to help with session sotrage functionality and types
 */
export function useSessionStorage<T>(
  key: string
): [() => T | null, (data: T) => void] {
  if (!key) throw new Error("Key has to be string and can't be falsy");
  const getter = () => {
    const cachedData = sessionStorage.getItem(key);
    if (cachedData) {
      return JSON.parse(cachedData) as T;
    }
    return null;
  };
  const setter = (data: T) => sessionStorage.setItem(key, JSON.stringify(data));
  return [getter, setter];
}
