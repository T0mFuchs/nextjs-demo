import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { signOut, useSession } from "next-auth/react";
import useSWR from "swr";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { Observe } from "lib/observer-toggle-visibility";
import * as Avatar from "@radix-ui/react-avatar";
import Separator from "ui/radix-ui/separator";
import CreateEntry from "ui/entry/create";
import Flicker from "ui/animated/flicker";
import type { EntryType } from "types/Entry";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const Dialog = dynamic(() => import("ui/radix-ui/dialog"), { suspense: true });

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page() {
  const [openSort, setOpenSort] = React.useState(false);
  const [sort, setSort] = React.useState("-1");
  const [placeholder, setPlaceholder] = React.useState("descending");
  const [open, setOpen] = React.useState(false);
  const { data: session, status } = useSession();
  const { data } = useSWR(`/api/user/entries/${sort}`, fetcher);

  React.useEffect(() => {
    Observe();
  });

  if (status === "loading") return <></>;
  if (!data) return <></>;
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
          <>
            <div className={css.wrapper}>
              <div style={{ paddingTop: "1em" }}>
                Hello, {session.user?.name}
              </div>
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
            </div>
            {open ? (
              <React.Suspense>
                <Dialog open={open} onOpenChange={setOpen}>
                  <button
                    className={styles.Button}
                    onClick={() => signOut({ redirect: false })}
                  >
                    confirm sign out
                  </button>
                </Dialog>
              </React.Suspense>
            ) : null}
            {data ? (
              <div
                id="container"
                style={{ maxWidth: 350, margin: "auto", paddingTop: 15 }}
              >
                <Separator
                  orientation="horizontal"
                  style={{ width: 350, margin: "1em auto" }}
                />
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    paddingTop: 15,
                    paddingBottom: 10,
                  }}
                >
                  {openSort ? (
                    <div onMouseLeave={() => setOpenSort(false)}>
                      <button
                        className={css.sortoption}
                        onClick={() => {
                          setSort("-1");
                          setPlaceholder("descending");
                          setOpenSort(false);
                        }}
                      >
                        descending
                      </button>
                      <button
                        className={css.sortoption}
                        onClick={() => {
                          setSort("1");
                          setPlaceholder("ascending");
                          setOpenSort(false);
                        }}
                      >
                        ascending
                      </button>
                    </div>
                  ) : (
                    <button
                      className={css.opensort}
                      onClick={() => setOpenSort(true)}
                      tabIndex={0}
                    >
                      {placeholder}
                    </button>
                  )}
                </div>
                {data.map((entry: EntryType) => (
                  <div key={entry.title} style={{ padding: "1em" }}>
                    {/* `hidden` for lib/observer-toggle-visibility */}
                    <div className={`${styles.Card} hidden`}>
                      <div className={styles.H2} style={{ fontSize: "2em" }}>
                        <Link
                          prefetch={false}
                          href={`/user/entry/${entry.title}`}
                          className={styles.Link}
                        >
                          {entry.title}
                        </Link>
                      </div>
                      <p className={css.limiter}>{entry.body}</p>
                      <div style={{ fontSize: ".6em" }}>
                        {dateFromObjectId(entry._id).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <Separator orientation="horizontal" />
                <p>you do not have any private entries yet</p>
                <Separator orientation="horizontal" />
              </div>
            )}
            <div aria-hidden style={{ padding: "1em" }} />
          </>
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
