import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>look somewhere else</title>
      </Head>
      <div style={{ paddingTop: "1em", margin: "0 auto" }}>
        <h1>404</h1>
        <h2>Not Found</h2>
      </div>
    </>
  );
}
