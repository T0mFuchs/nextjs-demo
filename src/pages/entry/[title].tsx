import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import ReadEntry from "components/entry/read";
import DeleteEntry from "components/entry/delete";
import UpdateEntry from "components/entry/update";

import styles from "styles/main.module.scss";
import Flicker from "components/animated/Flicker";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { title }: any = context.params;
  return { props: { title } };
};

export default function Page({ title }: { title: string }) {
  const { data: session } = useSession();
  return (
    <>
      <Head>
        <title>post/{title}</title>
      </Head>
      <>
        <ReadEntry title={title} />
        <div style={{ paddingBottom: "1em" }} />
        {session ? (
          <>
            <div style={{ display: "inline-block", paddingTop: "1em" }}>
              <UpdateEntry title={title} />
            </div>
            <div style={{ display: "inline-block", paddingLeft: ".9em" }}>
              <DeleteEntry title={title} />
            </div>
          </>
        ) : (
          <>
            <div style={{ paddingBottom: "1em" }} />
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Flicker
                style={{ left: "50%", transform: "translate(-50%,-50%)" }}
                string="currently not signed in"
              >
                currently not signed in
              </Flicker>
              <Link style={{ textDecoration: 0 }} href="/auth/signin">
                <Flicker
                  className={styles.Button}
                  style={{
                    margin: "3em 0",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                  string="sign in"
                >
                  sign in
                </Flicker>
              </Link>
            </div>
          </>
        )}
      </>
    </>
  );
}
