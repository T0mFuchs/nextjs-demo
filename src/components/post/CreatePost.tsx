import React from "react";
import Link from "next/link";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../../components/radix-ui/AlertDialog";
import { Toast, ToastAction } from "../radix-ui/Toast";
import { CrossSVG } from "..";

import styles from "../../styles/styles.module.css";

export default function CreatePost() {
  const [open, setOpen] = React.useState(false);
  const [dispatch, setDispatch] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      // @ts-ignore
      title: form.title.value as string,
      body: form.body.value as string,
    };
    await fetch("/api/post/create", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    setOpen(false);
    setDispatch(true);
    setTitle(data.title);
  };
  return (
    <div>
      {dispatch ? (
        <Toast>
          <div style={{ fontSize: ".7rem ", color: "var(--grey)" }}>
            successfully created new post
          </div>
          <div style={{ padding: ".2rem 0" }}>
            <Link
              className={styles.Link}
              href={{ pathname: "/post/[title]", query: { title: title } }}
            >
              {title}
            </Link>
          </div>
          <ToastAction altText="dismiss">swipe right to dismiss</ToastAction>
        </Toast>
      ) : (
        <></>
      )}
      <AlertDialogRoot open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          {!open ? (
            <button>create post</button>
          ) : (
            <button>creating post ...</button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          <legend style={{ position: "absolute", top: "-1.4rem", left: 0 }}>
            new Post
          </legend>
          <form
            style={{
              all: "unset",
              display: "flex",
              padding: ".2rem 0",
              flexDirection: "column",
            }}
            onSubmit={handleSubmit}
          >
            <label htmlFor="title" />
            <input
              style={{ fontSize: "1.3rem", fontWeight: 900, border: 0 }}
              className={styles.Input}
              name="title"
              type="text"
              placeholder="...title"
              required
              minLength={2}
              maxLength={20}
              pattern="^[^\s]+(\s+[^\s]+)*$" // regex for disallowing whitespaces https://regexr.com/
            />
            <label style={{ padding: ".05rem 0" }} htmlFor="body" />
            <input
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                lineHeight: "1.7rem",
                border: 0,
              }}
              className={styles.Input}
              name="body"
              type="text"
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
                bottom: "-1.4rem",
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
              right: "-.8rem",
              top: "-.8rem",
              color: "var(--color-secondary)",
            }}
            onClick={() => {
              setOpen(false);
            }}
          >
            <CrossSVG />
          </button>
        </AlertDialogContent>
      </AlertDialogRoot>
    </div>
  );
}
