import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import useSWR from "swr";
import { useGetUser } from "hooks/user/getUser";
import { useDeleteOneEntry } from "hooks/entry/deleteOneEntry";
import { useUpdateOneEntry } from "hooks/entry/updateOneEntry";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CheckSVG, CrossSVG } from "ui";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { EntryType } from "types/Entry";

import styles from "styles/main.module.scss";
import dialog from "ui/entry/dialog.module.scss";
import form from "ui/entry/form.module.scss";
import css from "./index.module.scss";

const DialogRoot = dynamic(() => import("ui/radix-ui/dialog/root"), {
  suspense: true,
});

const DialogPortal = dynamic(() => import("ui/radix-ui/dialog/portal"), {
  suspense: true,
});

const DialogContent = dynamic(() => import("ui/radix-ui/dialog/content"), {
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

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});

const MotionButton = dynamic(() => import("ui/framer-motion/button"), {
  suspense: true,
});

const AnimatePresence = dynamic(
  () => import("ui/framer-motion/animatePresence"),
  {
    suspense: true,
  }
);

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const title: string = context.query.title as string;
  const userRef: string = context.query.user as string;
  return { props: { userRef, title } };
};

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page({
  userRef,
  title,
}: {
  userRef: string;
  title: string;
}) {
  const [openDelete, setOpenDelete] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  //* set current entry for update&delelte with Object(entry)
  const [update, setUpdate]: any = React.useState();
  //* set entry.visibility
  const [visibility, setVisibility] = React.useState(false);

  const { data: user, isLoading, isError } = useGetUser();
  const {
    data: entry,
    mutate,
    isValidating,
  } = useSWR(
    user && user._id === userRef ? `/api/${user._id}/entry/${title}` : null,
    fetcher
  );
  const { data: compareAllEntries } = useSWR(
    update && openUpdate ? `/api/${user._id}/entries` : null,
    fetcher
  );

  const handleSubmitDelete = async () => {
    const data = {
      _id: update._id,
      author: user._id,
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useDeleteOneEntry(data);
    mutate({}, { revalidate: true, optimisticData: false });
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
    if (
      compareAllEntries.find((entry: EntryType) => entry.title === data.title)
    ) {
      if (data.title !== update.title) {
        window.alert("title already exists");
        return 0;
      }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useUpdateOneEntry(data);
    mutate({}, { revalidate: true, optimisticData: true });
    setOpenUpdate(false);
  };

  if (isLoading) return <></>;
  if (user._id !== userRef || isError) return <>not authorized</>; // todo : add not authorized page
  return (
    <>
      <Head>
        <title>/user/entry/{title}</title>
      </Head>
      <React.Suspense>
        {entry ? (
          <div className={css.p1}>
            <MotionDiv className={styles.Card}>
              <h2
                className={styles.H2}
                style={{ fontSize: "2.5em", position: "relative", bottom: 5 }}
                aria-label="entry title"
              >
                {entry.title}
              </h2>
              <p aria-label="entry body" className={``}>
                {entry.body}
              </p>
              <div aria-label="entry date" className={css.Body}>
                {dateFromObjectId(entry._id).getDate()}
                {" / "}
                {dateFromObjectId(entry._id).getMonth() + 1}
                {" / "}
                {dateFromObjectId(entry._id).getFullYear()}
                <span style={{ padding: "0 9px" }}>{"|"}</span>
                {dateFromObjectId(entry._id).getHours()}
                {" : "}
                {dateFromObjectId(entry._id).getMinutes() < 9
                  ? "0" + dateFromObjectId(entry._id).getMinutes()
                  : dateFromObjectId(entry._id).getMinutes()}
                {" : "}
                {dateFromObjectId(entry._id).getSeconds() < 9
                  ? "0" + dateFromObjectId(entry._id).getSeconds()
                  : dateFromObjectId(entry._id).getSeconds()}
              </div>
            </MotionDiv>
          </div>
        ) : null}
        <span
          aria-label="buttons"
          style={{ display: "flex", justifyContent: "center", gap: 10 }}
        >
          <AnimatePresence mode="wait" initial={false}>
            {openDelete ? (
              <DialogRoot //* Delete Entry Dialog //
                open={openDelete}
                onOpenChange={setOpenDelete}
              >
                <DialogPortal>
                  <DialogContent className={`${dialog.dialogButton}`}>
                    <MotionButton
                      variants={{
                        initial: {
                          opacity: 0,
                        },
                        animate: {
                          opacity: 1,
                          transition: {
                            opacity: {
                              ease: [0.05, 0.1, 0.3, 1.05],
                              duration: 0.5,
                            },
                          },
                        },
                      }}
                      initial="initial"
                      animate="animate"
                      className={`${styles.Button}`}
                      onClick={() => handleSubmitDelete()}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.85 }}
                      tabIndex={0}
                    >
                      delete
                    </MotionButton>
                  </DialogContent>
                </DialogPortal>
              </DialogRoot>
            ) : (
              <button
                className={styles.Button}
                onClick={() => {
                  setUpdate(Object(entry));
                  setOpenDelete(true);
                }}
              >
                delete
              </button>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait" initial={false}>
            {openUpdate ? (
              <DialogRoot //* Edit Entry Popup //
                open={openUpdate}
                onOpenChange={setOpenUpdate}
              >
                <DialogPortal>
                  <DialogContent className={`${dialog.dialogCard}`}>
                    <MotionDiv
                      className={`${styles.Card}`}
                      style={{ padding: 0 }}
                      variants={{
                        initial: {
                          opacity: 0,
                          y: "-25vh",
                        },
                        animate: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            y: {
                              ease: [0.05, 0.1, 0.3, 1.05],
                              duration: 0.35,
                            },
                            opacity: {
                              ease: [0.05, 0.1, 0.3, 1.05],
                              duration: 0.45,
                            },
                          },
                        },
                      }}
                      initial="initial"
                      animate="animate"
                    >
                      <form className={form.form} onSubmit={handleSubmitUpdate}>
                        <legend className={form.legend}>
                          entry: {update.title}
                        </legend>
                        <button
                          className={form.cancel}
                          onClick={() => setOpenUpdate(false)}
                        >
                          <AccessibleIconRoot label="cancel">
                            <div style={{ position: "relative", top: -8 }}>
                              <CrossSVG />
                            </div>
                          </AccessibleIconRoot>
                        </button>
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
                          <AnimatePresence initial={false} mode="wait">
                            {visibility ? (
                              <MotionDiv
                                style={{
                                  lineHeight: 2,
                                  paddingRight: 20,
                                  cursor: "pointer",
                                }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                }}
                                whileTap={{ scale: 0.85 }}
                                onClick={() => setVisibility(!visibility)}
                              >
                                <LabelRoot className={form.checkboxlabel}>
                                  public
                                </LabelRoot>
                              </MotionDiv>
                            ) : (
                              <MotionDiv
                                style={{
                                  lineHeight: 2,
                                  paddingRight: 15,
                                  cursor: "pointer",
                                }}
                                animate={{
                                  opacity: 1,
                                  scale: 1,
                                }}
                                whileTap={{ scale: 0.85 }}
                                onClick={() => setVisibility(!visibility)}
                              >
                                <LabelRoot className={form.checkboxlabel}>
                                  private
                                </LabelRoot>
                              </MotionDiv>
                            )}
                          </AnimatePresence>
                        </div>
                        <button
                          onClick={() => handleSubmitUpdate}
                          className={form.submit}
                          tabIndex={0}
                        >
                          save & close
                          <span style={{ paddingLeft: 4 }}>
                            <AccessibleIconRoot label="save">
                              <span className={css.span}>
                                <CheckSVG />
                              </span>
                            </AccessibleIconRoot>
                          </span>
                        </button>
                      </form>
                    </MotionDiv>
                  </DialogContent>
                </DialogPortal>
              </DialogRoot>
            ) : (
              <button
                className={styles.Button}
                onClick={() => {
                  setUpdate(Object(entry));
                  setOpenUpdate(true);
                }}
              >
                update
              </button>
            )}
          </AnimatePresence>
        </span>
        <div aria-hidden className={css.p1} />
      </React.Suspense>
    </>
  );
}
