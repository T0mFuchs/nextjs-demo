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
  window.addEventListener("beforeunload", (event) => {
    if (showPopup) {
      // this doesn't work for mobile
      event.returnValue = "";
      event.preventDefault();
    }
  });
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
        <>
          <PopupCentered>
            <legend style={{ position: "absolute", top: "-.9em", left: 0 }}>
              new Entry
            </legend>
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
              <Label.Root style={{ padding: ".05em 0" }} htmlFor="body" />
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
