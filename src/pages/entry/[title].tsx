import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useGetUser } from "hooks/user/getUser";
import { useUpdateOneEntry } from "hooks/entry/updateOneEntry";
import { useDeleteOneEntry } from "hooks/entry/deleteOneEntry";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CheckSVG, CrossSVG } from "ui";
import Fallback from "ui/entry/fallback";

import type { EntryType } from "types/Entry";

import styles from "styles/main.module.scss";
import dialog from "ui/entry/dialog.module.scss";
import form from "ui/entry/form.module.scss";
import css from "./index.module.scss";

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

const DialogRoot = dynamic(() => import("ui/radix-ui/dialog/root"), {
  suspense: true,
});

const DialogPortal = dynamic(() => import("ui/radix-ui/dialog/portal"), {
  suspense: true,
});

const DialogContent = dynamic(() => import("ui/radix-ui/dialog/content"), {
  suspense: true,
});

const LabelRoot = dynamic(() => import("ui/radix-ui/label/root"), {
  suspense: true,
});

const Flicker = dynamic(() => import("ui/animated/flicker"), {
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
  const { title }: any = context.params;
  return { props: { title } };
};

// todo :: fix page initial loading fallback background is off

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page({ title }: { title: string }) {
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  //* set current entry for update&delelte with Object(entry)
  const [update, setUpdate]: any = React.useState();

  //* set entry.visibility
  const [visibility, setVisibility] = React.useState(true);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const { push } = useRouter();

  const { data: entry, mutate, error } = useSWR(`/api/entry/${title}`, fetcher);
  const { data: compareAllEntries } = useSWR(
    update ? "/api/entries" : null,
    fetcher
  );
  const { data: user, isLoading } = useGetUser();

  const onSubmitUpdate: SubmitHandler<any> = async (data) => {
    const updatedEntry = {
      _id: update._id,
      title: data.title,
      body: data.body,
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
    await useUpdateOneEntry(updatedEntry);
    if (update.title === data.title) {
      mutate();
      setOpenUpdate(false);
    } else {
      push(`/entry/${data.title}`);
    }
  };
  const handleSubmitDelete = async () => {
    const data = {
      _id: update._id,
      author: user._id,
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useDeleteOneEntry(data);
    setOpenDelete(false);
    push("/entries");
  };

  if (error) return <>error</>;
  return (
    <>
      <Head>
        <title>entry/{title}</title>
      </Head>
      <>
        {entry ? (
          <div className={css.p1}>
            <div className={styles.Card}>
              <h2
                className={`${styles.H2} ${css.Title}`}
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
            </div>
          </div>
        ) : (
          <Fallback maxWidth={"600px"} />
        )}
        {user && entry && user._id === entry.author ? (
          <>
            <span
              style={{ display: "flex", justifyContent: "center", gap: 10 }}
            >
              <button
                className={styles.Button}
                onClick={() => {
                  setUpdate(Object(entry));
                  setOpenDelete(true);
                }}
              >
                delete
              </button>
              <button
                className={styles.Button}
                onClick={() => {
                  setUpdate(Object(entry));
                  setOpenUpdate(true);
                }}
              >
                update
              </button>
              <React.Suspense>
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
                            <form
                              className={form.form}
                              onSubmit={handleSubmit(onSubmitUpdate)}
                            >
                              <legend className={form.legend}>
                                entry: {update.title}
                              </legend>
                              <button
                                className={form.cancel}
                                onClick={() => setOpenUpdate(false)}
                              >
                                <AccessibleIconRoot label="cancel">
                                  <div
                                    style={{
                                      position: "relative",
                                      top: -8,
                                    }}
                                  >
                                    <CrossSVG />
                                  </div>
                                </AccessibleIconRoot>
                              </button>
                              <LabelRoot htmlFor="title" />
                              <ErrorMessage
                                errors={errors}
                                name="title"
                                render={({ message }) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      color: "#fa7070",
                                    }}
                                  >
                                    {message}
                                  </div>
                                )}
                              />
                              <input
                                {...register("title", {
                                  required: true,
                                  minLength: {
                                    value: 3,
                                    message: "atleast 3 characters",
                                  },
                                  maxLength: {
                                    value: 20,
                                    message: "maximum 20 characters",
                                  },
                                  pattern: {
                                    // https://www.debuggex.com/
                                    value:
                                      /^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s=?!%./\\]*$/,
                                    message: "remove special characters",
                                  },
                                })}
                                className={form.input}
                                name="title"
                                type="text"
                                defaultValue={update.title}
                              />

                              <LabelRoot htmlFor="body" />
                              <ErrorMessage
                                errors={errors}
                                name="body"
                                render={({ message }) => (
                                  <div
                                    style={{
                                      display: "flex",
                                      color: "#fa7070",
                                    }}
                                  >
                                    {message}
                                  </div>
                                )}
                              />
                              <textarea
                                {...register("body", {
                                  required: true,
                                  minLength: {
                                    value: 5,
                                    message: "atleast 5 characters",
                                  },
                                  maxLength: {
                                    value: 2000,
                                    message: "maxmium 2000 characters",
                                  },
                                })}
                                rows={7}
                                className={form.textarea}
                                name="body"
                                defaultValue={update.body}
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
                                onClick={() => handleSubmit(onSubmitUpdate)}
                                className={form.submit}
                                tabIndex={0}
                              >
                                save & close
                                <span style={{ paddingLeft: 4 }}>
                                  <AccessibleIconRoot label="save">
                                    <span
                                      style={{
                                        position: "relative",
                                        top: 2,
                                        paddingRight: 1,
                                      }}
                                    >
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
                  ) : null}
                </AnimatePresence>

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
                                opacity: 0.0,
                                scale: 0.5,
                              },
                              animate: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  scale: {
                                    ease: [0.05, 0.1, 0.3, 1.05],
                                    duration: 0.1,
                                  },
                                  opacity: {
                                    ease: [0.05, 0.1, 0.3, 1.05],
                                    duration: 0.2,
                                  },
                                },
                              },
                            }}
                            initial="initial"
                            animate="animate"
                            className={styles.Button}
                            style={{
                              fontSize: "2em",
                              position: "relative",
                              border: "1px solid currentColor",
                            }}
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
                  ) : null}
                </AnimatePresence>
              </React.Suspense>
            </span>
          </>
        ) : null}
        {!user && !isLoading ? ( //* user is not signed in //
          <React.Suspense>
            <Flicker style={{}} text="sign in">
              <Link
                prefetch={false}
                href="/auth/signin"
                className={styles.Link}
                style={{ textDecoration: "none" }}
                title="sign in"
              >
                sign in
              </Link>
            </Flicker>
          </React.Suspense>
        ) : null}
        <div aria-hidden className={css.p1} />
      </>
    </>
  );
}
