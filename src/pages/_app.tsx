import React from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { NavMenu, HeaderContent } from "../components";
import "../styles/global.sass";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Header>
          <NavMenu />
          <HeaderContent />
        </Header>
        <Content>
          <Component {...pageProps} />
        </Content>
      </Layout>
    </SessionProvider>
  );
}

export default App;

function Layout({ children }: { children: React.ReactNode }) {
  return <div className="Layout">{children}</div>;
}

function Header({ children }: { children: React.ReactNode }) {
  return <div className="Header">{children}</div>;
}

function Content({ children }: { children: React.ReactNode }) {
  return <div className="Content">{children}</div>;
}
