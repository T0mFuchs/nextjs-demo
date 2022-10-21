import { Icon } from "@iconify/react";
import styled from "@emotion/styled";

export * from "./Layout";

export const Spacer = styled.div`
  line-height: 2rem;
  padding: 1rem;
`;

export const Spinner = () => (
  <div>
    <Icon icon="line-md:loading-loop" fontSize={50} />
  </div>
);
