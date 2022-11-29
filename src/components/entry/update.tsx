import React from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "components";
import { PopupCentered } from "components/portals/popup";
import * as Label from "@radix-ui/react-label";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";

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
            <form
              style={{
                all: "unset",
                display: "flex",
                padding: ".2em 0",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <Label.Root htmlFor="title" />
              <input
                style={{
                  fontSize: "1.3em",
                  fontWeight: 900,
                  border: 0,
                  backgroundColor: "#00000000",
                }}
                className={styles.Input}
                name="title"
                type="text"
                defaultValue={data.title}
                minLength={2}
                maxLength={20}
                pattern="^[^\s]+(\s+[^\s]+)*$" // regex for disallowing whitespaces https://regexr.com/
              />
              <Label.Root style={{ padding: ".05em 0" }} htmlFor="body" />
              <textarea
                style={{
                  fontSize: "1em",
                  fontWeight: 600,
                  lineHeight: "1.7em",
                  backgroundColor: "#00000000",
                  border: 0,
                  height: "35vh",
                }}
                rows={6}
                className={styles.Input}
                name="body"
                defaultValue={data.body}
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
              style={{
                all: "unset",
                position: "fixed",
                right: "-.25em",
                top: "-.9em",
                color: "#ff674b",
                fontSize: "1.7em",
              }}
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
