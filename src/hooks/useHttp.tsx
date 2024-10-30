import { useCallback, useState } from "react";

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T,>(
      endpoint: string,
      params: string
    ): Promise<T> => {
      setLoading(true);

      try {
        const response = await fetch("/.netlify/functions/fetchCoinData", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ endpoint, params }),
        });

        if (!response.ok) {
          setError("Error: Could not fetch data from the server");
          throw new Error(`Status: ${response.status}`);
        }

        const data: T = await response.json();
        setLoading(false);
        return data;
      } catch (e: any) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );

  const clearError = useCallback(() => setError(null), []);

  return { loading, request, error, clearError };
};
