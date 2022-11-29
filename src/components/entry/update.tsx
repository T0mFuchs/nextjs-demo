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
  const router = useRouter();
  const [showPopup, setShowPopup] = React.useState(false);
  const { data } = useSWR(`/api/entry/${title}`, fetcher);

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

  return (
    <>
      {!showPopup ? (
        <button
          className={`${styles.Button}`}
          onClick={() => setShowPopup(true)}
        >
          update entry
        </button>
      ) : (
        <button
          className={`${styles.Button}`}
          onClick={() => setShowPopup(false)}
        >
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
                style={{
                  fontSize: "1.3em",
                  fontWeight: 900,
                  border: 0,
                  backgroundColor: "#00000000",
                }}
                className={`${css.input} ${styles.Input}`}
                name="title"
                type="text"
                defaultValue={data.title}
                minLength={2}
                maxLength={20}
                pattern="^[^\s]+(\s+[^\s]+)*$" // regex for disallowing whitespaces at start & beginning https://regexr.com/
              />
              <Label.Root style={{ padding: ".05em 0" }} htmlFor="body" />
              <textarea
                rows={6}
                className={`${css.textarea} ${styles.Input}`}
                name="body"
                defaultValue={data.body}
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
