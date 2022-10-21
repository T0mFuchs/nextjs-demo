import { Icon } from "@iconify/react";
import styled from "@emotion/styled";
import Link from "next/link";
import { css } from "@emotion/react";

export const Styled = styled.a`
  padding-right: .5rem;
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

export function StyledHeader() {
  return (
    <>
      <Link href="/"><Styled>Home</Styled></Link>
      <Link href="/posts"><Styled>Posts</Styled></Link>
      <Link href="/about"><Styled>About</Styled></Link>
    </>
  )
}
