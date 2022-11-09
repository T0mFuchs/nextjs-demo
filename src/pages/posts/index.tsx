import Head from "next/head";
import Link from "next/link";
import React from "react";
import { ArrowDownSVG, Spinner } from "../../components";

import styles from "../../styles/styles.module.css";

export default function Page() {
  const [data, setData]: any = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/posts/all`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (!data) return <Spinner />;
  return (
    <>
      <Head>
        <title>posts</title>
      </Head>
      <ArrowDownSVG />
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
