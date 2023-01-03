import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useGetUser } from "hooks/user/getUser";
import Separator from "ui/radix-ui/separator";

import styles from "styles/main.module.scss";
import css from "../index.module.scss";

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});

export default function Event() {
  const { data: user, isLoading, isError } = useGetUser();
  const { push } = useRouter();

  if (isLoading) return <></>;
  if (isError) {
    setTimeout(() => push("/"), 1000);
    return (
      <>
        <Head>
          <title>redirecting...</title>
        </Head>
        <React.Suspense>
          <MotionDiv
            className={css.ToastBar}
            style={{ position: "fixed", top: "45%" }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 1 }}
          />
        </React.Suspense>
      </>
    );
  }
  if (user && user.emailVerified !== true) {
    return (
      <>
        <Head>
          <title>Welcome {user.name}</title>
        </Head>
        <div
          style={{
            paddingTop: "7em",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ padding: ".3em" }}>🥳 Welcome {user.name}</p>
          <Separator
            style={{ maxWidth: "90%", margin: "auto" }}
            orientation="horizontal"
          />
          <div style={{ padding: ".8em" }} />
          <button
            className={styles.Button}
            onClick={async () => {
              console.log(user._id);
              await fetch(`/api/${user._id}/nodemailer/new-user`, {
                body: JSON.stringify({
                  email: user.email,
                  name: user.name,
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
            get verification email
          </button>
        </div>
      </>
    );
  } else {
    setTimeout(() => push("/"), 1500);
    return (
      <>
        <Head>
          <title>redirecting...</title>
        </Head>
        <React.Suspense>
          <MotionDiv
            className={css.ToastBar}
            style={{ position: "fixed", top: "45%" }}
            initial={{ scaleX: 1 }}
            animate={{ scaleX: 0 }}
            transition={{ duration: 1.5 }}
          />
        </React.Suspense>
      </>
    );
  }
}
