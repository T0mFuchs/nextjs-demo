import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store", method: "POST" }).then((res) => res.json());

export function useGetAllEntries(route: string) {
  const { data, error } = useSWR(route, fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
