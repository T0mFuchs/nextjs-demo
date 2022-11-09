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
            title="nav-menu"
            placeholder="nav-menu"
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
                <div style={{ position: "relative", left: "-.5em" }}>
                  <AccountSVG />
                  {` `}OAuth
                </div>
              </li>
            </Link>
            <a href="https://github.com/T0mFuchs/nextssr">
              <li>
                <div style={{ position: "relative", left: "-.3em" }}>
                  <GithubSVG />
                  {` `}Github
                </div>
              </li>
            </a>
            <div className="spacer" style={{ paddingTop: "40rem" }}></div>
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
      width="1.8rem"
      height="2.05rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <g clipPath="url(#svgIDa)">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z"
            clipRule="evenodd"
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

function AccountSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.125em" }}
      height="2.2rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <rect x="0" y="0" width="24" height="24" fill="none" stroke="none" />
      <path
        fill="currentColor"
        d="M5.85 17.1q1.275-.975 2.85-1.538Q10.275 15 12 15q1.725 0 3.3.562q1.575.563 2.85 1.538q.875-1.025 1.363-2.325Q20 13.475 20 12q0-3.325-2.337-5.663Q15.325 4 12 4T6.338 6.337Q4 8.675 4 12q0 1.475.488 2.775q.487 1.3 1.362 2.325ZM12 13q-1.475 0-2.488-1.012Q8.5 10.975 8.5 9.5t1.012-2.488Q10.525 6 12 6t2.488 1.012Q15.5 8.025 15.5 9.5t-1.012 2.488Q13.475 13 12 13Zm0 9q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z"
      />
    </svg>
  );
}
