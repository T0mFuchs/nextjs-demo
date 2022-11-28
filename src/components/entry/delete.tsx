import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "components";
import AccessibleIcon from "components/radix-ui/AccessibleIcon";

import styles from "styles/main.module.scss";
import { Entry } from "lib/Entry";

const AlertDialog = dynamic(() => import("components/radix-ui/AlertDialog"), {
  suspense: true,
});

export default function DeleteEntry({ title }: { title: string }) {
  const router = useRouter();
  const [showPopup, setShowPopup] = React.useState(false);
  const [entry, setEntry]: any = React.useState(null);

  React.useEffect(() => {
    fetch(`/api/entry/${title}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((entry: Entry) => {
        setEntry(entry);
      });
  }, [title]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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
      <React.Suspense>
        <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
          <form
            style={{
              all: "unset",
              display: "flex",
              padding: ".2em 0",
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
                <AccessibleIcon label="confirm delete">
                  <CheckSVG />
                </AccessibleIcon>
              </span>
              yes, delete post
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
            <AccessibleIcon label="cancel">
              <CrossSVG />
            </AccessibleIcon>
          </button>
        </AlertDialog>
      </React.Suspense>
      <div id="portal" />
    </>
  );
}
