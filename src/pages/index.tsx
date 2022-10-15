import Link from "next/link"
import { css } from "@emotion/react"

export async function getServerSideProps(){
  const baseUrl = process.env.BASE_URL
  return { props: { baseUrl } }
}

function Home({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <h2>pages/index</h2>
      <div></div>
    </>
  )
}

export default Home
