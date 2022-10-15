import ky from "ky-universal"
import { css } from "@emotion/react"

export async function getServerSideProps() {
  const baseUrl = process.env.BASE_URL
  const posts = await ky.get(`${baseUrl}/api/posts`).json()
  return { props: { posts } }
}

export default function Index({ posts }: { posts: any }) {
  return (
    <>
      <div 
        className="posts"
        css={css`
            padding: 1rem;
        `}
      >
        <div css={css`font-size: 2rem; font-weight: 900;`}>posts from api/posts</div>
        {posts.map((post: any) => (
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div>{post.id}</div>
          </div>
        ))}
      </div>
    </>
  )
}
