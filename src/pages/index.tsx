import React from "react";
import { Icon } from "@iconify/react";
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
                swipe right
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
