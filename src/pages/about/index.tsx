import { css } from "@emotion/react"
import { Icon } from "@iconify/react"
import Link from "next/link"
import ky from "ky-universal"

export async function getServerSideProps() {
  const jsonNext = await ky
    .get("https://api.github.com/repos/vercel/next.js")
    .json()
  const jsonMikroOrm = await ky
    .get("https://api.github.com/repos/mikro-orm/mikro-orm")
    .json()

  return { props: { jsonNext, jsonMikroOrm } }
}

function About({
  jsonNext,
  jsonMikroOrm,
}: {
  jsonNext: any
  jsonMikroOrm: any
}) {
  return (
    <>
      <h2>/about</h2>
      <div>
        <p>core packages</p>
        <div>{`>>`}</div>
        <ul
          css={css`
            margin: 0;
          `}
        >
          <li>
            <Link href="https://nextjs.org">nextjs</Link>
            {`  `}
            <Icon icon="fa:github" />
            {`  `}
            <Icon icon="fluent-emoji:star" />
            {`  `}
            <span>{JSON.stringify(jsonNext.stargazers_count)}</span>
          </li>
          <li>
            <Link href="https://mikro-orm.io">mikro-orm</Link>
            {`  `}
            <Icon icon="fa:github" />
            {`  `}
            <Icon icon="fluent-emoji:star" />
            {`  `}
            <span>{JSON.stringify(jsonMikroOrm.stargazers_count)}</span>
          </li>
        </ul>
      </div>
    </>
  )
}

export default About
