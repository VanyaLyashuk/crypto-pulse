import { useCallback, useState } from "react";
import { IHttpRequestOptions } from "../models";

export const useHttp = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const request = useCallback(
    async <T,>(
      url: string,
      {
        method = "GET",
        body = null,
        headers = { accept: "application/json" },
      }: IHttpRequestOptions
    ): Promise<T> => {
      setLoading(true);

      try {
        const response = await fetch(url, { method, body, headers });

        if (!response.ok) {
          throw new Error(`Could not fetch ${url}, status: ${response.status}`);
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
