import Head from "next/head";
import styles from "../styles/styles.module.css";

export default function Page() {
  return (
    <>
      <Head>
        <title>index page title</title>
      </Head>
      <h2 style={{ padding: `1rem 0 1.5rem 0` }} className={styles.H2}>
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
        className={styles.Card}
        style={{
          borderRadius: `56% 44% 56% 44% / 55% 49% 51% 45%`,
          width: "33vw",
          height: "33vw",
          top: "-20vh",
          position: "relative",
          zIndex: -1,
        }}
      ></div>
    </>
  );
}
