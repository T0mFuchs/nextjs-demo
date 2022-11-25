import Head from "next/head";

export default function Error() {
  return (
    <>
      <Head>
        <title>error</title>
      </Head>
      <div style={{ paddingTop: "1em", margin: "0 auto" }}>
        <h1>Auth Error</h1>
        <h2>Something went wrong</h2>
      </div>
    </>
  );
}
