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
