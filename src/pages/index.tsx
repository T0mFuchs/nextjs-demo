import Head from "next/head";
import styles from "../styles/styles.module.css";

export default function Page() {
  return (
    <>
      <Head>
        <title>index page title</title>
      </Head>
      <h2
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
        className={styles.H2}
      >
        empty home page
      </h2>
      <div
        style={{
          display: "grid",
          gap: "2.5rem",
          margin: "0 auto",
          width: "90%",
        }}
      >
        <div
          className={styles.Card}
          style={{ gridRow: "1", gridColumn: "1" }}
        ></div>
        <div className={styles.Card} style={{ gridRow: "1", gridColumn: "2" }}>
          `````````````````````````` ``````````````````````````
          ``````````````````````````
        </div>
        <div
          className={styles.Card}
          style={{ gridRow: "2", gridColumn: "1" }}
        ></div>
        <div
          className={styles.Card}
          style={{ gridRow: "2", gridColumn: "2" }}
        ></div>
      </div>
    </>
  );
}
