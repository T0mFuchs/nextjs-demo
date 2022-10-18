import * as A from "@radix-ui/react-alert-dialog"
import styled from "@emotion/styled"

export const StyledOverlay = styled(A.Overlay)`
  position: fixed;
  inset: 0;
`

export const AlertDialog = styled(A.Root)``

export const AlertDialogTrigger = styled(A.Trigger)`
  border: none;
  background-color: inherit;
  color: inherit;
`

export const AlertDialogContent = styled(A.Content)`
  box-shadow: #32325d40 0px 13px 27px -5px, #0000004d 0px 8px 16px -8px;
  postion: fixed;
  top: 50%;
  left: 50%;
  max-wdith: 500px;

  padding: 1rem;
`

export const AlertDialogTitle = styled(A.Title)`
  font-size: 2rem;
`

export const AlertDialogDescription = styled(A.Description)`
  font-size: 1.5rem;
`

export const AlertDialogCancel = styled(A.Cancel)`
  border: none;
  background-color: inherit;
  color: #d24e59;
`

export const AlertDialogAction = styled(A.Action)`
  border: none;
  background-color: inherit;
  color: inherit;
`
