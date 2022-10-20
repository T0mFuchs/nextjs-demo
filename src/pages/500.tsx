import { css } from "@emotion/react";

export default function Custom500() {
  return (
    <div
      css={css`
        text-align: center;
      `}
    >
      <h1>500</h1>
      <hr />
      <h2>Server-side error occurred</h2>
    </div>
  );
}
