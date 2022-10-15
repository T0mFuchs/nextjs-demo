import { css } from "@emotion/react"

export default function Custom404() {
  return (
    <div
      css={css`
        text-align: center;
      `}
    >
      <h1>404</h1>
      <hr />
      <h2>Not Found {":("}</h2>
    </div>
  )
}
