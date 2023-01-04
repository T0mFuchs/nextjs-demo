import useSWR from "swr";
import type { Fetcher } from "swr";
import type { EntryType } from "types/Entry";

const fetcher: Fetcher<EntryType[], string> = (url: string) =>
  fetch(url, { cache: "no-store", method: "POST" }).then((res) => res.json());

export function useGetAllEntries(route: string) {
  const { data, error } = useSWR(route, fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
