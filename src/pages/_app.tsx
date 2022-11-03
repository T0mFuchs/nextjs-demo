import { ReactNode } from "react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NavMenu, HeaderContent } from "../components";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Header>
          <NavMenu />
          <HeaderContent />
        </Header>
        <Page>
          <Component {...pageProps} />
        </Page>
      </Layout>
    </SessionProvider>
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
