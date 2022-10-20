import React from "react";
import { css } from "@emotion/react";
import {
  Spacer,
  Toast,
  ToastAction,
  ToastDescription,
  ToastRoot,
  ToastTitle,
  ToastViewport,
} from "../components";
import {
  DialogAccordion,
  FreezeInteraction,
  PopoverTabs,
} from "../components/demo";

export async function getServerSideProps() {
  const url = process.env.BASE_URL;
  return { props: { url } };
}

function Index({ url }: { url: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <h2
        css={css`
          font-size: 1.33rem;
        `}
      >
        {url}
      </h2>
      <div
        css={css`
          padding-top: 5rem;
        `}
      >
        <Spacer>
          <PopoverTabs />
        </Spacer>
        <Spacer>
          <DialogAccordion />
        </Spacer>
        <Spacer>
          <Toast>
            <button
              onClick={() => setOpen(true)}
              css={css`
                border: none;
                background-color: inherit;
                color: inherit;
                :hover {
                  color: #377dff;
                }
              `}
            >
              ``toast trigger``
            </button>
            <ToastRoot open={open} onOpenChange={setOpen}>
              <ToastTitle>`` swipe right ``</ToastTitle>
              <ToastDescription>`` toast ``</ToastDescription>
              <ToastAction altText="undo toast">
                <div css={css`font-weight: 900; font-size: 1.25rem;`}>
                  <Countdown />
                </div>
              </ToastAction>
            </ToastRoot>
            <ToastViewport />
          </Toast>
        </Spacer>
        <Spacer>
          <FreezeInteraction />
        </Spacer>
        <Spacer
          css={css`
            padding-top: 70rem;
          `}
        />
      </div>
    </>
  );
}

export default Index;

function Countdown() {
  const [count, setCount] = React.useState(5);

  React.useEffect(() => {
    const timeout = setInterval(() => {
      setCount((c) => c - 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return <>{count}</>;
}
