import React from "react";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";
import { Observe } from "../../lib/IntersectionObserver";
import { dateFromObjectId } from "../../lib/dateFromObjectId";
import { Fallback } from "../../components";

import styles from "../../styles/main.module.css";
import { Entry } from "../../lib/Entry";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR("/api/entries", fetcher);
  React.useEffect(() => {
    Observe();
  });
  if (error) return <div>failed loading entries</div>;
  if (!data) return <Fallback />;
  return (
    <>
      <Head>
        <title>entries</title>
      </Head>
      {data
        .map((entry: Entry) => (
          <>
            <div key={entry.id} className={`hidden ${styles.Card}`}>
              <div className={styles.H2} style={{ fontSize: "2em" }}>
                <Link href={`entry/${entry.title}`}>{entry.title}</Link>
              </div>
              <p>{entry.body}</p>
              <div style={{ fontSize: ".6em" }}>
                {dateFromObjectId(entry.id).toLocaleDateString()}
              </div>
            </div>
            <div style={{ padding: "1.4em" }} />
          </>
        ))
        .reverse()}
    </>
  );
}
