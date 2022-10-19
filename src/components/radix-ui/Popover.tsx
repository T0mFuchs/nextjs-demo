import * as P from "@radix-ui/react-popover"
import styled from "@emotion/styled"

const StyledContent = styled(P.Content)`
  box-shadow: #32325d40 0px 13px 27px -5px, #0000004d 0px 8px 16px -8px;
  color: inherit;
  background-color: inherit;
  padding-bottom: 0.3rem;
`

export function ContentTop({ children }: { children: React.ReactNode }) {
  return (
    <>
      <StyledContent side="top">{children}</StyledContent>
    </>
  )
}

export const Popover = styled(P.Root)``

export const PopoverTrigger = styled(P.Trigger)`
  border: none;
  background-color: inherit;
  color: inherit;
  :hover {
    color: #377dff;
  }
`

export const PopoverContentTop = ContentTop

// optional components

export const PopoverClose = styled(P.Close)`
  border: none;
  background-color: inherit;
  color: inherit;
`

export const PopoverArrow = styled(P.Arrow)`
  fill: #f9f4da;
`
