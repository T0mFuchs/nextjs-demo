import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import ReadEntry from "ui/entry/read";
import DeleteEntry from "ui/entry/delete";
import UpdateEntry from "ui/entry/update";

import css from "./index.module.scss";

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
        <title>/user/entry/{title}</title>
      </Head>
      <>
        <ReadEntry route={`/api/user/entry/${title}`} />
        <div aria-hidden style={{ paddingBottom: "1em" }} />
        <div className={css.inline} style={{ paddingTop: "1em" }}>
          <UpdateEntry defaultVisibility={false} route={`/api/user/entry/${title}`} />
        </div>
        <div className={css.inline} style={{ paddingLeft: ".9em" }}>
          <DeleteEntry route={`/api/user/entry/${title}`} />
        </div>
        <div aria-hidden style={{ padding: "1em" }} />
      </>
    </>
  );
}
