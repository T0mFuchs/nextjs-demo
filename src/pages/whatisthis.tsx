/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import styles from "../styles/styles.module.css";

export default function Page() {
  return (
    <>
      <Head>
        <title>?</title>
      </Head>
      <>
        <h2 style={{ padding: `1rem 0 ` }} className={styles.H2}>
          ?
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
        <div>
          <div
            className={styles.Card}
            style={{
              fontSize: "1.1rem",
              fontWeight: "900",
              lineHeight: "2rem",
              width: "80%",
            }}
          >
            <p>demo crud app with 0auth</p>
            <p>hosted with vercel on aws lambda,</p>
            <p>cold starts are about 250-750 ms</p>
            <p>google lighthouse score 100</p>
          </div>
          <div style={{ padding: "1rem 0" }} />
          <div
            className={styles.Card}
            style={{
              fontSize: "1.1rem",
              fontWeight: "900",
              lineHeight: "2rem",
              width: "75%",
            }}
          >
            <ul style={{ textAlign: "left", listStylePosition: "outside" }}>
              <li>
                <a style={{ color: "var(--blob)" }} href="https://nextjs.org">
                  Next.js
                </a>
                <i>
                  {" "}
                  - React Framework with ~ 4 million weekly downloads</i>
              </li>
              <li>
                <a
                  style={{ color: "var(--blob)" }}
                  href="https://next-auth.js.org/"
                >
                  NextAuth.js
                </a>
                <i>
                  {" "}
                  - Authentication for Next.js with ~ 250.000 weekly downloads
                </i>
              </li>
              <li>
                <a style={{ color: "var(--blob)" }} href="https://mikro-orm.io">
                  Mikro-ORM
                </a>
                <i>
                  {" "}
                  - ORM for TypeScript with ~ 125.000 weekly downloads</i>
              </li>
            </ul>
          </div>
          <div style={{ padding: "1rem 0" }} />
        </div>
      </>
    </>
  );
}
