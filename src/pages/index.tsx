import { css } from "@emotion/react";
import { Spinner } from "../components";

function Index() {
  return (
    <>
      <div
        css={css`
          padding-top: 2rem;
        `}
      >
        placeholder
        <Spinner />
      </div>
    </>
  );
}

export default Index;
