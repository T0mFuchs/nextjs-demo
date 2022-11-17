import React from "react";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../radix-ui/AlertDialog";
import { useRouter } from "next/router";
import { CheckSVG, CrossSVG } from "..";

export function DeletePost({ title }: { title: string }) {
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
    const data = { id: post.id, title: post.title };
    await fetch("/api/post/delete", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
    setTimeout(() => {
      router.push(`/posts`);
    }, 1500);
    return (
      <>
        <h2 style={{ paddingTop: "6rem" }}>post deleted</h2>
        <hr />
        <h2>redirecting ...</h2>
      </>
    );
  };

  return (
    <>
      <AlertDialogRoot open={dialog} onOpenChange={setDialog}>
        <AlertDialogTrigger>
          {!dialog ? (
            <button>delete post</button>
          ) : (
            <button>confirming ...</button>
          )}
        </AlertDialogTrigger>
        <AlertDialogContent>
          {loading ? (
            <></>
          ) : (
            <>
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

export default DeletePost;
