import React from "react";
import { useRouter } from "next/router";
import { CrossSVG } from "..";
import { PopupCentered } from "../portals/popup";

import styles from "../../styles/main.module.css";

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
            <form
              style={{
                all: "unset",
                display: "flex",
                padding: ".2em 0",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <label htmlFor="title" />
              <input
                style={{
                  fontSize: "1.3em",
                  fontWeight: 900,
                  backgroundColor: "var(--transparent)",
                  border: 0,
                }}
                className={styles.Input}
                name="title"
                type="text"
                placeholder="...title"
                required
                minLength={2}
                maxLength={20}
                pattern="^[^\s]+(\s+[^\s]+)*$" // regex for disallowing whitespaces https://regexr.com/
              />
              <label style={{ padding: ".05em 0" }} htmlFor="body" />
              <textarea
                style={{
                  fontSize: "1em",
                  fontWeight: 600,
                  lineHeight: "2em",
                  backgroundColor: "var(--transparent)",
                  border: 0,
                }}
                rows={10}
                className={styles.Input}
                name="body"
                placeholder="...body"
                required
                minLength={5}
              />
              <button
                onClick={() => {
                  handleSubmit;
                }}
                style={{
                  all: "unset",
                  position: "absolute",
                  right: 0,
                  bottom: "-.5em",
                  color: "#70deaf",
                }}
                type="submit"
              >
                save & close
              </button>
            </form>
            <button
              style={{
                all: "unset",
                position: "absolute",
                right: "-.8em",
                top: "-.8em",
                color: "var(--color-secondary)",
              }}
              onClick={() => {
                setShowPopup(false);
              }}
            >
              <CrossSVG />
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
