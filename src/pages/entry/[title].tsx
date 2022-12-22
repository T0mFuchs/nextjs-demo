import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import useSWR from "swr";
import Head from "next/head";
import { dateFromObjectId } from "lib/dateFromObjectId";
import Fallback from "ui/entry/fallback";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { title }: any = context.params;
  return { props: { title } };
};

// todo :: fix page initial loading fallback background is off

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page({ title }: { title: string }) {
  const { data: entry, error } = useSWR(`/api/entry/${title}`, fetcher);
  if (error === "loading") return <></>;
  return (
    <>
      <Head>
        <title>entry/{title}</title>
      </Head>
      <>
        {entry ? (
          <div style={{ padding: "1em" }}>
            <div className={styles.Card}>
              <h2
                className={styles.H2}
                style={{ fontSize: "2.5em", position: "relative", bottom: 5 }}
                aria-label="entry title"
              >
                {entry.title}
              </h2>
              <p aria-label="entry body" className={``}>
                {entry.body}
              </p>
              <div
                aria-label="entry date"
                style={{
                  fontSize: ".6em",
                  position: "relative",
                  top: 9,
                }}
              >
                {dateFromObjectId(entry._id).getDate()}
                {" / "}
                {dateFromObjectId(entry._id).getMonth() + 1}
                {" / "}
                {dateFromObjectId(entry._id).getFullYear()}
                <span style={{ padding: "0 9px" }}>{"|"}</span>
                {dateFromObjectId(entry._id).getHours()}
                {" : "}
                {dateFromObjectId(entry._id).getMinutes() < 9
                  ? "0" + dateFromObjectId(entry._id).getMinutes()
                  : dateFromObjectId(entry._id).getMinutes()}
                {" : "}
                {dateFromObjectId(entry._id).getSeconds() < 9
                  ? "0" + dateFromObjectId(entry._id).getSeconds()
                  : dateFromObjectId(entry._id).getSeconds()}
              </div>
            </div>
          </div>
        ) : (
          <Fallback />
        )}
        <div aria-hidden style={{ padding: "1em" }} />
      </>
    </>
  );
}
