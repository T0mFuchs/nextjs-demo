import React from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "ui";
import { ObjectId } from "mongodb";
import * as Label from "@radix-ui/react-label";
import * as AccessibleIcon from "@radix-ui/react-accessible-icon";
import * as Checkbox from "@radix-ui/react-checkbox";

import styles from "styles/main.module.scss";
import dialog from "../dialog.module.scss";
import form from "../form.module.scss";

const Dialog = dynamic(() => import("ui/radix-ui/dialog"), {
  suspense: true,
});

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store", method: "POST" }).then((res) => res.json());

export default function UpdateEntry({
  route,
  defaultVisibility,
}: {
  route: string;
  defaultVisibility: boolean;
}) {
  const [showPopup, setShowPopup] = React.useState(false);
  const [visibility, setVisibility] = React.useState(defaultVisibility);
  const { data: oldEntry } = useSWR(route, fetcher);
  const { data: verifedUser } = useSWR(
    `/api/user/get-id-with-session`,
    fetcher
  );
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const newEntry = {
      _id: oldEntry._id,
      // @ts-ignore
      title: form.title.value as string,
      body: form.body.value as string,
      visibility: visibility,
      author: verifedUser._id,
    };
    console.log(verifedUser, oldEntry._id);
    await fetch("/api/entry/update", {
      body: JSON.stringify(newEntry),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    setShowPopup(false);
    if (visibility) {
      router.push(`/entry/${newEntry.title}`).then(() => router.reload());
    }
    router.push(`/user/entry/${newEntry.title}`).then(() => router.reload());
  };
  if (!oldEntry || !verifedUser) return <></>;
  return (
    <>
      {!showPopup ? (
        <>
          {oldEntry.author === verifedUser._id ? (
            <button
              className={styles.Button}
              onClick={() => {
                setShowPopup(true);
                console.log(oldEntry.author, verifedUser._id);
              }}
            >
              update entry
            </button>
          ) : null}
        </>
      ) : (
        <button className={styles.Button} onClick={() => setShowPopup(false)}>
          editting...
        </button>
      )}
      <React.Suspense>
        <Dialog
          open={showPopup}
          onOpenChange={setShowPopup}
          className={`${styles.Card} ${dialog.position}`}
        >
          <legend className={form.legend}>entry: {oldEntry.title}</legend>
          <div style={{ padding: ".3em 0" }} />
          <form className={form.form} onSubmit={handleSubmit}>
            <Label.Root htmlFor="title" />
            <input
              className={form.input}
              name="title"
              type="text"
              defaultValue={oldEntry.title}
              minLength={3}
              maxLength={20}
              pattern="^([^\s]*[\w]*(?:\S+\s[^\s]))*[^\s]*$" // https://www.debuggex.com/
              title="remove spaces at start, end & all consecutive spaces"
            />
            <Label.Root htmlFor="body" />
            <textarea
              rows={6}
              className={form.textarea}
              name="body"
              defaultValue={oldEntry.body}
              minLength={5}
              maxLength={500}
            />
            <div className={form.checkboxwrapper}>
              <Checkbox.Root
                className={form.checkboxroot}
                defaultChecked={defaultVisibility}
                onClick={() => {
                  setVisibility(!visibility);
                }}
              >
                <Checkbox.Indicator>
                  <CheckSVG />
                </Checkbox.Indicator>
              </Checkbox.Root>
              {visibility ? (
                <Label.Root className={form.checkboxlabel}>public</Label.Root>
              ) : (
                <Label.Root className={form.checkboxlabel}>private</Label.Root>
              )}
            </div>
            <Label.Root>
              <button
                onClick={() => {
                  handleSubmit;
                }}
                className={form.submit}
                tabIndex={0}
              >
                save & close
                <span style={{ paddingLeft: 4 }}>
                  <AccessibleIcon.Root label="save">
                    <CheckSVG />
                  </AccessibleIcon.Root>
                </span>
              </button>
            </Label.Root>
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
        </Dialog>
      </React.Suspense>
      <div id="portal" />
    </>
  );
}
