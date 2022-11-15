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
      <h2 style={{ padding: `1rem 0` }} className={styles.H2}>
        /auth/session
      </h2>
      <div>
        {session ? (
          <>
            <Suspense fallback={<></>}>
              <SignInNotification />
            </Suspense>
            <div
              className={styles.Blob}
              style={{
                borderRadius: `38% 62% 41% 59% / 56% 37% 63% 44% `,
                background: `var(--blob)`,
                height: `100vmax`,
                width: `100vmax`,
                position: `fixed`,
                top: `15vh`,
                zIndex: -2,
              }}
            />
            <div style={{ padding: "3rem 0 1rem" }}>
              <div className={styles.Card} style={{ width: "9rem" }}>
                Hello, {session.user?.name}
              </div>
            </div>
            <div style={{ padding: "1rem 0 0 0" }}>
              <CreatePost />
            </div>
            <div style={{ padding: "1rem" }} />
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
