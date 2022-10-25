import { Icon } from "@iconify/react";
import { css } from "@emotion/react";
import Link from "next/link";
import React from "react";

function Styled({ children }: { children: React.ReactNode }) {
  return (
    <>
      <span
        css={css`
          padding-right: 0.5rem;
          font-size: 2.25rem;
          text-decoration: none;
          color: #377dff;
          :hover {
            text-decoration: underline !important;
            text-shadow: 0 0rem 4rem;
          }
          :active {
            color: #e0cf35;
          }
        `}
      >
        {children}
      </span>
    </>
  );
}

export function StyledHeader() {
  return (
    <>
      <a href="https://github.com/T0mFuchs/nextssr">
        <Styled>
          <Icon icon="line-md:github-loop" />
        </Styled>
      </a>
      <Link href="/posts">
        <Styled>
          <Icon icon="line-md:text-box" />
        </Styled>
      </Link>
      <Link href="/about">
        <Styled>
          <Icon icon="line-md:question-circle" />
        </Styled>
      </Link>
      <Link href="/">
        <Styled>
          <Icon icon="line-md:home-md" />
        </Styled>
      </Link>
    </>
  );
}
