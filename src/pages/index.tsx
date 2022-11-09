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
          borderRadius: `50% 50% 50% 50% / 45% 45% 55% 55% `,
          background: `var(--blob)`,
          height: `200vh`,
          width: `150vw`,
          position: `fixed`,
          top: `-25vh`,
          zIndex: -2,
        }}
      />
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
          style={{
            gridRow: "1",
            gridColumn: "1",
            borderRadius: `56% 44% 56% 44% / 55% 49% 51% 45%`,
            width: "9vw",
          }}
        >
          !!
        </div>
        <div
          className={styles.Card}
          style={{
            gridRow: "1",
            gridColumn: "2",
            height: `3vh`,
          }}
        >
          `````````````````````````` ``````````````````````````
          ``````````````````````````
        </div>
        <div
          className={styles.Card}
          style={{ gridRow: "2", gridColumn: "1" }}
        ></div>
        <div
          className={styles.Card}
          style={{ gridRow: "2", gridColumn: "2", height: `1vh` }}
        ></div>
      </div>
    </>
  );
}
