import * as T from "@radix-ui/react-toast";
import styled from "@emotion/styled";

export const Toast = styled(T.Provider)``;

export const ToastRoot = styled(T.Root)``;

export const ToastTitle = styled(T.Title)`
  font-size: 0.6rem;
  color: grey;
`;
export const ToastDescription = styled(T.Description)`
  min-width: 11rem;
`;
export const ToastAction = styled(T.Action)`
  border: none;
  background-color: inherit;
  color: inherit;
`;
export const ToastViewport = styled(T.Viewport)`
  background-image: inherit;
  box-shadow: #32325d40 0px 13px 27px -5px, #0000004d 0px 8px 16px -8px;
  list-style: none;
  position: fixed;
  bottom: -0.5rem;
  right: 1rem;
  flex-direction: column;

  padding-right: 2rem;
  font-size: 1.25rem;
`;
