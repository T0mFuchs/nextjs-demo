import React from "react";
import dynamic from "next/dynamic";
import { useGetUser } from "hooks/user/getUser";
import { useGetOneEntry } from "hooks/entry/getOneEntry";
import { useDeleteOneEntry } from "hooks/entry/deleteOneEntry";
import { useRouter } from "next/router";
import { CheckSVG } from "ui";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const DialogAppend = dynamic(() => import("ui/radix-ui/dialog/append"), {
  suspense: true,
});

export default function DeleteEntry({ route }: { route: string }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const { data: entry } = useGetOneEntry(route);
  const { data: user } = useGetUser();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { _id: entry._id, author: user._id };
    // eslint-disable-next-line react-hooks/rules-of-hooks
    await useDeleteOneEntry(data);
    if (entry.visibility) {
      router.push("/entries").then(() => router.reload());
    }
    router.push("/").then(() => router.reload());
  };
  if (!entry || !user) return <></>;
  return (
    <>
      {!showPopup ? (
        <>
          {entry.author === user._id ? (
            <button
              className={styles.Button}
              onClick={() => {
                setShowPopup(true);
              }}
            >
              delete entry
            </button>
          ) : null}
        </>
      ) : (
        <button
          className={styles.Button}
          onClick={() => {
            setShowPopup(false);
          }}
        >
          please confirm
        </button>
      )}
      <React.Suspense>
        <DialogAppend
          open={showPopup}
          onOpenChange={setShowPopup}
          className={css.append}
        >
          <form className={css.form} onSubmit={handleSubmit}>
            <label htmlFor="delete" />
            <button
              name="delete entry button"
              type="submit"
              onClick={handleSubmit}
              className={styles.Button}
            >
              delete
              <span style={{ color: "#70deaf", position: "relative", left: 5 }}>
                <AccessibleIcon.Root label="confirm delete">
                  <CheckSVG />
                </AccessibleIcon.Root>
              </span>
            </button>
          </form>
        </DialogAppend>
      </React.Suspense>
    </>
  );
}
