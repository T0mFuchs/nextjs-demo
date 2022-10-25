import { Icon } from "@iconify/react";
import { css } from "@emotion/react";
import React from "react";

export * from "./StyledHeader";

export function Spacer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        css={css`
          line-height: 2rem;
          padding: 1rem;
        `}
      >
        {children}
      </div>
    </>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        css={css`
          position: relative;
          padding-top: 9rem;
          font-size: 9rem;
        `}
      >
        {children}
      </div>
    </>
  );
}

export const Spinner = () => (
  <Center>
    <Icon icon="line-md:loading-loop" />
  </Center>
);
