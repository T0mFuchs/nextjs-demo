import Head from "next/head";
import Separator from "components/radix-ui/Separator";

export default function Custom500() {
  return (
    <>
      <Head>
        <title>server error</title>
      </Head>
      <div style={{ paddingTop: "1em", margin: "0 auto" }}>
        <h1>500</h1>
        <div style={{ padding: "2em" }}>
          <Separator style={{ maxWidth: 200, margin: "0 auto" }} />
        </div>
        <h2>Server-side error occurred</h2>
      </div>
    </>
  );
}
