import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import Separator from "components/radix-ui/separator";
import CreateEntry from "components/entry/create";
import Flicker from "components/animated/Flicker";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const Dialog = dynamic(() => import("components/radix-ui/dialog"), {
  suspense: true,
});

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
        {session ? (
          <div style={{ maxWidth: 150, margin: "0 auto" }}>
            <div style={{ paddingTop: "1em" }}>Hello, {session.user?.name}</div>
            <React.Suspense>
              <Separator orientation="horizontal" />
              <CreateEntry />
              <Separator orientation="horizontal" />
            </React.Suspense>
            <>
              {open ? (
                <React.Suspense>
                  <Dialog
                    open={open}
                    onOpenChange={setOpen}
                    width={120}
                    style={{ maxWidth: 120, margin: "0 auto" }}
                  >
                    <button
                      className={styles.Button}
                      onClick={() => {
                        signOut({ redirect: false });
                      }}
                    >
                      yes i want to sign out
                    </button>
                  </Dialog>
                </React.Suspense>
              ) : (
                <button
                  className={styles.Button}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  sign out
                </button>
              )}
            </>
          </div>
        ) : (
          <>
            <Flicker className={css.center} text="sign in for more">
              <Link
                href="/auth/signin"
                className={styles.Link}
                style={{ textDecoration: "none" }}
              >
                sign in for more
              </Link>
            </Flicker>
          </>
        )}
      </>
    </>
  );
}
