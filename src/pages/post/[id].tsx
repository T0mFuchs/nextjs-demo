import { GetServerSideProps, GetServerSidePropsContext } from "next";
import ky from "ky-universal";
import { css } from "@emotion/react";
import Link from "next/link";
import useSwr, { Fetcher } from "swr";
import React from "react";
import { Spinner } from "../../components";

const fetcher: Fetcher = (url: string) => ky.get(url).json();

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id }: any = context.params;
  const baseUrl = process.env.BASE_URL;
  return { props: { baseUrl, id } };
};

export default function Index({
  baseUrl,
  id,
}: {
  baseUrl: string;
  id: string;
}) {
  const { data }: any = useSwr(`${baseUrl}/api/post/${id}`, fetcher, {
    suspense: true,
  });
  return (
    <>
      <React.Suspense fallback={<Spinner />}>
        <div
          css={css`
            padding: 0.5rem;
            padding-top: 2rem;
          `}
        >
          <Link href={{ pathname: `/api/post/[id]`, query: { id: data.id } }}>
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
          <h3>{data.title}</h3>
          <p
            css={css`
              font-weight: 100;
              font-size: 1.1rem;
            `}
          >
            {data.body}
          </p>
          <span
            css={css`
              font-size: 0.6rem;
            `}
          >
            {data.id}
          </span>
        </div>
      </React.Suspense>
    </>
  );
}
