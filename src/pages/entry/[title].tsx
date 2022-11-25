import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { useSession } from "next-auth/react";
import Head from "next/head";
import ReadEntry from "../../components/entry/read";
import DeleteEntry from "../../components/entry/delete";
import UpdateEntry from "../../components/entry/update";

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
      <div style={{ padding: `0 2em` }}>
        <ReadEntry title={title} />

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
          <></>
        )}
      </div>
    </>
  );
}
