import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useGetUser } from "hooks/user/getUser";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CheckSVG, CreateSVG, CrossSVG, UpdateSVG } from "ui";
import Separator from "ui/radix-ui/separator";
import Fallback from "ui/entry/fallback";

import type { EntryType } from "types/Entry";
import type { PanInfo } from "framer-motion";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const Flicker = dynamic(() => import("ui/animated/flicker"), {
  suspense: true,
});

const CreateEntry = dynamic(() => import("ui/entry/create"), {
  suspense: true,
});

const UpdateEntry = dynamic(() => import("ui/entry/update"), {
  suspense: true,
});

const DeleteEntry = dynamic(() => import("ui/entry/delete"), {
  suspense: true,
});

const Settings = dynamic(() => import("ui/page/settings"), {
  suspense: true,
});

const Sort = dynamic(() => import("ui/entry/sort"), {
  suspense: true,
});

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});

const ContextMenuRoot = dynamic(() => import("ui/radix-ui/context-menu/root"), {
  suspense: true,
});

const ContextMenuTrigger = dynamic(
  () => import("ui/radix-ui/context-menu/trigger"),
  {
    suspense: true,
  }
);

const ContextMenuPortal = dynamic(
  () => import("ui/radix-ui/context-menu/portal"),
  {
    suspense: true,
  }
);

const ContextMenuContent = dynamic(
  () => import("ui/radix-ui/context-menu/content"),
  {
    suspense: true,
  }
);

