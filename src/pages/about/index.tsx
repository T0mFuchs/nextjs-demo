import Head from "next/head";
import styles from "../../styles/styles.module.css";

export default function Page() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h2 style={{ padding: `1rem 0` }} className={styles.H2}>
        /about
      </h2>
      <div
        className={styles.Blob}
        style={{
          borderRadius: `17% 83% 84% 16% / 55% 49% 51% 45%`,
          background: `var(--blob)`,
          height: `100vh`,
          width: `6vh`,
          position: `fixed`,
          top: `0`,
          left: `-.5em`,
          zIndex: -2,
        }}
      />
      <div style={{ paddingTop: "2rem" }}>
        <ul
          className={styles.Card}
          style={{ lineHeight: "5rem", width: "75%", paddingLeft: "3rem" }}
        >
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
