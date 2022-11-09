import Head from "next/head";
import styles from "../../styles/styles.module.css";

export default function Page() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>
      <h2
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
        className={styles.H2}
      >
        /about
      </h2>
      <div
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
      <div className={styles.Card} style={{ paddingTop: "1rem", width: "70%" }}>
        <ul>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
    </>
  );
}
