import Head from "next/head";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>server error</title>
      </Head>
      <div style={{ paddingTop: "1em", margin: "0 auto" }}>
        <h1>500</h1>
        <h2>Server-side error occurred</h2>
      </div>
    </>
  );
}
