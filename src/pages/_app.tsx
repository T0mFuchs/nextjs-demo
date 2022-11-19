import { StrictMode, Suspense } from "react";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Nav from "../components/page/Nav";
import ScrollUp from "../components/page/ScrollUp";
import "../styles/globals.css";

const Background = dynamic(() => import("../components/page/Background"), {
  suspense: true,
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <StrictMode>
      <SessionProvider session={session}>
        <div className="Layout">
          <div className="box-shadow" />
          <Nav />
          <ScrollUp />
          <Component {...pageProps} />
          <Suspense>
            <Background n={100} />
          </Suspense>
        </div>
      </SessionProvider>
    </StrictMode>
  );
}
