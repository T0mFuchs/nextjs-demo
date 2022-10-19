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
  DialogAccordion,
  FreezeInteraction,
  PopoverTabs,
} from "../components";

export async function getServerSideProps() {
  const url = process.env.BASE_URL;
  return { props: { url } };
}

function Home({ url }: { url: string }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <h2
        css={css`
          font-size: 1.33rem;
          font-weight: 900;
        `}
      >
        {`${url}/`}
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
              <ToastDescription>`toast`</ToastDescription>
              <ToastAction altText="undo toast">
                <Icon icon="line-md:close" color="#d24e59" fontSize={20} />
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

export default Home;
