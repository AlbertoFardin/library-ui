import * as React from "react";

function useDebouncedState(
  initialValue: string,
  delay: number,
  onChange: (s: string) => void,
): [string, (value: string) => void] {
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const debounceTimer = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setInputValue(initialValue);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
  }, [initialValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      onChange(newValue);
    }, delay);
  };

  return [inputValue, handleInputChange];
}

export default useDebouncedState;
