import { Icon } from "@iconify/react";
import styled from "@emotion/styled";

export * from "./StyledHeader";

export const Spacer = styled.div`
  line-height: 2rem;
  padding: 1rem;
`;

export const Spinner = () => (
  <Spacer>
    <Icon icon="line-md:loading-loop" fontSize={50} />
  </Spacer>
);
