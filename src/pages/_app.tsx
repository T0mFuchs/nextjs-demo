import React from "react";
import type { AppProps } from "next/app";
import { css } from "@emotion/react";
import { StyledHeader } from "../components";
import "../styles/global.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <PageShell>
      <Component {...pageProps} />
    </PageShell>
  );
}

export default App;

function PageShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = React.useState("dark");

  return (
    <React.StrictMode>
      <themeContext.Provider value={{ theme, setTheme }}>
        <div className={`theme-${theme}`}>
          <Layout>
            <Header>
              <StyledHeader />
            </Header>
            <Content>{children}</Content>
          </Layout>
        </div>
      </themeContext.Provider>
    </React.StrictMode>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: 0.05fr 0.95fr;
        text-align: center;
        height: 100vh;
      `}
    >
      {children}
    </div>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="header"
      css={css`
        padding-top: 0.25rem;
        text-align: right;
      `}
    >
      {children}
    </div>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="content"
      css={css`
        border-top: 1px solid #3c3c3c;
        scrollbar-width: none;
        overflow-y: scroll;
        overflow-x: hidden;
        overflow: auto;
      `}
    >
      <>{children}</>
    </div>
  );
}

const themeContext = React.createContext({
  theme: "",
  setTheme: (theme: string) => {},
});
