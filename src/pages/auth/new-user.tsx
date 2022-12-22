import Head from "next/head";
import { useRouter } from "next/router";
import { useGetUser } from "hooks/user/getUser";
import Separator from "ui/radix-ui/separator";

import styles from "styles/main.module.scss";

export default function Event() {
  const { data: user, isLoading, isError } = useGetUser();
  const { push } = useRouter();

  if (isLoading) return <></>;
  if (isError) {
    setTimeout(() => push("/"), 1000);
    return <h2 style={{ paddingTop: "6em" }}>🛑 unauthenticated ...</h2>;
  }
  if (!user.emailVerified) {
    return (
      <>
        <Head>
          <title>...redirecting</title>
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
        <Head>redirecting</Head>
        <div style={{ paddingTop: "7em" }}>redirecting...</div>
      </>
    );
  }
}
