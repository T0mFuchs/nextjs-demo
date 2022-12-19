import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { signOut } from "next-auth/react";
import { Observe } from "lib/observer-toggle-visibility";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CheckSVG, CreateSVG, CrossSVG, UpdateSVG } from "ui";
import Separator from "ui/radix-ui/separator";
import Fallback from "ui/entry/fallback";

import { useCreateOneEntry } from "hooks/entry/createOneEntry";
import { useUpdateOneEntry } from "hooks/entry/updateOneEntry";
import { useDeleteOneEntry } from "hooks/entry/deleteOneEntry";
import { useGetUser } from "hooks/user/getUser";
import type { EntryType } from "types/Entry";
import type { PanInfo } from "framer-motion";

import styles from "styles/main.module.scss";
import dialog from "ui/entry/dialog.module.scss";
import form from "ui/entry/form.module.scss";
import css from "./index.module.scss";

const Flicker = dynamic(() => import("ui/animated/flicker"), {
  suspense: true,
});

const Dialog = dynamic(() => import("ui/radix-ui/dialog"), { suspense: true });

const AlertDialog = dynamic(() => import("ui/radix-ui/alert-dialog"), {
  suspense: true,
});

const AvatarRoot = dynamic(() => import("ui/radix-ui/avatar/root"), {
  suspense: true,
});

const AvatarImage = dynamic(() => import("ui/radix-ui/avatar/image"), {
  suspense: true,
});

const AccessibleIconRoot = dynamic(
  () => import("ui/radix-ui/accessible-icon/root"),
  { suspense: true }
);

const CheckboxRoot = dynamic(() => import("ui/radix-ui/checkbox/root"), {
  suspense: true,
});

const CheckboxIndicator = dynamic(
  () => import("ui/radix-ui/checkbox/indicator"),
  { suspense: true }
);

const LabelRoot = dynamic(() => import("ui/radix-ui/label/root"), {
  suspense: true,
});

