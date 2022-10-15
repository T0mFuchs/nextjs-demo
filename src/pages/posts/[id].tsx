import ky from "ky-universal"
import Link from "next/link"
import { css } from "@emotion/react"

export async function getServerSideProps(req: any) {
  const { id } = req.query.id
  const baseUrl = process.env.BASE_URL
  const post = await ky.get(`${baseUrl}/api/posts/${id}`).json()
  return { props: { post } }
}

export default function Index({ post }: { post: any }) {
  return (
    <>
      <div
        className="posts"
        css={css`
          padding: 1rem;
        `}
      >
        <h2>{post.title} from api/posts/{post.id}</h2>
        <p>{post.body}</p>
        <text>{post.id}</text>
      </div>
    </>
  )
}
