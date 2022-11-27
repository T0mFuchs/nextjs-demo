import React from "react";
import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { PopupAppend } from "../components/portals/popup";
import CreateEntry from "../components/entry/create";
import Flicker from "../components/animated/Flicker";
import Separator from "../components/radix-ui/Separator";

import styles from "../styles/main.module.scss";
import css from "./index.module.scss";

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
          style={{ paddingTop: "1em", fontSize: "2em" }}
        ></h2>
        {session ? (
          <div style={{ maxWidth: 150, margin: "0 auto" }}>
            <div style={{ paddingBottom: "2em" }}>
              Hello, {session.user?.name}
            </div>
            <Separator orientation="horizontal" />
            <CreateEntry />
            <Separator orientation="horizontal" />
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
          </div>
        ) : (
          <>
            <Flicker className={css.center} string="sign in for interactivity">
              <Link href="/auth/signin">
                sign in<div>for interactivity</div>
              </Link>
            </Flicker>
          </>
        )}
      </>
    </>
  );
}