const ContextMenuItem = dynamic(() => import("ui/radix-ui/context-menu/item"), {
  suspense: true,
});

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page() {
  const [sortKey, setSortKey] = React.useState("_id");
  const [sortValue, setSortValue] = React.useState("-1");
  const [sortPlaceholder, setSortPlaceholder] = React.useState("descending");
  const [openSort, setOpenSort] = React.useState(false);

  //? set current entry
  const [update, setUpdate]: any = React.useState(null);
  const [visibility, setVisibility] = React.useState(false);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);

  const [openAvatarPopover, setOpenAvatarPopover] = React.useState(false);

  const { push } = useRouter();

  const { data: user, isLoading } = useGetUser();
  const {
    data: entries,
    mutate,
    isValidating,
  } = useSWR(
    user ? `/api/${user._id}/entries/${sortKey}/${sortValue}` : null,
    fetcher
  );

  const refresh = () =>
    mutate({ ...entries }, { revalidate: true, optimisticData: true });

  if (isLoading) return <></>;
  if (user && !user.emailVerified) {
    setTimeout(() => push("/auth/new-user"), 1500);
    return (
      <React.Suspense>
        <MotionDiv
          className={css.ToastBar}
          style={{ position: "fixed", top: "45%" }}
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ duration: 1.5 }}
        />
      </React.Suspense>
    );
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [wait, setWait] = React.useState(true);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  React.useEffect(() => {
    setTimeout(() => {
      setWait(false);
    }, 1000);
  });

  return (
    <>
      <Head>
        {user ? (
          <title>Hello, {user.name}</title>
        ) : (
          <title>not signed in</title>
        )}
      </Head>
      <>
        {user ? (
          <>
            <div className={css.wrapper}>
              <div style={{ paddingTop: "1em" }}>Hello, {user.name}</div>
              <div className={css.topright}>
                <React.Suspense>
                  <Settings
                    open={openAvatarPopover}
                    onOpenChange={setOpenAvatarPopover}
                    user={user}
                  />
                </React.Suspense>
              </div>
              <Separator orientation="horizontal" />
              <button
                className={styles.Button}
                style={{ padding: "0 6px" }}
                onClick={() => {
                  setOpenCreate(true);
                }}
              >
                <div style={{ position: "relative", top: 4, fontSize: 40 }}>
                  <CreateSVG />
                </div>
              </button>
            </div>
            <div style={{ maxWidth: 350, margin: "auto", paddingTop: 15 }}>
              <Separator
                orientation="horizontal"
                style={{ margin: "1em auto" }}
              />
              {!isValidating && entries ? (
                <React.Suspense>
                  <CreateEntry
                    open={openCreate}
                    onOpenChange={setOpenCreate}
                    visibility={visibility}
                    setVisibility={setVisibility}
                    userId={user._id}
                    allEntries={entries}
                    callback={refresh}
                  />

                  <DeleteEntry
                    open={openDelete}
                    onOpenChange={setOpenDelete}
                    entry={update}
                    userId={user._id}
                    callback={refresh}
                  />

                  <UpdateEntry
                    open={openUpdate}
                    onOpenChange={setOpenUpdate}
                    visibility={visibility}
                    setVisibility={setVisibility}
                    userId={user._id}
                    entry={update}
                    allEntries={entries}
                    callback={refresh}
                  />

                  <Sort
                    open={openSort}
                    onOpenChange={setOpenSort}
                    sortPlaceholder={sortPlaceholder}
                    setSortPlaceholder={setSortPlaceholder}
                    setSortKey={setSortKey}
                    setSortValue={setSortValue}
                  />

                  {entries.map((entry: EntryType) => (
                    <div key={entry.title} style={{ padding: "1em" }}>
                      <React.Suspense>
                        <ContextMenuRoot>
                          <ContextMenuTrigger>
                            {!isValidating && !wait ? (
                              <>
                                <div
                                  aria-label="drag action icon delete"
                                  style={{
                                    position: "absolute",
                                    fontSize: "4em",
                                    paddingTop: 14,
                                    paddingLeft: 200,
                                    zIndex: -1,
                                  }}
                                >
                                  <CrossSVG />
                                </div>
                                <div
                                  aria-label="drag action icon edit"
                                  style={{
                                    position: "absolute",
                                    fontSize: "4.5em",
                                    paddingTop: 19,
                                    paddingLeft: 50,
                                    zIndex: -1,
                                  }}
                                >
                                  <UpdateSVG />
                                </div>
                              </>
                            ) : null}
                            <MotionDiv
                              className={styles.Card}
                              drag="x"
                              dragConstraints={{
                                left: -100,
                                right: 100,
                              }}
                              dragElastic={0.1}
                              dragSnapToOrigin
                              onDragEnd={(event: any, info: PanInfo) => {
                                if (info.offset.x > 200) {
                                  setUpdate(entry);
                                  setOpenUpdate(true);
                                }
                                if (info.offset.x < -200) {
                                  setUpdate(entry);
                                  setOpenDelete(true);
                                }
                              }}
                            >
                              <div
                                className={styles.H2}
                                style={{
                                  fontSize: "2em",
                                  position: "relative",
                                  bottom: 7,
                                }}
                                aria-label="entry title"
                              >
                                <Link
                                  prefetch={false}
                                  href={`/${user._id}/entry/${entry.title}`}
                                  className={styles.Link}
                                  title={entry.title}
                                >
                                  {entry.title}
                                </Link>
                              </div>
                              <p
                                aria-label="entry body"
                                className={css.limiter}
                              >
                                {entry.body}
                              </p>
                              <div
                                aria-label="entry date"
                                style={{
                                  fontSize: ".6em",
                                  position: "relative",
                                  top: 9,
                                }}
                              >
                                {dateFromObjectId(entry._id).getDate()}
                                {" / "}
                                {dateFromObjectId(entry._id).getMonth() + 1}
                                {" / "}
                                {dateFromObjectId(entry._id).getFullYear()}
                                <span style={{ padding: "0 9px" }}>{"|"}</span>
                                {dateFromObjectId(entry._id).getHours()}
                                {" : "}
                                {dateFromObjectId(entry._id).getMinutes() < 9
                                  ? "0" +
                                    dateFromObjectId(entry._id).getMinutes()
                                  : dateFromObjectId(entry._id).getMinutes()}
                                {" : "}
                                {dateFromObjectId(entry._id).getSeconds() < 9
                                  ? "0" +
                                    dateFromObjectId(entry._id).getSeconds()
                                  : dateFromObjectId(entry._id).getSeconds()}
                              </div>
                            </MotionDiv>
                          </ContextMenuTrigger>
                          <ContextMenuPortal>
                            <ContextMenuContent className={css.ctxmContent}>
                              <ContextMenuItem
                                className={css.ctxmItem}
                                onClick={() => {
                                  setUpdate(entry);
                                  setOpenUpdate(true);
                                }}
                              >
                                <div
                                  style={{
                                    paddingRight: 10,
                                    position: "relative",
                                    top: 2,
                                    left: 2,
                                  }}
                                >
                                  <UpdateSVG />
                                </div>
                                edit entry
                              </ContextMenuItem>
                              <Separator
                                orientation="horizontal"
                                style={{ margin: "5px 0" }}
                              />
                              <ContextMenuItem
                                className={css.ctxmItem}
                                onClick={() => {
                                  setUpdate(entry);
                                  setOpenDelete(true);
                                }}
                              >
                                <div
                                  style={{
                                    paddingRight: 10,
                                    position: "relative",
                                    top: -0.5,
                                    left: -1,
                                  }}
                                >
                                  <CrossSVG />
                                </div>
                                delete entry
                              </ContextMenuItem>
                            </ContextMenuContent>
                          </ContextMenuPortal>
                        </ContextMenuRoot>
                      </React.Suspense>
                    </div>
                  ))}
                </React.Suspense>
              ) : (
                <>
                  <div style={{ paddingTop: 15, paddingBottom: 10 }}>
                    <button className={css.sortoption} disabled>
                      descending
                    </button>
                  </div>
                  <Fallback />
                  <Fallback />
                  <Fallback />
                  <Fallback />
                  <Fallback />
                  <Fallback />
                </>
              )}
            </div>
            <div aria-hidden style={{ padding: "1em" }} />
          </>
        ) : (
          <React.Suspense>
            <Flicker className={css.center} text="sign in for more">
              <Link
                prefetch={false}
                href="/auth/signin"
                className={styles.Link}
                style={{ textDecoration: "none" }}
                title="sign in"
              >
                sign in for more
              </Link>
            </Flicker>
          </React.Suspense>
        )}
      </>
    </>
  );
}
