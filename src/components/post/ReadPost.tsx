import React from "react";
import useSWR from "swr";
import { ArrowDownSVG, Spinner } from "..";

import styles from "../../styles/styles.module.css";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export function ReadPost({ title }: { title: string }) {
  const { data } = useSWR(`/api/post/${title}`, fetcher);
  if (!data) return <Spinner />;
  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <ArrowDownSVG />
      </div>
      <div className={styles.Card} style={{ width: "67%" }}>
        <div style={{ fontSize: "1.6rem", fontWeight: 100 }}>{data.title}</div>
        <p>{data.body}</p>
        <div style={{ color: "var(--grey)", fontSize: "0.6rem" }}>
          {data.id}
        </div>
      </div>
    </>
  );
}
