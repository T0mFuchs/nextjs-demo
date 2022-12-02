import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import ReadEntry from "ui/entry/read";
import DeleteEntry from "ui/entry/delete";
import UpdateEntry from "ui/entry/update";
import Flicker from "ui/animated/flicker";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { title }: any = context.params;
  return { props: { title } };
};

export default function Page({ title }: { title: string }) {
  const { data: session, status } = useSession();
  if (status === "loading") return <></>;
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
            <div className={css.inline} style={{ paddingTop: "1em" }}>
              <UpdateEntry title={title} />
            </div>
            <div className={css.inline} style={{ paddingLeft: ".9em" }}>
              <DeleteEntry title={title} />
            </div>
          </>
        ) : (
          <>
            <div style={{ paddingBottom: "1em" }} />
            <div className={css.display}>
              <Flicker className={css.flicker} text="currently not signed in">
                currently not signed in
              </Flicker>
              <Link style={{ textDecoration: 0 }} href="/auth/signin">
                <Flicker
                  className={`${styles.Button} ${css.flicker} ${styles.Link}`}
                  text="sign in"
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
