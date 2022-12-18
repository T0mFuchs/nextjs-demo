import React from "react";
import { useGetOneEntry } from "hooks/entry/getOneEntry";
import { dateFromObjectId } from "lib/dateFromObjectId";
import Error from "../error";
import Fallback from "../fallback";

import styles from "styles/main.module.scss";

export default function ReadEntry({ route }: { route: string }) {
  const { data, isError, isLoading } = useGetOneEntry(route);
  if (isError) return <Error />;
  if (isLoading)
    return (
      <>
        <div style={{ padding: "1.475em" }} />
        <Fallback maxWidth="60vw" />
      </>
    );
  return (
    <>
      <div style={{ padding: "2em 0" }} />
      <div className={styles.Card} style={{ maxWidth: "60vw" }}>
        <div style={{ fontSize: "1.6em", fontWeight: 100 }}>{data.title}</div>
        <p>{data.body}</p>
        <div style={{ fontSize: ".6em" }}>
          {dateFromObjectId(data._id).toLocaleDateString()}
        </div>
      </div>
    </>
  );
}
