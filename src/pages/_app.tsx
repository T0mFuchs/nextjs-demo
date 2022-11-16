import { ReactNode, StrictMode, Suspense } from "react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NavMenu from "../components/page/NavMenu";
import HeaderContent from "../components/page/HeaderContent";
import ScrollUp from "../components/page/ScrollUp";
import "../styles/globals.css";



export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <StrictMode>
      <SessionProvider session={session}>
        <Suspense fallback={<></>}>
          <Layout>
            <Header>
              <NavMenu />
              <HeaderContent />
            </Header>
            <Page>
              <ScrollUp />
              <Component {...pageProps} />
            </Page>
          </Layout>
        </Suspense>
      </SessionProvider>
    </StrictMode>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="Layout">{children}</div>;
}

function Header({ children }: { children: ReactNode }) {
  return <div className="Header">{children}</div>;
}

function Page({ children }: { children: ReactNode }) {
  return <div className="Page">{children}</div>;
}
