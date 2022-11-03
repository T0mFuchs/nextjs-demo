import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import styles from "../styles/styles.module.css";

const SignInNotification = dynamic(
  () => import("../components/SignInNotification"),
  {
    suspense: true,
  }
);

export default function Home() {
  const { data: session } = useSession();
  return (
    <>
      {session ? (
        <Suspense fallback={<></>}>
          <SignInNotification />
        </Suspense>
      ) : (
        <></>
      )}
      <h2 style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
        empty home page
      </h2>
      <div
        style={{
          display: "grid",
          gap: "2.5rem",
          margin: "0 auto",
          width: "90%",
        }}
      >
        <div
          className={styles.Card}
          style={{ gridRow: "1", gridColumn: "1" }}
        ></div>
        <div className={styles.Card} style={{ gridRow: "1", gridColumn: "2" }}>
          `````````````````````````` ``````````````````````````
          ``````````````````````````
        </div>
        <div
          className={styles.Card}
          style={{ gridRow: "2", gridColumn: "1" }}
        ></div>
        <div
          className={styles.Card}
          style={{ gridRow: "2", gridColumn: "2" }}
        ></div>
      </div>
    </>
  );
}
