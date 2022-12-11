import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";

import styles from "styles/main.module.scss";

export default function SignIn() {
  const { data: session } = useSession();
  const { push } = useRouter();

  if (session) {
    setTimeout(() => {
      push("/");
    }, 1500);
    return (
      <>
        <Head>
          <title>redirecting...</title>
        </Head>
        <h2 style={{ paddingTop: "6em" }}>
          signed in with {session.user?.email}
        </h2>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>3rd party signin</title>
      </Head>
      <h2 style={{ paddingTop: "6em" }}>
        <div style={{ paddingTop: "1em" }}>
          <button
            onClick={() => {
              signIn("github");
            }}
            className={styles.Button}
          >
            <GithubSVG /> sign in with Github
          </button>
        </div>
        <div style={{ paddingTop: "1em" }}>
          <button
            onClick={() => {
              signIn("google");
            }}
            className={styles.Button}
          >
            <GoogleSVG /> sign in with Google
          </button>
        </div>
      </h2>
    </>
  );
}

function GoogleSVG() {
  return (
    <svg
      style={{ position: "relative", top: ".15em", right: ".2em" }}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25.59"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 256 262"
    >
      <path
        fill="#4285F4"
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622l38.755 30.023l2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      />
      <path
        fill="#34A853"
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055c-34.523 0-63.824-22.773-74.269-54.25l-1.531.13l-40.298 31.187l-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      />
      <path
        fill="#FBBC05"
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82c0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      />
      <path
        fill="#EB4335"
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0C79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      />
    </svg>
  );
}

function GithubSVG() {
  return (
    <svg
      style={{ position: "relative", top: ".15rem", right: ".3rem" }}
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="25.48"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1536 1504"
    >
      <path
        fill="currentColor"
        d="M768 0q209 0 385.5 103T1433 382.5T1536 768q0 251-146.5 451.5T1011 1497q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142q57-6 102.5-18t94-39t81-66.5t53-105T1258 728q0-119-79-206q37-91-8-204q-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27T450 331.5T365 318q-45 113-8 204q-79 87-79 206q0 85 20.5 150T351 983t80.5 67t94 39t102.5 18q-39 36-49 103q-21 10-45 15t-57 5t-65.5-21.5T356 1146q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5t9 14t13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30t69.5 7t55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5T0 768q0-209 103-385.5T382.5 103T768 0zM291 1103q3-7-7-12q-10-3-13 2q-3 7 7 12q9 6 13-2zm31 34q7-5-2-16q-10-9-16-3q-7 5 2 16q10 10 16 3zm30 45q9-7 0-19q-8-13-17-6q-9 5 0 18t17 7zm42 42q8-8-4-19q-12-12-20-3q-9 8 4 19q12 12 20 3zm57 25q3-11-13-16q-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11q-16 0-16 11q0 13 17 11q16 0 16-11zm58-10q-2-11-18-9q-16 3-14 15t18 8t14-14z"
      />
    </svg>
  );
}
