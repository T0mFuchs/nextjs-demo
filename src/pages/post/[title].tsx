import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import Link from "next/link";
import { ReadPost } from "../../components/ReadPost";
import { UpdatePost } from "../../components/UpdatePost";
import { DeletePost } from "../../components/DeletePost";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { title }: any = context.params;
  const baseUrl = process.env.NEXTAUTH_URL;
  return { props: { baseUrl, title } };
};

export default function Page({
  baseUrl,
  title,
}: {
  baseUrl: string;
  title: string;
}) {
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
        <ReadPost baseUrl={baseUrl} title={title} />
        <DeletePost baseUrl={baseUrl} title={title} />
        <UpdatePost baseUrl={baseUrl} title={title} />
      </div>
    </>
  );
}
