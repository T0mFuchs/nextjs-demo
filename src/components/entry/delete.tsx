import React from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "components";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";
import css from "./delete.module.scss";
import { Entry } from "lib/Entry";

const Dialog = dynamic(() => import("components/radix-ui/dialog"), {
  suspense: true,
});

export default function DeleteEntry({ title }: { title: string }) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [entry, setEntry]: any = React.useState(null);
  const router = useRouter();

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
        <button className={styles.Button} onClick={() => setShowPopup(true)}>
          delete entry
        </button>
      ) : (
        <button className={styles.Button} onClick={() => setShowPopup(false)}>
          please confirm
        </button>
      )}
      <React.Suspense>
        <Dialog
          position={css.position}
          open={showPopup}
          onOpenChange={setShowPopup}
        >
          <form className={css.form} onSubmit={handleSubmit}>
            <label htmlFor="delete" />
            <button
              name="delete post"
              type="submit"
              onClick={handleSubmit}
              style={{
                all: "unset",
              }}
            >
              <span style={{ color: "#70deaf" }}>
                <AccessibleIcon.Root label="confirm delete">
                  <CheckSVG />
                </AccessibleIcon.Root>
              </span>
              yes, delete post
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
        </Dialog>
      </React.Suspense>
      <div id="portal" />
    </>
  );
}
