import Link from "next/link"
import { css } from "@emotion/react"

export async function getServerSideProps() {
  const url = process.env.BASE_URL
  return { props: { url } }
}

function Home({ url }: { url: string }) {
  return (
    <>
      <h2>
        {"<h2>"} {`"/"`} {"</h2>"}
      </h2>
      <div>
        {"<div>"} {url} {"</div>"}
      </div>
    </>
  )
}

export default Home
