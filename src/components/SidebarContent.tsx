import { Icon } from "@iconify/react"
import { css } from "@emotion/react"
import Link from "next/link"

export { SidebarContent }

function SidebarContent() {
  return (
    <>
      <div>
        <Link href="/">
          <a className="sidebarLink">
            <text>
              <Icon icon="line-md:home-simple" fontSize={17} /> home
            </text>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/about">
          <a className="sidebarLink">
            <text>
              <Icon icon="line-md:list" fontSize={17} /> /about
            </text>
          </a>
        </Link>
      </div>
      <div>
        <Link href="/posts">
          <a className="sidebarLink">
            <text>
              <Icon icon="line-md:text-box" fontSize={17} /> /posts
            </text>
          </a>
        </Link>
      </div>
      <a
        css={css`
          bottom: 2.25rem;
          position: fixed;
        `}
        className="sidebarLink"
        href="https://github.com/T0mFuchs/nextssr"
      >
        <div
          css={css`
            left: 0.15rem;
            position: fixed;
          `}
        >
          <Icon icon="line-md:github-loop" fontSize={30} />
        </div>
        <text
          css={css`
            left: 2.05rem;
            position: fixed;
          `}
        >
          repo
        </text>
      </a>
    </>
  )
}
