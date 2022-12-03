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
        <h2 className={styles.H2}>?</h2>
        <Separator className={css.sep} />
        <div style={{ paddingBottom: "1em" }} />
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
