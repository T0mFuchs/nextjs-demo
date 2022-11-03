import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";

import styles from "../../../styles/styles.module.css";

export default function Index() {
  const { data: session } = useSession();
  const { push, asPath } = useRouter();

  const handleSignIn = () => {
    push(`/auth/signin?callbackUrl=${asPath}`);
  };
  return (
    <>
      <h2 style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>/account</h2>
      <div>
        {session ? (
          <>
            <p style={{ paddingBottom: "2rem" }}>Hello, {session.user?.name}</p>
            <p className={styles.Card} style={{ width: "70%" }}>
              ``
            </p>
            <div style={{ padding: "2rem" }}></div>
            <>
              <button
                onClick={() => {
                  signOut({ redirect: false });
                }}
                className={styles.Button}
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
