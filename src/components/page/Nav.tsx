import Link from "next/link";

import styles from "./nav.module.css";

export default function Nav() {
  return (
    <>
      <nav className={styles.navbar}>
        <ul className={styles["navbar-nav"]}>
          <li className={styles["nav-item"]}>
            <Link
              href="/"
              prefetch={false}
              className={styles["nav-link"]}
              style={{ color: "inherit" }}
            >
              <IconSVG />
              <span className={styles["link-text"]}>Home</span>
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link
              href="/posts"
              prefetch={false}
              className={styles["nav-link"]}
              style={{ color: "inherit" }}
            >
              <PostsSVG />
              <span className={styles["link-text"]}>Posts</span>
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link
              href="/auth/session"
              prefetch={false}
              className={styles["nav-link"]}
              style={{ color: "inherit" }}
            >
              <AccountSVG />
              <span className={styles["link-text"]}>OAuth</span>
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <Link
              href="/about"
              prefetch={false}
              className={styles["nav-link"]}
              style={{ color: "inherit" }}
            >
              <QuestionSVG />
              <span className={styles["link-text"]}>About</span>
            </Link>
          </li>
          <li className={styles["nav-item"]}>
            <a
              href="https://github.com/T0mFuchs/nextssr"
              className={styles["nav-link"]}
              style={{ color: "inherit" }}
            >
              <GithubSVG />
              <span
                className={styles["link-text"]}
                style={{ paddingLeft: ".2em" }}
              >
                Github
              </span>
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}

function IconSVG() {
  return (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.115em" }}
      width="2em"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g fill="none">
        <g clipPath="url(#svgIDa)">
          <path
            fill="currentColor"
            d="M11.214.006c-.052.005-.216.022-.364.033c-3.408.308-6.6 2.147-8.624 4.974a11.88 11.88 0 0 0-2.118 5.243c-.096.66-.108.854-.108 1.748s.012 1.089.108 1.748c.652 4.507 3.86 8.293 8.209 9.696c.779.251 1.6.422 2.533.526c.364.04 1.936.04 2.3 0c1.611-.179 2.977-.578 4.323-1.265c.207-.105.247-.134.219-.157a211.64 211.64 0 0 1-1.955-2.62l-1.919-2.593l-2.404-3.559a342.499 342.499 0 0 0-2.422-3.556c-.009-.003-.018 1.578-.023 3.51c-.007 3.38-.01 3.516-.052 3.596a.426.426 0 0 1-.206.213c-.075.038-.14.045-.495.045H7.81l-.108-.068a.44.44 0 0 1-.157-.172l-.05-.105l.005-4.704l.007-4.706l.073-.092a.644.644 0 0 1 .174-.143c.096-.047.133-.051.54-.051c.478 0 .558.018.682.154c.035.038 1.337 2 2.895 4.362l4.734 7.172l1.9 2.878l.097-.063a12.318 12.318 0 0 0 2.465-2.163a11.947 11.947 0 0 0 2.825-6.135c.096-.66.108-.854.108-1.748s-.012-1.088-.108-1.748C23.24 5.75 20.032 1.963 15.683.56a12.6 12.6 0 0 0-2.498-.523c-.226-.024-1.776-.05-1.97-.03Zm4.913 7.26a.473.473 0 0 1 .237.276c.018.06.023 1.365.018 4.305l-.007 4.218l-.743-1.14l-.746-1.14v-3.066c0-1.983.009-3.097.023-3.151a.478.478 0 0 1 .232-.296c.097-.05.132-.054.5-.054c.347 0 .408.005.486.047Z"
          />
        </g>
        <defs>
          <clipPath id="svgIDa">
            <path fill="currentColor" d="M0 0h24v24H0z" />
          </clipPath>
        </defs>
      </g>
    </svg>
  );
}

function QuestionSVG() {
  return (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.05em" }}
      width="2em"
      height="55%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 320 512"
    >
      <path
        fill="currentColor"
        d="M96 96c-17.7 0-32 14.3-32 32s-14.3 32-32 32s-32-14.3-32-32c0-53 43-96 96-96h97c70.1 0 127 56.9 127 127c0 52.4-32.2 99.4-81 118.4l-63 24.5V320c0 17.7-14.3 32-32 32s-32-14.3-32-32v-18.1c0-26.4 16.2-50.1 40.8-59.6l63-24.5C240 208.3 256 185 256 159c0-34.8-28.2-63-63-63H96zm48 384c-22.1 0-40-17.9-40-40s17.9-40 40-40s40 17.9 40 40s-17.9 40-40 40z"
      />
    </svg>
  );
}

function GithubSVG() {
  return (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.115em" }}
      width="1.85em"
      height="100%"
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
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.125em" }}
      width="2.4em"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M4 14h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1zm0 5h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1zM4 9h2c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1zm5 5h11c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1zm0 5h11c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1zM8 6v2c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1z"
      />
    </svg>
  );
}

function AccountSVG() {
  return (
    <svg
      className={styles.svg}
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.125em" }}
      width="2.3em"
      height="100%"
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
