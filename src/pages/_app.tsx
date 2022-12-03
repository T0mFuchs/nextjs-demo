import { StrictMode } from "react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Nav, ScrollUp } from "ui/page";
import "styles/globals.scss";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <StrictMode>
      <SessionProvider session={session}>
        <div className="layout">
          <Nav />
          <ScrollUp />
          <Component {...pageProps} />
        </div>
        <div className="shadow top" />
        <div className="shadow bottom" />
      </SessionProvider>
    </StrictMode>
  );
}
