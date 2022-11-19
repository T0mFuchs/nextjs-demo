import React, { Suspense } from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { ArrowDownSVG } from "..";
import { dateFromObjectId } from "../../lib/dateFromObjectId";

import styles from "../../styles/styles.module.css";

const Background = dynamic(() => import("../page/Background"), {
  suspense: true,
});

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export function ReadPost({ title }: { title: string }) {
  const { data } = useSWR(`/api/post/${title}`, fetcher);
  if (!data)
    return (
      <Suspense>
        <Background delay={150} />
      </Suspense>
    );
  return (
    <>
      <div style={{ padding: "1rem 0" }}>
        <ArrowDownSVG />
      </div>
      <div className={styles.Card} style={{ maxWidth: "60vw" }}>
        <div style={{ fontSize: "1.6rem", fontWeight: 100 }}>{data.title}</div>
        <p>{data.body}</p>
        <div style={{ fontSize: "0.6rem" }}>
          {dateFromObjectId(data.id).toLocaleDateString()}
        </div>
      </div>
    </>
  );
}
