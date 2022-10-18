import * as D from "@radix-ui/react-dialog"
import styled from "@emotion/styled"

export const Dialog = styled(D.Root)``

export const DialogTrigger = styled(D.Trigger)`
  color: inherit;
  background-color: inherit;
  border: none;
`

export const DialogContent = styled(D.Content)`
  box-shadow: #32325d40 0px 13px 27px -5px, #0000004d 0px 8px 16px -8px;
  postion: fixed;
  top: 50%;
  left: 50%;
`

export const DialogClose = styled(D.Close)`
  color: #d24e59;
  background-color: inherit;
  border: none;
`
