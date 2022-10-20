import { Icon } from "@iconify/react";
import { css } from "@emotion/react";
import ky from "ky-universal";
import Link from "next/link";

export async function getServerSideProps() {
  const baseUrl = process.env.BASE_URL;
  const posts = await ky.get(`${baseUrl}/api/posts`).json();
  return { props: { posts } };
}

function Index({posts}: {posts: any}) {

  return (
    <>
      <h2>/test</h2>
      <div css={css`padding-bottom: 1rem;`}>
        <p css={css`color: grey; font-size: .8rem;`}>posts limit: 5</p>
        <div>
        <Icon
          icon="line-md:arrow-open-down"
          fontSize={35}
          css={css`
            padding-top: 1rem;
          `}
        />
        {posts.map((post: any) => (
          <div
            key={post.id}
            css={css`
              padding-bottom: 0.25rem;
              box-shadow: #00000030 0px 10px 20px, #0000003b 0px 6px 6px;
              border-radius: 0.5rem;
              position: relative;
              max-width: 75%;
              left: 12.5%;
            `}
          >
            <h3>
              <Link href={{ pathname: `/post/[id]`, query: { id: post.id } }}>
                <div
                  css={css`
                    color: #377dff;
                  `}
                >
                  {post.title}
                </div>
              </Link>
            </h3>
            <p
              css={css`
                box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px,
                  rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
                border-radius: 0.33rem;
                position: relative;
                max-width: 75%;
                left: 12.5%;
              `}
            >
              {post.body}
            </p>
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
      </div>
    </>
  );
}

export default Index;
