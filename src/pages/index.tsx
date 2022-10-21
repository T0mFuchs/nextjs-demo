import { css } from "@emotion/react";

export async function getServerSideProps() {
  const url = process.env.BASE_URL;
  return { props: { url } };
}

function Index({ url }: { url: string }) {
  return (
    <>
      <h2
        css={css`
          font-size: 1.33rem;
          text-shadow: 0 0 5rem;
        `}
      >
        {url}
      </h2>
      <div
        css={css`
          padding-top: 3rem;
        `}
      >
        index page
      </div>
    </>
  );
}

export default Index;
