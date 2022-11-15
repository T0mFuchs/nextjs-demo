import Head from "next/head";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { Observe } from "../../utils/IntersectionObserver";
import { ArrowDownSVG, Spinner } from "../../components";

import styles from "../../styles/styles.module.css";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function Page() {
  const { data } = useSWR(`/api/posts`, fetcher);

  //  ?  ::  this breaks websocket for hmr for some reason
  React.useEffect(() => Observe);

  if (!data) return <Spinner />;
  return (
    <>
      <Head>
        <title>posts</title>
      </Head>
      <ArrowDownSVG />
      <div
        className={styles.Blob}
        style={{
          borderRadius: `38% 62% 41% 59% / 56% 37% 63% 44% `,
          background: `var(--blob)`,
          height: `10vh`,
          width: `100vmax`,
          position: `fixed`,
          top: `-5vh`,
          zIndex: -2,
        }}
      />
      <div style={{ padding: "0 2em 1em 0" }} />
      {data.map((post: any) => (
        <div key={post.id} className="hidden">
          <div
            className={styles.Card}
            style={{ width: "67%", padding: "1rem" }}
          >
            <div>
              <Link
                style={{
                  color: "#377dff",
                  fontSize: "1.7em",
                  fontWeight: 500,
                  textDecoration: "none",
                  borderBottom: ".14em solid #377dff",
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
