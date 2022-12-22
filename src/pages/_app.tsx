import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { StrictMode } from "react";
import { Nav, ScrollUp } from "ui/page";
import dynamic from "next/dynamic";
import "styles/globals.scss";

const ToastProvider = dynamic(() => import("ui/radix-ui/toast/provider"));
const ToastViewport = dynamic(() => import("ui/radix-ui/toast/viewport"));

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <StrictMode>
      <SessionProvider
        session={session}
        refetchInterval={5 * 60}
        refetchOnWindowFocus={true}
      >
        <ToastProvider swipeDirection="right" duration={6000}>
          <div className="layout">
            <Nav />
            <ScrollUp />
            <Component {...pageProps} />
          </div>
          <div className="shadow top" />
          <div className="shadow bottom" />
          <ToastViewport className="toast-viewport" />
        </ToastProvider>
      </SessionProvider>
    </StrictMode>
  );
}
