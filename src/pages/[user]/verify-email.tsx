import React from "react";

import Head from "next/head";
import { useRouter } from "next/router";
import Separator from "ui/radix-ui/separator";
import Flicker from "ui/animated/flicker";

import styles from "styles/main.module.scss";
import { useGetUser } from "hooks/user/getUser";

// todo :: time progress bar like with toast in src/index.tsx

export default function Event() {
  const { data: user, isLoading, isError } = useGetUser();
  const { push } = useRouter();

  if (isLoading) return <></>;
  if (isError) {
    setTimeout(() => {
      push("/");
    }, 1000);
    return <h2 style={{ paddingTop: "6em" }}>🛑 unauthenticated ...</h2>;
  }
  if (user.emailVerified) {
    setTimeout(() => {
      push("/");
    }, 1000);
    return <h2 style={{ paddingTop: "6em" }}>email already verified ...</h2>;
  }
  if (user) {
    return (
      <>
        <Head>
          <title>Almost done</title>
        </Head>
        <div style={{ paddingTop: "7em" }}>
          <p style={{ padding: ".3em" }}>click the button to continue</p>
          <Separator
            style={{ maxWidth: "90%", margin: "auto" }}
            orientation="horizontal"
          />
          <p style={{ padding: "1em" }}>
            <button
              className={styles.Button}
              onClick={async () => {
                const res = await fetch(`/api/${user._id}/verify-email`, {
                  method: "POST",
                });
                if (res.status === 200) {
                  await fetch(
                    `/api/${user._id}/nodemailer/verification-success`,
                    {
                      body: JSON.stringify({
                        email: user.email,
                        name: user.name,
                      }),
                      headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                      },
                      method: "POST",
                    }
                  );
                  push("/");
                }
              }}
            >
              verify
            </button>
          </p>
        </div>
      </>
    );
  }
}
