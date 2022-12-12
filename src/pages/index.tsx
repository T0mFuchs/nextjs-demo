import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import * as Avatar from "@radix-ui/react-avatar";
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
            <div className={css.topright}>
              <Avatar.Root className={css.avatarRoot}>
                <Avatar.Image
                  onClick={() => {
                    setOpen(true);
                  }}
                  className={css.avatarImage}
                  style={{ cursor: "pointer" }}
                  src={`${session.user?.image}`}
                  alt={`${session.user?.name}`}
                  title={`logged in as ${session.user?.name}\nclick to sign out`}
                />
                <Avatar.Fallback delayMs={500}>
                  <UserSVG />
                </Avatar.Fallback>
              </Avatar.Root>
            </div>
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
              <div style={{ padding: "1em" }} />
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

function UserSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={css.avatarImage}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 256 256"
    >
      <path
        fill="currentColor"
        d="M235.4 210a124.2 124.2 0 0 0-61.8-53.2a76 76 0 1 0-91.2 0A124.2 124.2 0 0 0 20.6 210a12 12 0 0 0 20.8 12a100 100 0 0 1 173.2 0a12.1 12.1 0 0 0 10.4 6a11.7 11.7 0 0 0 6-1.6a12 12 0 0 0 4.4-16.4ZM76 96a52 52 0 1 1 52 52a52 52 0 0 1-52-52Z"
      />
    </svg>
  );
}
