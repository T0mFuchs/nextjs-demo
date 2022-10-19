import * as D from "@radix-ui/react-dialog";
import styled from "@emotion/styled";

export const Dialog = styled(D.Root)``;

export const DialogTrigger = styled(D.Trigger)`
  color: inherit;
  background-color: inherit;
  border: none;
  :hover {
    color: #377dff;
  }
`;

export const DialogContent = styled(D.Content)`
  box-shadow: #00000073 0px 25px 20px -20px;
  postion: fixed;
  top: 50%;
  left: 50%;
`;

export const DialogClose = styled(D.Close)`
  padding: 0.5rem;
  color: #d24e59;
  background-color: inherit;
  border: none;
`;
