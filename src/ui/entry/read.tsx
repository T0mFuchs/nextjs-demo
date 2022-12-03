import React from "react";
import useSWR from "swr";
import { dateFromObjectId } from "lib/dateFromObjectId";
import Error from "./error";
import Fallback from "./fallback";

import styles from "styles/main.module.scss";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function ReadEntry({ title }: { title: string }) {
  const { data, error } = useSWR(`/api/entry/${title}`, fetcher);
  if (error) return <Error />;
  if (!data) return <Fallback maxWidth="60vw" />;
  return (
    <>
      <div style={{ padding: "2em 0" }} />
      <div className={styles.Card} style={{ maxWidth: "60vw" }}>
        <div style={{ fontSize: "1.6em", fontWeight: 100 }}>{data.title}</div>
        <p>{data.body}</p>
        <div style={{ fontSize: ".6em" }}>
          {dateFromObjectId(data.id).toLocaleDateString()}
        </div>
      </div>
    </>
  );
}