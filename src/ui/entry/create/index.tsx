import React from "react";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "ui";

import * as Label from "@radix-ui/react-label";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import * as Checkbox from "@radix-ui/react-checkbox";

import styles from "styles/main.module.scss";
import dialog from "../dialog.module.scss";
import form from "../form.module.scss";

const AlertDialog = dynamic(() => import("ui/radix-ui/alert-dialog"), {
  suspense: true,
});

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store", method: "POST" }).then((res) => res.json());

export default function CreateEntry() {
  const [showPopup, setShowPopup] = React.useState(false);
  const [visibility, setVisibility] = React.useState(false);
  const { data: verifedUser } = useSWR(`api/user/get-id-with-session`, fetcher);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      // @ts-ignore
      title: form.title.value as string,
      body: form.body.value as string,
      visibility: visibility,
      author: verifedUser._id,
    };
    await fetch("api/entry/create", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    setShowPopup(false);
    if (visibility) {
      router.push(`/entries`).then(() => router.reload());
    }
    router.push(`/`).then(() => router.reload());
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
            className={`${styles.Card} ${dialog.position}`}
          >
            <legend className={form.legend}>new Entry</legend>
            <div style={{ padding: ".3em 0" }} />
            <form className={form.form} onSubmit={handleSubmit}>
              <Label.Root htmlFor="title" />
              <input
                className={form.input}
                name="title"
                type="text"
                placeholder="...title"
                required
                minLength={3}
                maxLength={20}
                pattern="^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s]*$" // https://www.debuggex.com/
                title="remove spaces at start, end & all consecutive spaces"
                autoFocus
              />
              <Label.Root htmlFor="body" />
              <textarea
                rows={6}
                className={form.textarea}
                name="body"
                placeholder="...body"
                required
                minLength={5}
                maxLength={500}
              />
              <div className={form.checkboxwrapper}>
                <Checkbox.Root
                  checked={visibility}
                  className={form.checkboxroot}
                  onClick={() => setVisibility(!visibility)}
                >
                  <Checkbox.Indicator>
                    <CheckSVG />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                {visibility ? (
                  <Label.Root className={form.checkboxlabel}>public</Label.Root>
                ) : (
                  <Label.Root className={form.checkboxlabel}>
                    private
                  </Label.Root>
                )}
              </div>
              <button
                onClick={() => {
                  handleSubmit;
                }}
                className={form.submit}
                type="submit"
              >
                save & close
                <span style={{ paddingLeft: 4 }}>
                  <AccessibleIcon.Root label="save">
                    <CheckSVG />
                  </AccessibleIcon.Root>
                </span>
              </button>
            </form>
            <div style={{ padding: ".3em 0" }} />
            <button
              className={form.cancel}
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
