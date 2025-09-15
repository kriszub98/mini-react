import { useState, useEffect } from "react";

type UseFetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export function useFetch<T = unknown>(url: string, options?: RequestInit) {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setState({ data: null, loading: true, error: null });

      try {
        const response = await fetch(url, { ...options, signal });

        if (!response.ok) {
          throw new Error(`Błąd: ${response.status} ${response.statusText}`);
        }

        const json = (await response.json()) as T;
        setState({ data: json, loading: false, error: null });
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          // żądanie anulowane – ignorujemy
          return;
        }
        setState({ data: null, loading: false, error: (err as Error).message });
      }
    };

    fetchData();

    // cleanup – anulowanie requestu przy odmontowaniu lub zmianie url
    return () => controller.abort();
  }, [url, options]);

  return state;
}
