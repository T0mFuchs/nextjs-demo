import useSWR from "swr";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store", method: "POST" }).then((res) => res.json());

export function useGetUser() {
  const { data, error } = useSWR(`/api/user/with-session`, fetcher);
  return {
    data: data,
    isLoading: !error && !data,
    isError: error,
  };
}
