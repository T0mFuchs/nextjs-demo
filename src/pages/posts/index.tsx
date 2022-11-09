import Head from "next/head";
import Link from "next/link";
import React from "react";
import useSWR from "swr";
import { ArrowDownSVG, Spinner } from "../../components";

import styles from "../../styles/styles.module.css";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function Page() {
  const { data } = useSWR(`/api/posts`, fetcher);
  if (!data) return <Spinner />;
  return (
    <>
      <Head>
        <title>posts</title>
      </Head>
      <ArrowDownSVG />
      <div
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
      <div className="posts" style={{ padding: "1rem" }}>
        {data.map((post: any) => (
          <div key={post.id}>
            <div
              className={styles.Card}
              style={{ width: "70%", padding: "1rem" }}
            >
              <div>
                <Link
                  style={{
                    color: "#377dff",
                    fontSize: "1.7rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    borderBottom: ".2rem solid #377dff",
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
              <div style={{ fontSize: "0.6rem" }}>_id: {post.id}</div>
            </div>
            <div style={{ padding: "2rem" }}></div>
          </div>
        ))}
      </div>
    </>
  );
}
