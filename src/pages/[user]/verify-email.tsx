import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useGetUser } from "hooks/user/getUser";
import Separator from "ui/radix-ui/separator";

const MotionDiv = dynamic(() => import("ui/framer-motion/div"), {
  suspense: true,
});

import styles from "styles/main.module.scss";
import css from "../index.module.scss";

export default function Event() {
  const { data: user, isLoading, isError } = useGetUser();
  const { push } = useRouter();

  if (isLoading) return <></>;

  if (user.emailVerified || isError) {
    setTimeout(() => {
      push("/");
    }, 1000);
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
