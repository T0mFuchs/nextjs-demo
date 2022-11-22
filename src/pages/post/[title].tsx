import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReadPost } from "../../components/post/ReadPost";

import styles from "../../styles/styles.module.css";
import css from "./post.module.css";

const UpdatePost = dynamic(() => import("../../components/post/UpdatePost"), {
  suspense: true,
});
const DeletePost = dynamic(() => import("../../components/post/DeletePost"), {
  suspense: true,
});

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { title }: any = context.params;
  return { props: { title } };
};

export default function Page({ title }: { title: string }) {
  const { data: session } = useSession();
  const { push, asPath } = useRouter();
  const handleSignIn = () => {
    push(`/auth/signin?callbackUrl=${asPath}`);
  };
  return (
    <>
      <Head>
        <title>post/{title}</title>
      </Head>
      <div
        className={`${styles.Blob} ${css.blob1} ${css.blob}`}
      />
      <div style={{ padding: `4em 0 1em 0` }}>
        <Link
          className={styles.H2}
          href={{ pathname: "/api/post/[title]", query: { title: title } }}
        >
          /api/post/[title]
        </Link>
      </div>
      <div style={{ padding: `0 2em` }}>
        <ReadPost title={title} />
        <div style={{ padding: `1em 0` }}>
          {session ? (
            <Suspense fallback={<></>}>
              <DeletePost title={title} />
              <span style={{ padding: `0 .5em` }} />
              <UpdatePost title={title} />
            </Suspense>
          ) : (
            <>
              <div>your currently not signed in</div>
              <div style={{ padding: `.5em 0` }}>
                to edit or delete posts you need to be signed in
              </div>
              <button
                onClick={() => {
                  handleSignIn();
                }}
                className={styles.Button}
              >
                sign in
              </button>
            </>
          )}
        </div>
      </div>
      <div
        className={`${styles.Blob} ${css.blob2} ${css.blob}`}
      />
    </>
  );
}
