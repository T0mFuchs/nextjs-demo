import Head from "next/head";
import Separator from "components/radix-ui/Separator";
import styles from "styles/main.module.scss";

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
          <Separator style={{ maxWidth: 380, margin: "0 auto" }} />
        </div>
        <div>
          <div
            className={styles.Card}
            style={{
              fontSize: "1.1em",
              fontWeight: 900,
              lineHeight: "2em",
              width: "80%",
            }}
          >
            <div className={styles.border}>
              <p>next.js</p>
              <p>hosted with vercel on aws servers</p>
              <p>cold starts 1s max</p>
              <p>google lighthouse score 100</p>
            </div>
          </div>
          <div style={{ padding: "1em 0" }} />
        </div>
      </>
    </>
  );
}
