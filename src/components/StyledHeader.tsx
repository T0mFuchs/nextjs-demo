import { Icon } from "@iconify/react";
import styled from "@emotion/styled";
import Link from "next/link";

export const Styled = styled.span`
  padding-right: .5rem;
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
`;

export function StyledHeader() {
  return (
    <>
      <a href="https://github.com/T0mFuchs/nextssr"><Styled><Icon icon="line-md:github-loop" /></Styled></a>
      <Link href="/posts"><Styled><Icon icon="line-md:text-box" /></Styled></Link>
      <Link href="/about"><Styled><Icon icon="line-md:question" /></Styled></Link>
      <Link href="/"><Styled><Icon icon="line-md:home-md" /></Styled></Link>
    </>
  )
}
