import React from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useRouter } from "next/router";
import { useCreateOneEntry } from "hooks/entry/createOneEntry";
import { useUpdateOneEntry } from "hooks/entry/updateOneEntry";
import { useDeleteOneEntry } from "hooks/entry/deleteOneEntry";
import { useGetUser } from "hooks/user/getUser";
import { signOut } from "next-auth/react";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CheckSVG, CreateSVG, CrossSVG, UpdateSVG } from "ui";
import Separator from "ui/radix-ui/separator";
import Fallback from "ui/entry/fallback";

import type { EntryType } from "types/Entry";
import type { PanInfo } from "framer-motion";

import styles from "styles/main.module.scss";
import dialog from "ui/entry/dialog.module.scss";
import form from "ui/entry/form.module.scss";
import css from "./index.module.scss";

const Flicker = dynamic(() => import("ui/animated/flicker"), {
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

const DialogRoot = dynamic(() => import("ui/radix-ui/dialog/root"), {
  suspense: true,
});

const DialogPortal = dynamic(() => import("ui/radix-ui/dialog/portal"), {
  suspense: true,
});

const DialogContent = dynamic(() => import("ui/radix-ui/dialog/content"), {
  suspense: true,
});

const AlertDialogRoot = dynamic(() => import("ui/radix-ui/alert-dialog/root"), {
  suspense: true,
});

const AlertDialogPortal = dynamic(
  () => import("ui/radix-ui/alert-dialog/portal"),
  {
    suspense: true,
  }
);

const AlertDialogContent = dynamic(
  () => import("ui/radix-ui/alert-dialog/content"),
  {
    suspense: true,
  }
);

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

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page() {
  const [sortKey, setSortKey] = React.useState("_id");
  const [sortValue, setSortValue] = React.useState("-1");
  const [sortPlaceholder, setSortPlaceholder] = React.useState("descending");
  const [openSort, setOpenSort] = React.useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
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

  const onSubmitCreate: SubmitHandler<any> = async (data) => {
    const newEntry: EntryType = {
      title: data.title,
      body: data.body,
      visibility: visibility,
      author: user._id,
    };
    if (entries.find((entry: EntryType) => entry.title === data.title)) {
      window.alert("title already exists");
      return 0;
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useCreateOneEntry(newEntry);
    setToastMessage(`created entry: ${data.title}`);
    if (visibility) {
      push("/entries");
    } else {
      mutate({ ...entries }, { revalidate: true, optimisticData: true });
    }
    setOpenCreate(false);
    setOpenToast(true);
  };
  const onSubmitUpdate: SubmitHandler<any> = async (data) => {
    const updatedEntry = {
      _id: update._id,
      title: data.title,
      body: data.body,
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
    await useUpdateOneEntry(updatedEntry);
    setToastMessage(`updated entry: ${data.title}`);
    if (visibility) {
      push("/entries");
    } else {
      mutate({ ...entries }, { revalidate: true, optimisticData: true });
    }
    setOpenUpdate(false);
    setOpenToast(true);
  };
  const handleSubmitDelete = async () => {
    const data = {
      _id: update._id,
      author: user._id,
    };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useDeleteOneEntry(data);
    setToastMessage(`deleted entry: ${update.title}`);
    mutate({ ...entries }, { revalidate: true, optimisticData: false });
    setOpenDelete(false);
    setOpenToast(true);
  };

  // load the icons behind each entry later to prevent layout shift
  const [wait, setWait] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => setWait(false), 1000);
  });

  if (isLoading) return <></>;
  if (user.emailVerified) {
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
                    <PopoverRoot
                      open={openAvatarPopover}
                      onOpenChange={setOpenAvatarPopover}
                    >
                      <PopoverTrigger
                        asChild
                        onClick={() => setOpenAvatarPopover(!openAvatarPopover)}
                      >
                        <AvatarRoot className={css.avatarRoot}>
                          <AvatarImage
                            //* user image as trigger
                            className={css.avatarImage}
                            src={user.image}
                            alt={user.name}
                          />
                        </AvatarRoot>
                      </PopoverTrigger>
                      <PopoverPortal>
                        <PopoverContent className={css.PopoverContent}>
                          <AnimatePresence mode="wait">
                            {openAvatarPopover ? (
                              <MotionDiv
                                variants={{
                                  initial: {
                                    y: -25,
                                    opacity: 0,
                                  },
                                  animate: {
                                    y: 0,
                                    opacity: 1,
                                    transition: {
                                      y: {
                                        duration: 0.25,
                                      },
                                      opacity: {
                                        duration: 0.25,
                                      },
                                    },
                                  },
                                }}
                                initial="initial"
                                animate="animate"
                              >
                                <MotionButton
                                  whileHover={{ scale: 1.15 }}
                                  whileTap={{ scale: 0.85 }}
                                  onClick={() => signOut()}
                                  className={css.PopoverSignOut}
                                  autoFocus
                                >
                                  {" "}
                                  sign out
                                </MotionButton>
                              </MotionDiv>
                            ) : null}
                          </AnimatePresence>
                        </PopoverContent>
                      </PopoverPortal>
                    </PopoverRoot>
                  </React.Suspense>
                </div>
                <Separator orientation="horizontal" />
                <button
                  className={styles.Button}
                  style={{ padding: "0 6px" }}
                  onClick={() => setOpenCreate(true)}
                >
                  <div style={{ position: "relative", top: 4, fontSize: 40 }}>
                    <CreateSVG />
                  </div>
                </button>
                <React.Suspense>
                  <ToastRoot //* Toast for dispatching messages with state & handlers //
                    open={openToast}
                    onOpenChange={setOpenToast}
                  >
                    <MotionDiv
                      drag="x"
                      onDragEnd={(event: any, info: PanInfo) => {
                        if (info.offset.x > 50) setOpenToast(false);
                        if (info.offset.x < -50) setOpenToast(false);
                        setTimeout(() => setOpenToast(false), 1000);
                      }}
                      className={css.ToastRoot}
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                        position: "relative",
                        right: "-20vw",
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        position: "relative",
                        right: 0,
                      }}
                      transition={{
                        duration: 0.2,
                        delay: 0,
                        ease: [0, 0.2, 0.5, 1.01],
                      }}
                    >
                      <div className={css.ToastMessage}>
                        <div style={{ paddingBottom: 8 }}>{toastMessage}</div>
                        <MotionDiv
                          className={css.ToastBar}
                          initial={{ scaleX: 1 }}
                          animate={{ scaleX: 0 }}
                          transition={{ duration: 6 }}
                        />
                      </div>
                    </MotionDiv>
                  </ToastRoot>
                </React.Suspense>
              </div>
              <div style={{ maxWidth: 350, margin: "auto", paddingTop: 15 }}>
                <Separator
                  orientation="horizontal"
                  style={{ margin: "1em auto" }}
                />
                {!isValidating && entries ? (
                  <React.Suspense>
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
                                    <AnimatePresence
                                      initial={false}
                                      mode="wait"
                                    >
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
                                          onClick={() =>
                                            setVisibility(!visibility)
                                          }
                                        >
                                          <LabelRoot
                                            className={form.checkboxlabel}
                                          >
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
                                          onClick={() =>
                                            setVisibility(!visibility)
                                          }
                                        >
                                          <LabelRoot
                                            className={form.checkboxlabel}
                                          >
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
                      {openCreate ? (
                        <AlertDialogRoot //* Create Entry Popup //
                          open={openCreate}
                          onOpenChange={setOpenCreate}
                        >
                          <AlertDialogPortal>
                            <AlertDialogContent
                              className={`${dialog.dialogCard}`}
                            >
                              <MotionDiv
                                className={`${styles.Card} `}
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
                                  onSubmit={handleSubmit(onSubmitCreate)}
                                >
                                  <legend className={form.legend}>
                                    new Entry
                                  </legend>
                                  <button
                                    className={form.cancel}
                                    onClick={() => setOpenCreate(false)}
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
                                        message: "min-length: 3",
                                      },
                                      maxLength: {
                                        value: 20,
                                        message: "max-length: 20",
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
                                    placeholder="title"
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
                                    placeholder="body"
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
                                    <AnimatePresence
                                      initial={false}
                                      mode="wait"
                                    >
                                      {visibility ? (
                                        <MotionDiv
                                          style={{
                                            lineHeight: 2,
                                            paddingRight: 20,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            scale: 1,
                                          }}
                                          whileTap={{ scale: 0.85 }}
                                          onClick={() =>
                                            setVisibility(!visibility)
                                          }
                                        >
                                          <LabelRoot
                                            className={form.checkboxlabel}
                                          >
                                            public
                                          </LabelRoot>
                                        </MotionDiv>
                                      ) : (
                                        <MotionDiv
                                          style={{
                                            lineHeight: 2,
                                            paddingRight: 15,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            scale: 1,
                                          }}
                                          whileTap={{ scale: 0.85 }}
                                          onClick={() =>
                                            setVisibility(!visibility)
                                          }
                                        >
                                          <LabelRoot
                                            className={form.checkboxlabel}
                                          >
                                            private
                                          </LabelRoot>
                                        </MotionDiv>
                                      )}
                                    </AnimatePresence>
                                  </div>
                                  <button
                                    onClick={() => handleSubmit(onSubmitCreate)}
                                    className={form.submit}
                                    type="submit"
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
                            </AlertDialogContent>
                          </AlertDialogPortal>
                        </AlertDialogRoot>
                      ) : null}
                    </AnimatePresence>
                    <div
                      //! Sort Component
                      style={{
                        display: "inline-flex",
                        paddingTop: 15,
                        paddingBottom: 10,
                      }}
                    >
                      <AnimatePresence initial={false} mode="wait">
                        {openSort ? (
                          <MotionDiv
                            style={{ display: "inline-flex", gap: 10 }}
                            variants={{
                              closed: { opacity: 0, scale: 0.3 },
                              open: {
                                opacity: 1,
                                scale: 1,
                                transition: {
                                  duration: 0.2,
                                  ease: [0, 0.71, 0.2, 1.01],
                                },
                              },
                            }}
                            initial="closed"
                            animate="open"
                          >
                            <MotionButton
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.85 }}
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
                            </MotionButton>
                            <MotionButton
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.85 }}
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
                            </MotionButton>
                            <MotionButton
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.85 }}
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
                            </MotionButton>
                          </MotionDiv>
                        ) : (
                          <MotionButton
                            whileHover={{ scale: 1.15 }}
                            whileTap={{ scale: 0.85 }}
                            className={css.opensort}
                            onClick={() => setOpenSort(true)}
                            tabIndex={0}
                          >
                            {sortPlaceholder}
                          </MotionButton>
                        )}
                      </AnimatePresence>
                    </div>
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
                                  <span style={{ padding: "0 9px" }}>
                                    {"|"}
                                  </span>
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
  if (user && !user.emailVerified) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { push } = useRouter();
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
}
