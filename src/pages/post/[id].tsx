import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Link from "next/link";
import React from "react";
import { ArrowDownSVG, Spinner } from "../../components";

import styles from "../../styles/styles.module.css";

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
          style={{
            textDecoration: "none",
            fontSize: "1.25rem",
            color: "#377dff",
            fontWeight: 900,
          }}
          href={{ pathname: `/api/post/[id]`, query: { id: data.id } }}
        >
          /api/post/[id]
        </Link>
      </div>
      <div style={{ padding: "1rem" }}>
        <ArrowDownSVG />
      </div>
      <div className={styles.Card} style={{ width: "67%" }}>
        <div style={{ fontSize: "1.6rem", fontWeight: 100 }}>{data.title}</div>
        <p>{data.body}</p>
        <div style={{ color: "var(--grey)", fontSize: "0.6rem" }}>
          {data.id}
        </div>
      </div>
    </>
  );
}
