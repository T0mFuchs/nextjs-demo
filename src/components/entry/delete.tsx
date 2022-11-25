import React from "react";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "..";
import { PopupCentered } from "../portals/popup";

import styles from "../../styles/main.module.css";

export default function DeleteEntry({ title }: { title: string }) {
  const router = useRouter();
  const [showPopup, setShowPopup] = React.useState(false);
  const [entry, setEntry] = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/entry/${title}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((entry) => {
        setEntry(entry);
      });
  }, [title]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // @ts-ignore
    const data = { id: entry.id, title: entry.title };
    await fetch("/api/entry/delete", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    router.push("/entries");
  };
  return (
    <>
      {!showPopup ? (
        <button
          className={`${styles.Button}`}
          onClick={() => setShowPopup(true)}
        >
          delete entry
        </button>
      ) : (
        <button
          className={`${styles.Button}`}
          onClick={() => setShowPopup(false)}
        >
          please confirm
        </button>
      )}
      {showPopup ? (
        <>
          <PopupCentered>
            <form
              style={{
                all: "unset",
                display: "flex",
                padding: ".2rem 0",
                flexDirection: "column",
              }}
              onSubmit={handleSubmit}
            >
              <label htmlFor="delete" />
              <button
                name="delete post"
                type="submit"
                onClick={handleSubmit}
                style={{
                  all: "unset",
                }}
              >
                <span style={{ color: `#70deaf` }}>
                  <CheckSVG />
                </span>
                yes, delete post
              </button>
            </form>
            <button
              style={{
                all: "unset",
                position: "absolute",
                right: "-.8rem",
                top: "-.8rem",
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
