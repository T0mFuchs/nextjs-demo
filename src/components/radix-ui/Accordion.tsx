import React from "react";
import * as A from "@radix-ui/react-accordion";
import { Icon } from "@iconify/react";
import styled from "@emotion/styled";

export const Accordion = styled(A.Root)`
  max-width: 50%;
  position: relative;
  left: 25%;
`;

export const AccordionItem = styled(A.Item)``;

export const StyledTrigger = styled(A.Trigger)`
  box-shadow: #00000030 0px 10px 20px, #0000003b 0px 6px 6px;
  border: none;
  background-color: inherit;
  color: inherit;
  &[data-state="closed"] {
    color: #323330;
  }
`;

export const StyledHeader = styled.div`
  padding: 0.5rem;
`;

export const StyledIcon = styled.span`
  padding-left: 0.5rem;
`;

export function AccordionTrigger({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <StyledHeader>
        <StyledTrigger {...props}>
          {children}
          <StyledIcon aria-hidden>
            <Icon icon="line-md:chevron-down" />
          </StyledIcon>
        </StyledTrigger>
      </StyledHeader>
    </>
  );
}

export const AccordionContent = styled(A.Content)`
  font-weight: 900;
  color: #377dff;
  background-color: inherit;
  box-shadow: #00000030 0px 10px 20px, #0000003b 0px 6px 6px;
  border-radius: 0.25rem;
`;
