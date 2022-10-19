import React from "react"
import * as A from "@radix-ui/react-accordion"
import { Icon } from "@iconify/react"
import styled from "@emotion/styled"

export const Accordion = styled(A.Root)`
  max-width: 50%;
  position: relative;
  left: 25%;
`

export const AccordionItem = styled(A.Item)``

export const StyledTrigger = styled(A.Trigger)`
  border: none;
  background-color: inherit;
  color: inherit;
`

export const StyledHeader = styled.div`
  padding: 0.5rem;
`

export const StyledIcon = styled.span`
  padding-left: 0.5rem;
`

export function AccordionTrigger({
  children,
  ...props
}: {
  children: React.ReactNode
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
  )
}

export const AccordionContent = styled(A.Content)`
  font-weight: 900;
  color: #377dff;
  background-color: #f9f4da;
  border-radius: 0.25rem;
`
