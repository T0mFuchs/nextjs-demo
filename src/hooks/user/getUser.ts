import useSWR from "swr";
import type { Fetcher } from "swr";
import type { UserType } from "types/User";

const fetcher: Fetcher<UserType, string> = (url: string) =>
  fetch(url, { cache: "no-store", method: "POST" }).then((res) => res.json());

export function useGetUser() {
  const { data, error, isLoading } = useSWR(`/api/user/with-session`, fetcher);
  return {
    data: data,
    isLoading: isLoading,
    isError: error,
  };
}
