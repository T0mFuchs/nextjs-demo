import React from "react";
import { ArrowDownSVG, Spinner } from ".";

import styles from "../styles/styles.module.css";

export function ReadPost({
  baseUrl,
  title,
}: {
  baseUrl: string;
  title: string;
}) {
  const [data, setData]: any = React.useState(null);
  React.useEffect(() => {
    fetch(`${baseUrl}/api/post/${title}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [baseUrl, title]);
  if (!data) return <Spinner />;
  return (
    <>
      <div style={{ padding: "1rem 0" }}>
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
