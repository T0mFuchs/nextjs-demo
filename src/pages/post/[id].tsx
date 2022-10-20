import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ky from "ky-universal";
import { css } from "@emotion/react";
import Link from "next/link";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.params;
  console.log("context.params ", id);
  const baseUrl = process.env.BASE_URL;
  const post = await ky.get(`${baseUrl}/api/post/${id}`).json();
  return { props: { post, baseUrl } };
};

export default function Index({ post }: { post: any }) {
  return (
    <>
      <div
        css={css`
          padding: 0.5rem;
          padding-top: 2rem;
        `}
      >
        <Link href={{ pathname: `/api/post/[id]`, query: { id: post.id } }}>
          <div
            css={css`
              font-size: 1.25rem;
              color: #377dff;
              font-weight: 900;
            `}
          >
            /api/post/[id]
          </div>
        </Link>
      </div>
      <div>
        <h3>{post.title}</h3>
        <p
          css={css`
            font-weight: 100;
            font-size: 1.1rem;
          `}
        >
          {post.body}
        </p>
        <span
          css={css`
            font-size: 0.6rem;
          `}
        >
          {post.id}
        </span>
      </div>
    </>
  );
}
