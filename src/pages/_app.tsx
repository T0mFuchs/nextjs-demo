import React, { createContext, useContext, useState, useEffect } from "react"
import Link from "next/link"
import { Icon } from "@iconify/react"
import { css } from "@emotion/react"

import "../styles/global.css"
import type { AppProps } from "next/app"

function App({ Component, pageProps }: AppProps) {
  return (<PageShell><Component {...pageProps} /></PageShell>)
}


export default App


function PageShell({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState("dark")
  const [icon, setIcon] = useState(
    <Icon icon="emojione-v1:crescent-moon" fontSize={40} />
  )
  return (
    <React.StrictMode>
      <themeContext.Provider value={{ theme, setTheme }}>
        <themeIconContext.Provider value={{ icon, setIcon }}>
          <div className={`theme-${theme}`}>
            <Layout>
              <Sidebar>
                <div css={css`padding-top: .5rem; padding-bottom: .25rem;`}>
                  <Icon icon="logos:nextjs" fontSize={20}/>
                </div>
                <SidebarContent />
              </Sidebar>
              <Content>
                <div css={css`color: grey; font-size: .8rem;`}>
                  time elapsed: <TimeElapsed />
                </div>
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
        display: flex;
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
        padding: 0.67rem;
        padding-top: 1rem;
        padding-right: 0.75rem;
        flex-shrink: 0;
        display: flex;
        flex: 15%;
        flex-direction: column;
        align-items: center;
        line-height: 2rem;
      `}
    >
      {children}
    </div>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  return (
    <div
      css={css`
        flex: 85%;
        padding: 0.5rem;
        padding-left: 1rem;
        border-left: 0.05rem solid rgba(60, 60, 60, 1);
        min-height: 100vh;
      `}
    >
      {children}
    </div>
  )
}

function ThemeSwitch() {
  const { theme, setTheme } = useContext(themeContext)
  const { icon, setIcon } = useContext(themeIconContext)

  return (
    <div
      css={css`
        position: fixed;
        top: 0.5rem;
        right: 0.7rem;
      `}
    >
      <button
        type="button"
        className="themeIcon"
        onClick={() => {
          if (theme === "dark") {
            setTheme("light")
            setIcon(<Icon icon="emojione:sun" fontSize={40} />)
          } else {
            setTheme("dark")
            setIcon(<Icon icon="emojione-v1:crescent-moon" fontSize={40} />)
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

function SidebarContent() {
  return (
    <>
      <Link href="/">
        <a className="sidebarLink">home</a>
      </Link>
      <Link href="/about">
        <a className="sidebarLink">/about</a>
      </Link>
      <Link href="/posts">
        <a className="sidebarLink">/posts</a>
      </Link>
      <a
        css={css`
          position: fixed;
          bottom: 2.25rem;
        `}
        className="sidebarLink"
        href="https://github.com/T0mFuchs/next.custom"
      >
        <div
          css={css`
            position: fixed;
            left: 0.15rem;
          `}
        >
          <Icon icon="line-md:github-loop" fontSize={30} />
        </div>
        <text
          css={css`
            position: fixed;
            left: 2.05rem;
          `}
        >
          repo
        </text>
      </a>
    </>
  )
}
