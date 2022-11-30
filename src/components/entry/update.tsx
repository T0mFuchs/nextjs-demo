import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "components";
import { PopupCentered } from "components/portals/popup";
import * as Label from "@radix-ui/react-label";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";
import css from "./form.module.scss";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function UpdateEntry({ title }: { title: string }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const { data } = useSWR(`/api/entry/${title}`, fetcher);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newData = {
      id: data.id,
      // @ts-ignore
      title: form.title.value as string,
      body: form.body.value as string,
    };
    await fetch("/api/entry/update", {
      body: JSON.stringify(newData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    setShowPopup(false);
    console.log(newData.title);
    router.push(`/entry/${newData.title}`).then(() => router.reload());
  };
  window.addEventListener("beforeunload", (event) => {
    if (showPopup) {
      event.returnValue = "";
      event.preventDefault();
    }
  });
  return (
    <>
      {!showPopup ? (
        <button className={styles.Button} onClick={() => setShowPopup(true)}>
          update entry
        </button>
      ) : (
        <button className={styles.Button} onClick={() => setShowPopup(false)}>
          editting...
        </button>
      )}
      {showPopup ? (
        <>
          <PopupCentered>
            <legend style={{ position: "absolute", top: "-.9em", left: 0 }}>
              entry: {title}
            </legend>
            <div style={{ padding: ".3em 0" }} />
            <form className={css.form} onSubmit={handleSubmit}>
              <Label.Root htmlFor="title" />
              <input
                className={css.input}
                name="title"
                type="text"
                defaultValue={data.title}
                minLength={3}
                maxLength={20}
                pattern="^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s]*$" // ^([^\s]*[A-Za-z0-9](?:\S+\s[^\s]))*[^\s]*$ | https://www.debuggex.com/
                title="remove spaces at start, end & all consecutive spaces"
              />
              <Label.Root style={{ padding: ".05em 0" }} htmlFor="body" />
              <textarea
                rows={6}
                className={css.textarea}
                name="body"
                defaultValue={data.body}
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
                <span>
                  <AccessibleIcon.Root label="submit">
                    <CheckSVG />
                  </AccessibleIcon.Root>
                </span>
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
          </PopupCentered>
        </>
      ) : (
        <></>
      )}
      <div id="portal" />
    </>
  );
}
