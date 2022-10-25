import { Icon } from "@iconify/react";
import styled from "@emotion/styled";

export * from "./StyledHeader";

export const Spacer = styled.div`
  line-height: 2rem;
  padding: 1rem;
`;

const Center = styled.div`
  position: relative;
  padding-top: 9rem;
  font-size: 9rem;
`

export const Spinner = () => (
  <Center>
    <Icon icon="line-md:loading-loop" />
  </Center>
);
