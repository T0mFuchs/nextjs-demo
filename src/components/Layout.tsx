import { Icon } from "@iconify/react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Link from "next/link";

export { SidebarContent };

const StyledA = styled.a`
  font-size: 1.25rem;
  font-weight: 900;
  line-height: 2rem;
  text-decoration: none;
  color: #377dff;
  :hover {
    text-decoration: underline !important;
    text-shadow: 0 0rem 4rem;
  }
  :active {
    color: #e0cf35;
  }
`;

function SidebarContent() {
  return (
    <>
      <div
        css={css`
          padding-top: 1rem;
          padding-bottom: 0.5rem;
        `}
      >
        <Icon icon="file-icons:nextjs" fontSize={64} />
      </div>
      <div className="sidebarLink">
        <Link href="/">
          <StyledA>
            <Icon icon="line-md:home-simple" fontSize={17} /> home
          </StyledA>
        </Link>
      </div>
      <div className="sidebarLink">
        <Link href="/test" prefetch={false}>
          <StyledA>
            <Icon icon="fluent-mdl2:test-beaker-solid" fontSize={16} /> /test
            <span
              css={css`
                padding-left: 0.5rem;
              `}
            />
          </StyledA>
        </Link>
      </div>
      <div className="sidebarLink">
        <Link href="/posts" prefetch={false}>
          <StyledA>
            <Icon icon="line-md:text-box" fontSize={17} /> /posts
          </StyledA>
        </Link>
      </div>
      <StyledA
        css={css`
          bottom: 2.25rem;
          position: fixed;
        `}
        className="sidebarLink"
        href="https://github.com/T0mFuchs/nextssr"
      >
        <div
          css={css`
            left: 0.15rem;
            position: fixed;
          `}
        >
          <Icon icon="line-md:github-loop" fontSize={30} />
        </div>
        <span
          css={css`
            left: 2.05rem;
            position: fixed;
          `}
        >
          repo
        </span>
      </StyledA>
    </>
  );
}