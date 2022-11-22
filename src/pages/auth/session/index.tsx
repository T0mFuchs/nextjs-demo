import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CreatePost from "../../../components/post/CreatePost";

import styles from "../../../styles/styles.module.css";
import css from "./session.module.css";

const SignInNotification = dynamic(
  () => import("../../../components/SignInNotification"),
  { suspense: true }
);

export default function Page() {
  const { data: session } = useSession();
  const { push, asPath } = useRouter();
  const handleSignIn = () => {
    push(`/auth/signin?callbackUrl=${asPath}`);
  };
  return (
    <>
      <Head>
        {session ? (
          <title>Hello, {session.user?.name}</title>
        ) : (
          <title>not signed in</title>
        )}
      </Head>
      <>
        <h2 style={{ padding: `1em 0` }} className={styles.H2}>
          /auth/session
        </h2>
        <div>
          {session ? (
            <>
              <Suspense fallback={<></>}>
                <SignInNotification />
              </Suspense>
              <div
                className={`${styles.Blob} ${css.blob}`}
              />
              <div style={{ padding: "3em 0 1em" }}>
                <div className={styles.Card} style={{ width: "9em" }}>
                  Hello, {session.user?.name}
                </div>
              </div>
              <div style={{ padding: "1em 0 0 0" }}>
                <CreatePost />
              </div>
              <div style={{ padding: "1em" }} />
              <button
                onClick={() => {
                  signOut({ redirect: false });
                }}
                className={styles.Button}
                style={{}}
              >
                sign out
              </button>
            </>
          ) : (
            <>
              <p style={{ paddingBottom: "2em" }} className={styles.fadeIn}>
                you are currently not logged in
              </p>
              <>
                <button
                  onClick={() => {
                    handleSignIn();
                  }}
                  className={`${styles.Button} ${styles.fadeIn}`}
                >
                  sign in
                </button>
                <div style={{ padding: ".4em" }} />
              </>
            </>
          )}
        </div>
      </>
    </>
  );
}
