import Head from "next/head";
import styles from "../styles/styles.module.css";

export default function Page() {
  return (
    <>
      <Head>
        <title>?</title>
      </Head>
      <>
        <h2 style={{ padding: `1em 0` }} className={styles.H2}>
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
            rotate: `180deg`,
            top: `0`,
            right: `-.5em`,
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
                <a className={styles.Link} href="https://nextjs.org">
                  Next.js
                </a>
                <i>
                  {" "}
                  - React Framework with{" "}
                  <span style={{ whiteSpace: "pre" }}>
                    ~ 4 million weekly downloads
                  </span>
                </i>
              </li>
              <li>
                <a className={styles.Link} href="https://next-auth.js.org/">
                  NextAuth.js
                </a>
                <i>
                  - Authentication for Next.js{" "}
                  <span style={{ whiteSpace: "pre" }}>
                    ~ 250.000 weekly downloads
                  </span>
                </i>
              </li>
              <li>
                <a className={styles.Link} href="https://mikro-orm.io">
                  Mikro-ORM
                </a>
                <i>
                  {" "}
                  - 5kb ORM for TypeScript{" "}
                  <span style={{ whiteSpace: "pre" }}>
                    ~ 125.000 weekly downloads
                  </span>
                </i>
              </li>
              <li>
                <a className={styles.Link} href="https://preactjs.com">
                  Preact
                </a>
                <i>
                  {" "}
                  - 3kB alternative to React with the same modern API{" "}
                  <span style={{ whiteSpace: "pre" }}>
                    ~ 2 million weekly downloads
                  </span>
                </i>
              </li>
            </ul>
          </div>
          <div style={{ padding: "1rem 0" }} />
        </div>
      </>
    </>
  );
}
