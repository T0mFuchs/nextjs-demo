import React from "react";
import Head from "next/head";
import Link from "next/link";
import CreateEntry from "../components/entry/create";
import { PopupAppend } from "../components/portals/popup";
import { signOut, useSession } from "next-auth/react";

import styles from "../styles/main.module.css";

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
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
        <h2
          className={styles.H2}
          style={{ padding: `1em 0`, fontSize: `2em` }}
        ></h2>
        {session ? (
          <>
            <div style={{ paddingBottom: "2em" }}>
              Hello, {session.user?.name}
            </div>
            <CreateEntry />
            <div style={{ paddingTop: "2em" }} />
            <div
              onMouseLeave={() => {
                setOpen(false);
              }}
            >
              {open ? (
                <PopupAppend>
                  <button
                    className={styles.Button}
                    onClick={() => {
                      signOut({ redirect: false });
                    }}
                  >
                    yes i want to sign out
                  </button>
                </PopupAppend>
              ) : (
                <button
                  onClick={() => {
                    setOpen(true);
                  }}
                  className={styles.Button}
                >
                  sign out
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <p>sign in for interactivity</p>
            <div className={styles.Button} style={{ width: 100 }}>
              <Link style={{ textDecoration: 0 }} href="/auth/signin">
                sign in
              </Link>
            </div>
          </>
        )}
      </>
    </>
  );
}
