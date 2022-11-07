import React from "react";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../components/radix-ui/AlertDialog";
import { CheckSVG, CrossSVG } from ".";

// todo :: trigger dialog on click (do you really want to delete this post?, with check and cross svg)
// todo :: redirect to /posts after delete

export function DeletePost({
  baseUrl,
  title,
}: {
  baseUrl: string;
  title: string;
}) {
  const [post, setPost]: any = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    fetch(`${baseUrl}/api/post/${title}`, { cache: "no-store" })
      .then((res) => res.json())
      .then((post) => {
        setPost(post);
        setLoading(false);
      });
  }, [baseUrl, title]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = { id: post.id, title: post.title };
    const response = await fetch("/api/post/delete", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  };

  return (
    <>
      {loading ? (
        <></>
      ) : (
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
            onClick={() => handleSubmit}
            style={{
              all: "unset",
              color: "var(--color-secondary)",
            }}
          >
            <CrossSVG />
          </button>
        </form>
      )}
    </>
  );
}
