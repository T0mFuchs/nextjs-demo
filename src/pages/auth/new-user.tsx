import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Separator from "ui/radix-ui/separator";
import Flicker from "ui/animated/flicker";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

export default function Event() {
  const { data: session, status } = useSession();
  const { push } = useRouter();

  if (status === "loading") return <></>;
  if (status === "unauthenticated") {
    setTimeout(() => {
      push("/");
    }, 1000);
    return <h2 style={{ paddingTop: "6em" }}>🛑 unauthenticated ...</h2>;
  }
  if (session) {
    setTimeout(async () => {
      await fetch("../api/nodemailer/new-user", {
        body: JSON.stringify({
          email: session.user?.email,
          name: session.user?.name,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method: "POST",
      });
      push("/");
    }, 10000);
    return (
      <>
        <Head>
          <title>redirecting...</title>
        </Head>
        <div style={{ paddingTop: "7em" }}>
          <p style={{ padding: ".3em" }}>🥳 Welcome {session.user?.name}</p>
          <Separator
            style={{ maxWidth: "90%", margin: "auto" }}
            orientation="horizontal"
          />
          <p style={{ padding: ".3em" }}>
            you now can create, update & delete entries
          </p>
          <Separator
            style={{ maxWidth: "90%", margin: "auto" }}
            orientation="horizontal"
          />
          <p style={{ padding: "1em" }} className={css.onhover}>
            <Flicker
              text="continue"
              style={{ left: "50%", transform: "translate(-50%, -50%)" }}
            >
              <button
                style={{ border: 0, background: "none" }}
                className={styles.Link}
                onClick={async () => {
                  await fetch("../api/nodemailer/new-user", {
                    body: JSON.stringify({
                      email: session.user?.email,
                      name: session.user?.name,
                    }),
                    headers: {
                      "Content-Type": "application/json",
                      Accept: "application/json",
                    },
                    method: "POST",
                  });
                  push("/");
                }}
              >
                continue
              </button>
            </Flicker>
          </p>
        </div>
      </>
    );
  }
}
