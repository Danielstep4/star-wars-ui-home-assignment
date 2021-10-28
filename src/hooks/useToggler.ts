import { useState } from "react";

/** useToggler is a custom hook to help with toggle repeated functionality
 * @param {boolean} initialValue is flase
 * @returns {[boolean, () => void]} [flag, toggler] as a tuple
 */
export const useToggler = (initialValue = false): [boolean, () => void] => {
  const [flag, setFlag] = useState(initialValue);
  const toggler = () => setFlag((prev) => !prev);
  return [flag, toggler];
};
