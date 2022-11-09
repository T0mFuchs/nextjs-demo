import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { ReadPost } from "../../components/post/ReadPost";
import { UpdatePost } from "../../components/post/UpdatePost";
import { DeletePost } from "../../components/post/DeletePost";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { title }: any = context.params;
  return { props: { title } };
};

export default function Page({ title }: { title: string }) {
  return (
    <>
      <Head>
        <title>post/{title}</title>
      </Head>
      <div
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
          style={{
            textDecoration: "none",
            fontSize: "1.25rem",
            color: "#377dff",
            fontWeight: 900,
          }}
          href={{ pathname: "/api/post/[title]", query: { title: title } }}
        >
          /api/post/[title]
        </Link>
      </div>
      <div style={{ padding: `0 2rem` }}>
        <ReadPost title={title} />
        <div style={{ padding: `.5rem 0` }}>
          <DeletePost title={title} />
          <span style={{ padding: `0 .2rem` }} />
          <UpdatePost title={title} />
        </div>
      </div>
      <div
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
