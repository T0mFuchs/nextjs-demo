import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import Separator from "ui/radix-ui/separator";
import CreateEntry from "ui/entry/create";
import Flicker from "ui/animated/flicker";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const Append = dynamic(() => import("ui/radix-ui/dialog/append"), {
  suspense: true,
});

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  if (status === "loading") return <></>;
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
          <div className={css.wrapper}>
            <div style={{ paddingTop: "1em" }}>Hello, {session.user?.name}</div>
            <Separator orientation="horizontal" />
            <CreateEntry />
            <Separator orientation="horizontal" />
            <>
              {open ? (
                <React.Suspense>
                  <Append
                    open={open}
                    onOpenChange={setOpen}
                    width={120}
                    className={css.append}
                  >
                    <button
                      className={styles.Button}
                      onClick={() => {
                        signOut({ redirect: false });
                      }}
                    >
                      yes i want to sign out
                    </button>
                  </Append>
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
                prefetch={false}
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
