import Head from "next/head";
import Separator from "ui/radix-ui/separator";

import styles from "styles/main.module.scss";
import css from "./about.module.scss";

export default function Page() {
  return (
    <>
      <Head>
        <title>?</title>
      </Head>
      <>
        <h2 style={{ paddingBottom: "1em" }} className={styles.H2}>
          ?
        </h2>
        <div style={{ paddingBottom: "2.5em" }}>
          <Separator
            className={css.sep}
            style={{ maxWidth: 500, margin: "1em auto" }}
          />
        </div>
        <>
          <div className={`${styles.Card} ${css.card}`}>
            <div className={styles.border}>
              <p>next.js</p>
              <p>hosted with vercel on aws servers</p>
              <p>cold starts 1s max</p>
              <p>google lighthouse score 100</p>
            </div>
          </div>
        </>
      </>
    </>
  );
}
