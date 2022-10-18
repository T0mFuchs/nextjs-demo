import * as A from "@radix-ui/react-accordion"
import styled from "@emotion/styled"

export const Accordion = styled(A.Root)``

export const AccordionItem = styled(A.Item)``

export const AccordionTrigger = styled(A.Trigger)`
  border: none;
  background-color: inherit;
  color: inherit;
  text-decoration: underline;
`

export const AccordionContent = styled(A.Content)`
  font-weight: 900;
  color: #377dff;
  background-color: #f9f4da;
  border-radius: 0.25rem;
`
