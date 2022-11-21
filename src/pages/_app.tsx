import { StrictMode, Suspense } from "react";
import dynamic from "next/dynamic";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Nav from "../components/page/Nav";
import "../styles/globals.css";

const ScrollUp = dynamic(() => import("../components/page/ScrollUp"), { suspense: true });
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
          <Suspense>
            <ScrollUp />
          </Suspense>
          <Component {...pageProps} />
          <Suspense>
            <Background delay={500} />
          </Suspense>
        </div>
      </SessionProvider>
    </StrictMode>
  );
}
