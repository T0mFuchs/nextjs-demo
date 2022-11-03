import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { ArrowDownSVG, Spinner } from "../../components";

import styles from "../../styles/styles.module.css";

export const getServerSideProps: GetServerSideProps = async () => {
  const baseUrl = process.env.BASE_URL;
  return { props: { baseUrl } };
};

export default function Index({ baseUrl }: { baseUrl: string }) {
  const [data, setData]: any = React.useState(null);
  React.useEffect(() => {
    fetch(`${baseUrl}/api/posts/all`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [baseUrl]);
  if (!data) return <Spinner />;
  return (
    <>
      <div className="posts" style={{ padding: "1rem" }}>
        <div style={{ padding: "1rem" }}>
          <ArrowDownSVG />
        </div>
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
                    fontSize: "1.6rem",
                    fontWeight: 100,
                  }}
                  href={{ pathname: `/post/[id]`, query: { id: post.id } }}
                >
                  {post.title}
                </Link>
              </div>
              <p>{post.body}</p>
              <div style={{ color: "#676259", fontSize: "0.6rem" }}>
                _id: {post.id}
              </div>
            </div>
            <div style={{ padding: "2rem" }}></div>
          </div>
        ))}
      </div>
    </>
  );
}
