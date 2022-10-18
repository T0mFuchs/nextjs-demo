import React, { createContext, useContext, useState, useEffect } from "react"
import { SidebarContent } from "../components/SidebarContent"
import type { AppProps } from "next/app"
import { Icon } from "@iconify/react"
import { css } from "@emotion/react"
import "../styles/global.css"

function App({ Component, pageProps }: AppProps) {
  return (
    <PageShell>
      <Component {...pageProps} />
    </PageShell>
  )
}

export default App

function PageShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark")
  const [icon, setIcon] = useState(
    <Icon icon="line-md:moon-filled-alt-loop" fontSize={38} color="#fbf9e1" />
  )
  return (
    <React.StrictMode>
      <themeContext.Provider value={{ theme, setTheme }}>
        <themeIconContext.Provider value={{ icon, setIcon }}>
          <div className={`theme-${theme}`}>
            <Layout>
              <Sidebar>
                <div
                  css={css`
                    padding-top: 1rem;
                    padding-bottom: 0.5rem;
                  `}
                >
                  <Icon icon="file-icons:nextjs" fontSize={64} />
                </div>
                <SidebarContent />
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
  )
}

const themeContext = createContext({
  theme: "",
  setTheme: (theme: string) => {},
})

const themeIconContext = createContext({
  icon: <></>,
  setIcon: (icon: React.ReactElement) => {},
})

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: 0.25fr 0.75fr;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
        text-align: center;
        height: 100vh;
      `}
    >
      {children}
    </div>
  )
}

function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        padding: 0.25rem;
        overflow: hidden;
        overflow-y: scroll;
      `}
    >
      <>{children}</>
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        border-left: 1px solid #3c3c3c;
        overflow: hidden;
      `}
    >
      <>{children}</>
    </div>
  )
}

function ThemeSwitch() {
  const { theme, setTheme } = useContext(themeContext)
  const { icon, setIcon } = useContext(themeIconContext)

  return (
    <div
      css={css`
        top: 0.2rem;
        right: 0.3rem;
        position: fixed;
      `}
    >
      <button
        type="button"
        className="themeIcon"
        onClick={() => {
          if (theme === "dark") {
            setTheme("light")
            setIcon(
              <Icon icon="line-md:sunny-filled" fontSize={38} color="#ffce31" />
            )
          } else {
            setTheme("dark")
            setIcon(
              <Icon
                icon="line-md:moon-filled-alt-loop"
                fontSize={38}
                color="#fbf9e1"
              />
            )
          }
        }}
      >
        <div>{icon}</div>
      </button>
    </div>
  )
}

function TimeElapsed() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const timeout = setInterval(() => {
      setCount((c) => c + 1)
    }, 1000)
    return () => clearTimeout(timeout)
  }, [])

  return <>{count}</>
}