const ToastRoot = dynamic(() => import("ui/radix-ui/toast/root"), {
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

const PopoverRoot = dynamic(() => import("ui/radix-ui/popover/root"), {
  suspense: true,
});

const PopoverTrigger = dynamic(() => import("ui/radix-ui/popover/trigger"), {
  suspense: true,
});

const PopoverPortal = dynamic(() => import("ui/radix-ui/popover/portal"), {
  suspense: true,
});

const PopoverContent = dynamic(() => import("ui/radix-ui/popover/content"), {
  suspense: true,
});

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page() {
  const [sortKey, setSortKey] = React.useState("_id");
  const [sortValue, setSortValue] = React.useState("-1");
  const [sortPlaceholder, setSortPlaceholder] = React.useState("descending");
  const [openSort, setOpenSort] = React.useState(false);

  const [openCreate, setOpenCreate] = React.useState(false);

  const [openDelete, setOpenDelete] = React.useState(false);

  const [openUpdate, setOpenUpdate] = React.useState(false);

  //* set current entry for update&delelte with Object(entry)
  const [update, setUpdate]: any = React.useState();

  //* set entry.visibility
  const [visibility, setVisibility] = React.useState(false);

  const [openToast, setOpenToast] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const [openAvatarPopover, setOpenAvatarPopover] = React.useState(false);

  const { data: user, isLoading } = useGetUser();
  const {
    data: entries,
    mutate,
    isValidating,
  } = useSWR(
    user ? `/api/user/entries/${sortKey}/${sortValue}` : null,
    fetcher
  );

  const handleSubmitCreate = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      // @ts-ignore (HTMLElement.title is reserverd)
      title: form.title.value as string,
      body: form.body.value as string,
      visibility: visibility,
      author: user._id,
    };
    if (entries.find((entry: EntryType) => entry.title === data.title)) {
      window.alert("title already exists");
      return 0;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useCreateOneEntry(data);
    mutate({ ...entries }, { revalidate: true, optimisticData: true });
    setOpenCreate(false);
    setToastMessage(`new entry: ${data.title} created`);
    setOpenToast(true);
  };
  const handleSubmitDelete = async () => {
    const data = {
      _id: update._id,
      author: user._id,
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useDeleteOneEntry(data);
    mutate({ ...entries }, { revalidate: true, optimisticData: false });
    setOpenDelete(false);
  };
  const handleSubmitUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      _id: update._id,
      // @ts-ignore (HTMLElement.title is reserverd)
      title: form.title.value as string,
      body: form.body.value as string,
      visibility: visibility,
      author: user._id,
    };
    if (entries.find((entry: EntryType) => entry.title === data.title)) {
      if (data.title !== update.title) {
        window.alert("title already exists");
        return 0;
      }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useUpdateOneEntry(data);
    mutate({ ...entries }, { revalidate: true, optimisticData: true });
    setOpenUpdate(false);
  };

  React.useEffect(() => Observe());

  if (isLoading) return <></>;
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
        {!isLoading && user.error === undefined ? (
          <React.Suspense>
            <div className={css.wrapper}>
              <div style={{ paddingTop: "1em" }}>Hello, {user.name}</div>
              <div className={css.topright}>
                <React.Suspense>
                  <ToastRoot
                    className={css.ToastRoot}
                    open={openToast}
                    onOpenChange={setOpenToast}
                  >
                    <p>successfully {toastMessage}</p>
                  </ToastRoot>
                </React.Suspense>
                <React.Suspense>
                  <PopoverRoot
                    open={openAvatarPopover}
                    onOpenChange={setOpenAvatarPopover}
                  >
                    <PopoverTrigger asChild>
                      <AvatarRoot className={css.avatarRoot}>
                        <AvatarImage
                          className={css.avatarImage}
                          src={user.image}
                          alt={user.name}
                        />
                      </AvatarRoot>
                    </PopoverTrigger>
                    <PopoverPortal>
                      <PopoverContent className={css.PopoverContent}>
                        <button
                          onClick={() => signOut()}
                          className={css.PopoverSignOut}
                          autoFocus
                        >
                          {" "}
                          sign out
                        </button>
                      </PopoverContent>
                    </PopoverPortal>
                  </PopoverRoot>
                </React.Suspense>
              </div>
              <Separator orientation="horizontal" />
              <button
                className={styles.Button}
                onClick={() => setOpenCreate(true)}
              >
                <div style={{ position: "relative", top: 4, fontSize: 40 }}>
                  <CreateSVG />
                </div>
              </button>
              <React.Suspense>
                <Dialog open={openDelete} onOpenChange={setOpenDelete}>
                  <button
                    className={styles.Button}
                    onClick={() => handleSubmitDelete()}
                    autoFocus
                  >
                    delete
                  </button>
                </Dialog>
                <AlertDialog
                  open={openCreate}
                  onOpenChange={setOpenCreate}
                  className={`${styles.Card} ${dialog.position}`}
                >
                  <legend className={form.legend}>new Entry</legend>
                  <div style={{ padding: ".3em 0" }} />
                  <form className={form.form} onSubmit={handleSubmitCreate}>
                    <LabelRoot htmlFor="title" />
                    <input
                      className={form.input}
                      name="title"
                      type="text"
                      placeholder="...title"
                      required
                      minLength={3}
                      maxLength={20}
                      pattern="^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s=?!/\\]*$" // https://www.debuggex.com/
                      title="remove spaces at start, end & all consecutive spaces"
                      autoFocus
                    />
                    <LabelRoot htmlFor="body" />
                    <textarea
                      rows={6}
                      className={form.textarea}
                      name="body"
                      placeholder="...body"
                      required
                      minLength={5}
                      maxLength={500}
                    />
                    <div className={form.checkboxwrapper}>
                      <CheckboxRoot
                        checked={visibility}
                        className={form.checkboxroot}
                        onClick={() => setVisibility(!visibility)}
                      >
                        <CheckboxIndicator>
                          <CheckSVG />
                        </CheckboxIndicator>
                      </CheckboxRoot>
                      {visibility ? (
                        <LabelRoot className={form.checkboxlabel}>
                          public
                        </LabelRoot>
                      ) : (
                        <LabelRoot className={form.checkboxlabel}>
                          private
                        </LabelRoot>
                      )}
                    </div>
                    <button
                      onClick={() => handleSubmitCreate}
                      className={form.submit}
                      type="submit"
                    >
                      save & close
                      <span style={{ paddingLeft: 4 }}>
                        <AccessibleIconRoot label="save">
                          <span style={{ verticalAlign: -2, paddingRight: 1 }}>
                            <CheckSVG />
                          </span>
                        </AccessibleIconRoot>
                      </span>
                    </button>
                  </form>
                  <div style={{ padding: ".3em 0" }} />
                  <button
                    className={form.cancel}
                    onClick={() => setOpenCreate(false)}
                  >
                    <AccessibleIconRoot label="cancel">
                      <CrossSVG />
                    </AccessibleIconRoot>
                  </button>
                </AlertDialog>
                {update ? (
                  <Dialog
                    open={openUpdate}
                    onOpenChange={setOpenUpdate}
                    className={`${styles.Card} ${dialog.position}`}
                  >
                    <legend className={form.legend}>
                      entry: {update.title}
                    </legend>
                    <div style={{ padding: ".3em 0" }} />
                    <form className={form.form} onSubmit={handleSubmitUpdate}>
                      <LabelRoot htmlFor="title" />
                      <input
                        className={form.input}
                        name="title"
                        type="text"
                        defaultValue={update.title}
                        minLength={3}
                        maxLength={20}
                        pattern="^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s=?!/\\]*$" // https://www.debuggex.com/
                        title="remove spaces at start, end & all consecutive spaces"
                      />
                      <LabelRoot htmlFor="body" />
                      <textarea
                        rows={6}
                        className={form.textarea}
                        name="body"
                        defaultValue={update.body}
                        minLength={5}
                        maxLength={500}
                      />
                      <div className={form.checkboxwrapper}>
                        <CheckboxRoot
                          className={form.checkboxroot}
                          onClick={() => {
                            setVisibility(!visibility);
                          }}
                        >
                          <CheckboxIndicator>
                            <CheckSVG />
                          </CheckboxIndicator>
                        </CheckboxRoot>
                        {visibility ? (
                          <LabelRoot className={form.checkboxlabel}>
                            public
                          </LabelRoot>
                        ) : (
                          <LabelRoot className={form.checkboxlabel}>
                            private
                          </LabelRoot>
                        )}
                      </div>
                      <LabelRoot>
                        <button
                          onClick={() => handleSubmitUpdate}
                          className={form.submit}
                          tabIndex={0}
                          disabled={isLoading}
                        >
                          save & close
                          <span style={{ paddingLeft: 4 }}>
                            <AccessibleIconRoot label="save">
                              <span
                                style={{ verticalAlign: -2, paddingRight: 1 }}
                              >
                                <CheckSVG />
                              </span>
                            </AccessibleIconRoot>
                          </span>
                        </button>
                      </LabelRoot>
                    </form>
                    <div style={{ padding: ".3em 0" }} />
                    <button
                      className={form.cancel}
                      onClick={() => setOpenUpdate(false)}
                    >
                      <AccessibleIconRoot label="cancel">
                        <CrossSVG />
                      </AccessibleIconRoot>
                    </button>
                  </Dialog>
                ) : null}
              </React.Suspense>
            </div>
            <div style={{ maxWidth: 350, margin: "auto", paddingTop: 15 }}>
              <Separator
                orientation="horizontal"
                style={{ margin: "1em auto" }}
              />
              {!isValidating && entries ? (
                <>
                  <div
                    style={{
                      display: "inline-flex",
                      paddingTop: 15,
                      paddingBottom: 10,
                      gap: 10,
                    }}
                  >
                    {openSort ? (
                      <>
                        <button
                          className={
                            sortPlaceholder === "descending"
                              ? `${css.sortoption} ${css.highlight}`
                              : css.sortoption
                          }
                          onClick={() => {
                            if (sortPlaceholder === "descending") {
                              setOpenSort(false);
                              return;
                            }
                            setSortKey("_id");
                            setSortValue("-1");
                            setSortPlaceholder("descending");
                            setOpenSort(false);
                          }}
                        >
                          descending
                        </button>
                        <button
                          className={
                            sortPlaceholder === "ascending"
                              ? `${css.sortoption} ${css.highlight}`
                              : css.sortoption
                          }
                          onClick={() => {
                            if (sortPlaceholder === "ascending") {
                              setOpenSort(false);
                              return;
                            }
                            setSortKey("_id");
                            setSortValue("1");
                            setSortPlaceholder("ascending");
                            setOpenSort(false);
                          }}
                        >
                          ascending
                        </button>
                        <button
                          className={
                            sortPlaceholder === "recently updated"
                              ? `${css.sortoption} ${css.highlight}`
                              : css.sortoption
                          }
                          onClick={() => {
                            if (sortPlaceholder === "recently updated") {
                              setOpenSort(false);
                              return;
                            }
                            setSortKey("updatedAt");
                            setSortValue("-1");
                            setSortPlaceholder("recently updated");
                            setOpenSort(false);
                          }}
                        >
                          recently updated
                        </button>
                      </>
                    ) : (
                      <button
                        className={css.opensort}
                        onClick={() => setOpenSort(true)}
                        tabIndex={0}
                      >
                        {sortPlaceholder}
                      </button>
                    )}
                  </div>
                  {entries.map((entry: EntryType) => (
                    <div
                      key={entry.title}
                      className="hidden"
                      style={{ padding: "1em" }}
                    >
                      <React.Suspense>
                        <ContextMenuRoot>
                          <ContextMenuTrigger>
                            <MotionDiv
                              className={styles.Card}
                              drag="x"
                              dragSnapToOrigin
                              onDragEnd={(event: any, info: PanInfo) => {
                                if (info.offset.x > 200) {
                                  setUpdate(Object(entry));
                                  setOpenUpdate(true);
                                }
                                if (info.offset.x < -200) {
                                  setUpdate(Object(entry));
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
                              >
                                <Link
                                  prefetch={false}
                                  href={`/user/entry/${entry.title}`}
                                  className={styles.Link}
                                  title={entry.title}
                                >
                                  {entry.title}
                                </Link>
                              </div>
                              <p
                                aria-label="entry.body"
                                className={css.limiter}
                              >
                                {entry.body}
                              </p>
                              <div
                                aria-label="entry.date"
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
                                  setUpdate(Object(entry));
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
                                  setUpdate(Object(entry));
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
                </>
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
          </React.Suspense>
        ) : (
          <React.Suspense>
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
          </React.Suspense>
        )}
      </>
    </>
  );
}
