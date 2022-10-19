import ky from "ky-universal";
import Link from "next/link";
import { css } from "@emotion/react";

export async function getServerSideProps() {
  const baseUrl = process.env.BASE_URL;
  const posts = await ky.get(`${baseUrl}/api/posts`).json();
  return { props: { posts } };
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
        <div
          css={css`
            font-size: 2rem;
            font-weight: 900;
          `}
        >
          posts from{" "}
          <Link href="/api/posts">
            <a
              css={css`
                color: #377dff;
              `}
            >
              /api/posts
            </a>
          </Link>
        </div>
        <div
          css={css`
            padding-top: 0.25rem;
            color: grey;
            font-size: 0.8rem;
          `}
        >
          querried with mikro-orm from mongodb free tier cluster
        </div>
        {posts.map((post: any) => (
          <div
            key={post.id}
            css={css`
              box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
                rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
            `}
          >
            <h3>
              <Link href={`/posts/${post.id}`}>
                <div
                  css={css`
                    color: #377dff;
                    text-decoration: underline;
                  `}
                >
                  {post.title}
                </div>
              </Link>
            </h3>
            <p>{post.body}</p>
            <span
              css={css`
                color: grey;
                font-size: 0.6rem;
              `}
            >
              _id: {post.id}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
