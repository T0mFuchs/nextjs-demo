import React, { createContext, useContext, useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { Icon } from "@iconify/react";
import { css } from "@emotion/react";
import "../styles/global.css";
import { StyledHeader } from "../components";

function App({ Component, pageProps }: AppProps) {
  return (
    <PageShell>
      <Component {...pageProps} />
    </PageShell>
  );
}

export default App;

function PageShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark");
  const [icon, setIcon] = useState(
    <Icon
      icon="line-md:moon-filled-alt-loop"
      fontSize={35}
      color="#fbf9e1"
      aria-hidden
    />
  );
  return (
    <React.StrictMode>
      <themeContext.Provider value={{ theme, setTheme }}>
        <themeIconContext.Provider value={{ icon, setIcon }}>
          <div className={`theme-${theme}`}>
            <Layout>
              <Header>
                <StyledHeader />
              </Header>
              <Content>
                <ThemeSwitch />
                {children}
              </Content>
            </Layout>
          </div>
        </themeIconContext.Provider>
      </themeContext.Provider>
    </React.StrictMode>
  );
}

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: .05fr .95fr;
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
      font-size: 1.33rem;
      font-weight: 900;
      text-align: right;
      `}
    >
      <>{children}</>
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

const themeContext = createContext({
  theme: "",
  setTheme: (theme: string) => {},
});

const themeIconContext = createContext({
  icon: <></>,
  setIcon: (icon: React.ReactElement) => {},
});

function ThemeSwitch() {
  const { theme, setTheme } = useContext(themeContext);
  const { icon, setIcon } = useContext(themeIconContext);

  return (
    <div
      css={css`
        top: -0.2rem;
        left: -0.3rem;
        position: fixed;
      `}
    >
      <button
        type="button"
        className="themeIcon"
        aria-label="theme switch icon"
        css={css`
          border: none;
          background-color: inherit;
        `}
        onClick={() => {
          if (theme === "dark") {
            setTheme("light");
            setIcon(
              <Icon
                icon="line-md:sunny-filled"
                fontSize={35}
                color="#ffce31"
                aria-hidden
              />
            );
          } else {
            setTheme("dark");
            setIcon(
              <Icon
                icon="line-md:moon-filled-alt-loop"
                fontSize={35}
                color="#fbf9e1"
                aria-hidden
              />
            );
          }
        }}
      >
        <div>{icon}</div>
      </button>
    </div>
  );
}
