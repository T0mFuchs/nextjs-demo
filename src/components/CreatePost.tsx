import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
} from "../components/radix-ui";
import React from "react";

export function CreatePost() {
  const [open, setOpen] = React.useState(false);
  
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = {
      // @ts-ignore
      title: form.title.value as string,
      body: form.body.value as string
    }
    const response = await fetch("/api/form/create-post", {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
    })
    setOpen(false);
    // todo :: toast with response & link to new post
  }
  return (
    <>
      <AlertDialogRoot open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger>
          {!open ? (<button>create post</button>): (<button>creating post ...</button>)}
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
           
            <label htmlFor="title"></label>
            <input
              style={{ fontSize: "1.3rem", fontWeight: 900, border: 0, }}
              name="title"
              type="text"
              placeholder="...title"
              required
              minLength={2}
              maxLength={20}
            />
            <label htmlFor="body"></label>
            <input
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                lineHeight: "1.7rem",
                border: 0,
              }}
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
              style={{ all: "unset", position: "absolute", right: 0, bottom: "-1.4rem", color: "#70deaf" }}
              type="submit"
            >
              save & close
            </button>
          </form>
          <button 
            style={{ all: "unset", position: "absolute", right: "-.8rem", top: "-.8rem", color: "var(--color-secondary)" }}
            onClick={() => {setOpen(false);}}
          >
            <CancelSVG />
          </button>
        </AlertDialogContent>
      </AlertDialogRoot>
    </>
  );
}

function CancelSVG() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: "-0.125em"}} width="2em" height="2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="m24.778 21.42l-5.502-5.503l5.5-5.502l-2.827-2.83l-5.503 5.502l-5.502-5.502l-2.828 2.83l5.5 5.502l-5.5 5.502l2.83 2.828l5.5-5.502l5.5 5.502z"/></svg>
  );
}
