import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { Spinner } from "../../components";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.params;
  const baseUrl = process.env.BASE_URL;
  return { props: { baseUrl, id } };
};

export default function Index({
  baseUrl,
  id,
}: {
  baseUrl: string;
  id: string;
}) {
  const [data, setData]: any = React.useState(null);
  React.useEffect(() => {
    fetch(`${baseUrl}/api/post/${id}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [baseUrl, id]);
  if (!data) return <Spinner />;
  return (
    <>
      <div style={{ padding: ".5rem", paddingTop: "2rem" }}>
        <Link
          style={{ textDecoration: "none" }}
          href={{ pathname: `/api/post/[id]`, query: { id: data.id } }}
        >
          <div
            style={{
              fontSize: "1.25rem",
              color: "#377dff",
              fontWeight: 900,
              paddingBottom: "2rem",
            }}
          >
            /api/post/[id]
          </div>
        </Link>
      </div>
      <div style={{ margin: "0 auto", width: "75%" }}>
        <h3>{data.title}</h3>
        <p style={{ fontWeight: 100, fontSize: "1.1rem" }}>{data.body}</p>
        <span style={{ fontSize: "0.6rem" }}>{data.id}</span>
      </div>
    </>
  );
}
