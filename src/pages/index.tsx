import { GetStaticProps } from "next";
import Head from "next/head";
import styles from "../styles/styles.module.css";

export const getStaticProps: GetStaticProps = async () => {
  const url = process.env.NEXTAUTH_URL;
  return {
    props: { url },
  };
};

export default function Page({ url }: { url: string }) {
  return (
    <>
      <Head>
        <title>index.tsx</title>
      </Head>
      <>
        <h2
          className={styles.H2}
          style={{ padding: `2em 0`, fontSize: `2em` }}
        >
          {url}
        </h2>
      </>
    </>
  );
}
