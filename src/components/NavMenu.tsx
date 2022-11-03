import Link from "next/link";
import { useState } from "react";
import { IconSVG, QuestionSVG } from "./HeaderContent";

export function NavMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav role="navigation">
        <div className="menuToggle" onMouseLeave={() => setOpen(false)}>
          <input
            type="checkbox"
            checked={open}
            onChange={() => setOpen(!open)}
          />
          <span></span>
          <span></span>
          <span></span>
          <ul className="menu">
            <Link href="/" prefetch={false}>
              <li>
                <IconSVG />
                {` `}
                Home
              </li>
            </Link>
            <Link href="/posts" prefetch={false}>
              <li>
                <div style={{ position: "relative", left: "-.3em" }}>
                  <PostsSVG />
                  Posts
                </div>
              </li>
            </Link>
            <Link href="/about" prefetch={false}>
              <li>
                <QuestionSVG />
                {` `}
                About
              </li>
            </Link>
            <Link href="/auth/session" prefetch={false}>
              <li>
                <div style={{ position: "relative", left: "-.15em" }}>
                  <AuthSVG />
                  {` `}OAuth
                </div>
              </li>
            </Link>
            <a href="https://github.com/T0mFuchs/">
              <li>
                <div style={{ position: "relative", left: "-.15em" }}>
                  <GithubSVG />
                  {` `}my Github
                </div>
              </li>
            </a>
            <div className="spacer" style={{ padding: "25rem" }}></div>
          </ul>
        </div>
      </nav>
    </>
  );
}

function GithubSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.115em" }}
      width="1em"
      height="2.05rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <g clip-path="url(#svgIDa)">
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
            clip-rule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="svgIDa">
            <path fill="#fff" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}

function AuthSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.115em" }}
      width="1em"
      height="2.05rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 16 16"
    >
      <g fill="currentColor">
        <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856a.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533c.12.057.218.095.293.118a.55.55 0 0 0 .101.025a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118c.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453a7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625a11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43A62.456 62.456 0 0 1 5.072.56z" />
        <path d="M9.5 6.5a1.5 1.5 0 0 1-1 1.415l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99a1.5 1.5 0 1 1 2-1.415z" />
      </g>
    </svg>
  );
}

function PostsSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.33em", paddingRight: ".2rem" }}
      height="2.3rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M3 9V5h4v4Zm5 0V5h13v4Zm0 5v-4h13v4Zm0 5v-4h13v4Zm-5 0v-4h4v4Zm0-5v-4h4v4Z"
      />
    </svg>
  );
}
