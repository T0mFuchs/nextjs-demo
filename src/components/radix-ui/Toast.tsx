import * as T from "@radix-ui/react-toast"
import styled from "@emotion/styled"

export const Toast = styled(T.Provider)``
export const ToastRoot = styled(T.Root)``
export const ToastTitle = styled(T.Title)`
  font-size: 0.6rem;
  color: grey;
`
export const ToastDescription = styled(T.Description)``
export const ToastAction = styled(T.Action)`
  border: none;
  background-color: inherit;
  color: inherit;
`
export const ToastViewport = styled(T.Viewport)`
  list-style: none;
  position: fixed;
  bottom: 0;
  right: 0;
  flex-direction: column;
  padding: 1rem;
`
