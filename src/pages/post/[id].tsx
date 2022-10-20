import ky from "ky-universal";
import { css } from "@emotion/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }:any = context.params;
  console.log("context.params ", id)
  const baseUrl = process.env.BASE_URL;
  const post = await ky.get(`${baseUrl}/api/post/${id}`).json();
  return { props: { post } };
};

export default function Index({ post }: { post: any }) {
  return (
    <>
      <p>dynamic from {" ` /api/post/[id] ` "}</p>
      <div
        css={css`padding-top: .5rem;`}
      >
        <h3>{post.title}</h3>
        <p
          css={css`font-weight: 100; font-size: 1.1rem;`}
        >
          {post.body}
        </p>
        <span
          css={css`
            font-size: .6rem;
          `}
        >{post.id}
      </span>
      </div>
    </>
  );
}
