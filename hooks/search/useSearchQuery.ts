import { startTransition, useDeferredValue, useState } from "react";

export function useSearchQuery() {
  const [query, setQueryState] = useState("");
  useDeferredValue(query.trim().toLowerCase());

  const setQuery = (text: string) => {
    startTransition(() => {
      setQueryState(text);
    });
  };

  const clearQuery = () => {
    setQueryState("");
  };

  return { clearQuery, query, setQuery };
}
