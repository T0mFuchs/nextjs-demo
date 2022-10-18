import ky from "ky-universal"
import { css } from "@emotion/react"
import { GetServerSideProps, GetServerSidePropsContext } from "next"

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params
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
        <h3>/api/posts/{post.id}</h3>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <span>{post.id}</span>
      </div>
    </>
  )
}
