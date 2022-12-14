import React from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "ui";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

const DialogAppend = dynamic(() => import("ui/radix-ui/dialog/append"), {
  suspense: true,
});

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store", method: "POST" }).then((res) => res.json());

export default function DeleteEntry({ route }: { route: string }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const { data: entry } = useSWR(route, fetcher);
  const { data: verifedUser } = useSWR(
    `/api/user/get-id-with-session`,
    fetcher
  );
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { _id: entry._id, author: verifedUser };
    await fetch("/api/entry/delete", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    if (entry.visibility) {
      router.push("/entries").then(() => router.reload());
    }
    router.push("/").then(() => router.reload());
  };
  if (!entry || !verifedUser) return <></>;
  return (
    <>
      {!showPopup ? (
        <>
          {entry.author === verifedUser._id ? (
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
              name="delete post"
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
          <button
            className={css.cancel}
            onClick={() => {
              setShowPopup(false);
            }}
          >
            <AccessibleIcon.Root label="cancel">
              <CrossSVG />
            </AccessibleIcon.Root>
          </button>
        </DialogAppend>
      </React.Suspense>
      <div id="portal" />
    </>
  );
}
