import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "ui";
import * as Label from "@radix-ui/react-label";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";
import css from "./form.module.scss";

const AlertDialog = dynamic(() => import("ui/radix-ui/alert-dialog"), {
  suspense: true,
});

export default function CreateEntry() {
  const [showPopup, setShowPopup] = React.useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      // @ts-ignore
      title: form.title.value as string,
      body: form.body.value as string,
    };
    await fetch("api/entry/create", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    setShowPopup(false);
    router.push(`/entry/${data.title}`).then(() => router.reload());
  };
  return (
    <>
      {!showPopup ? (
        <button
          className={styles.Button}
          style={{ width: 120 }}
          onClick={() => setShowPopup(true)}
        >
          create entry
        </button>
      ) : (
        <button
          className={styles.Button}
          style={{ width: 120 }}
          onClick={() => setShowPopup(false)}
        >
          creating...
        </button>
      )}
      {showPopup ? (
        <React.Suspense>
          <AlertDialog
            open={showPopup}
            onOpenChange={setShowPopup}
            className={styles.Card}
            style={{ minWidth: "75%" }}
          >
            <legend className={css.legend}>new Entry</legend>
            <div style={{ padding: ".3em 0" }} />
            <form className={css.form} onSubmit={handleSubmit}>
              <Label.Root htmlFor="title" />
              <input
                className={css.input}
                name="title"
                type="text"
                placeholder="...title"
                required
                minLength={3}
                maxLength={20}
                pattern="^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s]*$" // ^([^\s]*[A-Za-z0-9](?:\S+\s[^\s]))*[^\s]*$ | https://www.debuggex.com/
                title="remove spaces at start, end & all consecutive spaces"
                autoFocus
              />
              <Label.Root htmlFor="body" />
              <textarea
                rows={6}
                className={css.textarea}
                name="body"
                placeholder="...body"
                required
                minLength={5}
                maxLength={500}
              />
              <button
                onClick={() => {
                  handleSubmit;
                }}
                className={css.submit}
                type="submit"
              >
                save & close{" "}
                <AccessibleIcon.Root label="save">
                  <CheckSVG />
                </AccessibleIcon.Root>
              </button>
            </form>
            <div style={{ padding: ".3em 0" }} />
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
          </AlertDialog>
        </React.Suspense>
      ) : (
        <></>
      )}
      <div id="portal" />
    </>
  );
}
