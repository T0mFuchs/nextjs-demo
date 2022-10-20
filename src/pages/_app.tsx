import React, { createContext, useContext, useState, useEffect } from "react";
import { SidebarContent, Spacer } from "../components";
import type { AppProps } from "next/app";
import { Icon } from "@iconify/react";
import { css } from "@emotion/react";
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
  const [theme, setTheme] = useState("dark");
  const [icon, setIcon] = useState(
    <Icon
      icon="line-md:moon-filled-alt-loop"
      fontSize={38}
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
              <Sidebar>
                <SidebarContent />
                <Spacer
                  css={css`
                    padding-top: 66rem;
                  `}
                />
              </Sidebar>
              <Content>
                time elapsed: <TimeElapsed />
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

const themeContext = createContext({
  theme: "",
  setTheme: (theme: string) => {},
});

const themeIconContext = createContext({
  icon: <></>,
  setIcon: (icon: React.ReactElement) => {},
});

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 0.25fr 0.75fr;
        text-align: center;
        height: 100vh;
      `}
    >
      {children}
    </div>
  );
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="scrollable"
      css={css`
        padding: 0.25rem;
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

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="scrollable"
      css={css`
        border-left: 1px solid #3c3c3c;
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

function ThemeSwitch() {
  const { theme, setTheme } = useContext(themeContext);
  const { icon, setIcon } = useContext(themeIconContext);

  return (
    <div
      css={css`
        top: -0.2rem;
        right: -0.4rem;
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
                fontSize={38}
                color="#ffce31"
                aria-hidden
              />
            );
          } else {
            setTheme("dark");
            setIcon(
              <Icon
                icon="line-md:moon-filled-alt-loop"
                fontSize={38}
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

function TimeElapsed() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timeout = setInterval(() => {
      setCount((c) => c + 1);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return <>{count}</>;
}
