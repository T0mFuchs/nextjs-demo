import React from "react";
import type { AppProps } from "next/app";
import { NavMenu, HeaderContent } from "../components";
import "../styles/global.sass";

function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header>
        <NavMenu />
        <HeaderContent />
      </Header>
      <Content>
        <Component {...pageProps} />
      </Content>
    </Layout>
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
