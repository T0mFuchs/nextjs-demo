import Head from "next/head";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { Observe } from "../../lib/IntersectionObserver";
import { ArrowDownSVG, Spinner } from "../../components";

import styles from "../../styles/styles.module.css";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function Page() {
  const { data } = useSWR("/api/posts", fetcher);

  //  ?  ::  this breaks websocket for hmr for some reason
  React.useEffect(() => {
    Observe();
  });

  if (!data) return <Spinner />;
  return (
    <>
      <Head>
        <title>posts</title>
      </Head>
      <ArrowDownSVG />
      <div style={{ padding: "0 2em 1em 0" }} />
      {data.map((post: any) => (
        <div key={post.id} className="hidden">
          <div
            className={styles.Card}
            style={{ width: "67%", padding: "1rem" }}
          >
            <div>
              <Link
                className={styles.Link}
                style={{
                  fontSize: "1.7em",
                  fontWeight: 500,
                }}
                href={{
                  pathname: "/post/[title]",
                  query: { title: post.title },
                }}
              >
                {post.title}
              </Link>
            </div>
            <p>{post.body}</p>
            <div style={{ fontSize: "0.6em" }}>_id: {post.id}</div>
          </div>
          <div style={{ padding: "2em" }}></div>
        </div>
      ))}
    </>
  );
}
