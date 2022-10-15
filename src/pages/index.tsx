import Link from "next/link"

export async function getServerSideProps(){
  const baseUrl = process.env.BASE_URL
  return { props: { baseUrl } }
}

function Home({ baseUrl }: { baseUrl: string }) {
  return (
    <>
      <h2>{baseUrl}</h2>
      <p className="errorLink">
        <Link href={"/error"}>404 resets/reloads site & state</Link>
      </p>

    </>
  )
}

export default Home
