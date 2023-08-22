import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { AxiosRequestConfig } from "axios";

interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useData = <T>(
  endpoint: string,
  requestCofig?: AxiosRequestConfig,
  deps?: any[]
) => {
  const [data, setData] = useState<T[]>([]);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(
    () => {
      fetchData();
    },
    deps ? [...deps] : []
  );

  const fetchData = () => {
    setLoading(true);
    apiClient
      .get<FetchResponse<T>>(endpoint, { ...requestCofig })
      .then((res) => {
        setData(res.data.results);
        setCount(res.data.count);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return { data, error, isLoading, count };
};

export default useData;
