import { useState, useEffect } from "react";

type UseApiReturn<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
};

const useApi = <T>(
  serviceFunction: () => Promise<T>,
  shouldFetch: boolean = true
): UseApiReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!shouldFetch) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await serviceFunction();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred"));
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [shouldFetch]);

  return { data, loading, error };
};

export default useApi;
