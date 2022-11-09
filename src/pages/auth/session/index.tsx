import dynamic from "next/dynamic";
import Head from "next/head";
import { Suspense } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import styles from "../../../styles/styles.module.css";

const CreatePost = dynamic(() => import("../../../components/post/CreatePost"));
const SignInNotification = dynamic(
  () => import("../../../components/SignInNotification")
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
        <title>nextauth</title>
      </Head>
      <h2
        style={{ paddingTop: "1rem", paddingBottom: "2rem" }}
        className={styles.H2}
      >
        /auth/session
      </h2>
      <div>
        {session ? (
          <>
            <Suspense fallback={<></>}>
              <SignInNotification />
            </Suspense>
            <p style={{ paddingBottom: "2rem" }}>
              <div className={styles.Card} style={{ width: "9rem" }}>
                Hello, {session.user?.name}
              </div>
            </p>
            <>
              <CreatePost />
            </>
            <div style={{ padding: "1.5rem" }} />
            <>
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
          </>
        ) : (
          <>
            <p style={{ paddingBottom: "2rem" }}>
              you are currently not logged in
            </p>
            <>
              <button
                onClick={() => {
                  handleSignIn();
                }}
                className={styles.Button}
              >
                sign in
              </button>
              <div style={{ padding: ".4rem" }} />
            </>
          </>
        )}
      </div>
    </>
  );
}
