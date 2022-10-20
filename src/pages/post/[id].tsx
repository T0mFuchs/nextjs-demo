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
      <p>dynamic from {"`/api/post/${id}`"}</p>
      <div
        
      >
        <h3>/api/posts/{post.id}</h3>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <span>{post.id}</span>
      </div>
    </>
  );
}
