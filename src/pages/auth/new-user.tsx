import Head from "next/head";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

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
      push("/");
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
    }, 2000);
    return (
      <>
        <Head>
          <title>👋 Hello</title>
        </Head>
        <h2 style={{ paddingTop: "6em" }}>
          🥳 Welcome {session.user?.name}
          <p style={{ paddingTop: "1.5em" }}>
            you now can create, update & delete entries
          </p>
        </h2>
      </>
    );
  }
}
