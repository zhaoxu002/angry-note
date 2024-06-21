import { useState } from "react";
import { useReachBottom, usePullDownRefresh, useLoad } from "@tarojs/taro";
import { PageResponse } from "@/types/response";

type FetchData<T> = (page: number) => Promise<PageResponse<T[]>>;

export default function usePagination<T>(fetchData: FetchData<T>) {
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [data, setData] = useState<T[]>([]);
  const [status, setStatus] = useState<"more" | "noMore" | "loading">("more");
  const pageSize = 20;

  const fetch = (page: number) => {
    if (loading) return;
    setLoading(true);
    setStatus("loading");

    fetchData(page)
      .then((res) => {
        const { data, total } = res?.data;

        setData((prev) => [...prev, ...data]);
        setTotal(total);

        if (data.length < pageSize) {
          setStatus("noMore");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const refresh = () => {
    setCurrent(1);
    setTotal(0);
    setData([]);
    fetch(1);
  };

  useLoad(() => {
    fetch(current);
  });

  useReachBottom(() => {
    if (total > current * pageSize) {
      // load more
      console.log("load more");
      fetch(current + 1);
      setCurrent((current) => current + 1);
    }
  });

  usePullDownRefresh(() => {
    refresh();
  });

  return {
    data,
    loading,
    current,
    total,
    status,
    refresh,
  };
}
