import React from "react";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "components";
import { PopupCentered } from "components/portals/popup";
import * as Label from "@radix-ui/react-label";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";
import css from "./form.module.scss";

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
          className={`${styles.Button} hover`}
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
        <>
          <PopupCentered>
            <legend style={{ position: "absolute", top: "-.9em", left: 0 }}>
              new Entry
            </legend>
            <form className={css.form} onSubmit={handleSubmit}>
              <Label.Root htmlFor="title" />
              <input
                className={`${css.input} ${styles.Input}`}
                name="title"
                type="text"
                placeholder="...title"
                required
                minLength={2}
                maxLength={20}
                pattern="^[^\s]+(\s+[^\s]+)*$" // regex for disallowing whitespaces at start & beginning https://regexr.com/
              />
              <Label.Root style={{ padding: ".05em 0" }} htmlFor="body" />
              <textarea
                rows={6}
                className={`${css.textarea} ${styles.Input}`}
                name="body"
                placeholder="...body"
                required
                minLength={5}
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
          </PopupCentered>
        </>
      ) : (
        <></>
      )}
      <div id="portal" />
    </>
  );
}
