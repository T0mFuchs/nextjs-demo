import { GetServerSideProps } from "next";
import Link from "next/link";
import React from "react";
import { Spinner } from "../../components";

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
        {data.map((post: any) => (
          <div
            key={post.id}
            style={{
              paddingBottom: "0.25rem",
              borderRadius: "0.5rem",
              margin: "0 auto",
              width: "75%",
              left: "12.5%",
            }}
          >
            <h3>
              <Link
                style={{ color: "#377dff" }}
                href={{ pathname: `/post/[id]`, query: { id: post.id } }}
              >
                {post.title}
              </Link>
            </h3>
            <p
              style={{
                borderRadius: "0.33rem",
                position: "relative",
                maxWidth: "75%",
                left: "12.5%",
              }}
            >
              {post.body}
            </p>
            <span style={{ color: "grey", fontSize: "0.6rem" }}>
              _id: {post.id}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
