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
      <div style={{ padding: ".5rem", paddingTop: "2rem" }}>
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
      <div style={{ margin: `0 2rem` }}>
        <ReadPost title={title} />
        <DeletePost title={title} />
        <UpdatePost title={title} />
      </div>
    </>
  );
}
