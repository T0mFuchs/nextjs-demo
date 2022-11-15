import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { ReadPost } from "../../components/post/ReadPost";
import { UpdatePost } from "../../components/post/UpdatePost";
import { DeletePost } from "../../components/post/DeletePost";

import styles from "../../styles/styles.module.css";

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
        className={styles.Blob}
        style={{
          borderRadius: `50% 50% 50% 50% / 45% 45% 55% 55%`,
          background: `var(--blob)`,
          height: `75vh`,
          width: `150vw`,
          position: `fixed`,
          top: `-50vh`,
          left: `-75vw`,
          zIndex: -2,
        }}
      />
      <div style={{ padding: `4rem 0 1rem 0` }}>
        <Link
          className={styles.H2}
          href={{ pathname: "/api/post/[title]", query: { title: title } }}
        >
          /api/post/[title]
        </Link>
      </div>
      <div style={{ padding: `0 2rem` }}>
        <ReadPost title={title} />
        <div style={{ padding: `.5rem 0` }}>
          {session ? (
            <>
              <DeletePost title={title} />
              <span style={{ padding: `0 .2rem` }} />
              <UpdatePost title={title} />
            </>
          ) : (
            <>
              <div>your currently not signed in</div>
              <div style={{ padding: `.5rem 0` }}>
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
        className={styles.Blob}
        style={{
          borderRadius: `50% 50% 50% 50% / 45% 45% 55% 55%`,
          background: `var(--blob)`,
          height: `75vh`,
          width: `150vw`,
          position: `fixed`,
          bottom: `-55vh`,
          right: `-110vw`,
          zIndex: -2,
        }}
      />
    </>
  );
}
