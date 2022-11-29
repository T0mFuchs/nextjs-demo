import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import ReadEntry from "components/entry/read";
import DeleteEntry from "components/entry/delete";
import UpdateEntry from "components/entry/update";
import Flicker from "components/animated/Flicker";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

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
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Flicker className={css.flicker} string="currently not signed in">
                currently not signed in
              </Flicker>
              <Link style={{ textDecoration: 0 }} href="/auth/signin">
                <Flicker
                  className={`${styles.Button} ${css.flicker} ${styles.Link}`}
                  style={{
                    margin: "3em 0",
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
