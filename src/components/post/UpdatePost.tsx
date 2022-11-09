import React from "react";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../../components/radix-ui/AlertDialog";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "..";

import styles from "../../styles/styles.module.css";

export function UpdatePost({ title }: { title: string }) {
  const [dialog, setDialog] = React.useState(false);
  const [post, setPost]: any = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    setLoading(true);
    fetch(`/api/post/${title}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((post) => {
        setPost(post);
        setLoading(false);
      });
  }, [title]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      id: post.id,
      // @ts-ignore
      title: form.title.value as string,
      body: form.body.value as string,
    };
    const response = await fetch("/api/post/update", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
    setDialog(false);
    router.push(`/post/${data.title}`);
  };

  return (
    <>
      <AlertDialogRoot open={dialog} onOpenChange={setDialog}>
        <AlertDialogTrigger>
          {!dialog ? (
            <button>edit post</button>
          ) : (
            <button>editting post ...</button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          {loading ? (
            <></>
          ) : (
            <>
              <legend style={{ position: "absolute", top: "-1.4rem", left: 0 }}>
                Post: {post?.title}
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
                  defaultValue={post?.title}
                  required
                  minLength={2}
                  maxLength={20}
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
                  defaultValue={post?.body}
                  required
                  minLength={5}
                />
                <button
                  name="save changes"
                  onClick={() => {
                    handleSubmit;
                  }}
                  style={{
                    all: "unset",
                    position: "absolute",
                    right: 0,
                    bottom: "-1.4rem",
                  }}
                  type="submit"
                >
                  <span style={{ color: `#70deaf` }}>
                    <CheckSVG />
                  </span>
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
                  setDialog(false);
                }}
              >
                <CrossSVG />
              </button>
            </>
          )}
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
}
