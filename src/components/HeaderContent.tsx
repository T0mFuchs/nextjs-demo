import Link from "next/link";

export function HeaderContent() {
  return (
    <div style={{ lineHeight: 0, paddingTop: 5, paddingRight: 1 }}>
      <Link href="/posts" style={{ color: "inherit" }}>
        <PostsSVG />
      </Link>
      <Link href="/about" style={{ color: "inherit" }}>
        <QuestionSVG />
      </Link>
      <Link href="/" style={{ color: "inherit" }}>
        <HomeSVG />
      </Link>
    </div>
  );
}

function HomeSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="2rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      >
        <path strokeDasharray="21" strokeDashoffset="21" d="M5 21H19">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="21;0"
          />
        </path>
        <path strokeDasharray="15" strokeDashoffset="15" d="M5 21V8M19 21V8">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.2s"
            values="15;0"
          />
        </path>
        <path strokeDasharray="26" strokeDashoffset="26" d="M2 10L12 2L22 10">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.5s"
            dur="0.4s"
            values="26;0"
          />
        </path>
      </g>
    </svg>
  );
}

function QuestionSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="2rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray="32"
        strokeDashoffset="32"
        strokeLinecap="round"
        strokeWidth="3"
        d="M7 8C7 5.23858 9.23857 3 12 3C14.7614 3 17 5.23858 17 8C17 9.6356 16.2147 11.0878 15.0005 12C14.1647 12.6279 12 14 12 17"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.5s"
          values="32;0"
        />
      </path>
      <circle cx="12" cy="21" r="1.67" fill="currentColor" fillOpacity="0">
        <animate
          fill="freeze"
          attributeName="fill-opacity"
          begin="0.5s"
          dur="0.2s"
          values="0;1"
        />
      </circle>
    </svg>
  );
}

function PostsSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="2rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray="14"
        strokeDashoffset="14"
        strokeLinecap="round"
        strokeWidth="3"
      >
        <path d="M8 5H20">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.1s"
            dur="0.2s"
            values="14;0"
          />
        </path>
        <path d="M8 10H20">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.2s"
            values="14;0"
          />
        </path>
        <path d="M8 15H20">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.2s"
            values="14;0"
          />
        </path>
        <path d="M8 20H20">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s"
            dur="0.2s"
            values="14;0"
          />
        </path>
      </g>
      <g fill="currentColor" fillOpacity="0">
        <circle cx="4" cy="5" r="1.3">
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            dur="0.2s"
            values="0;1"
          />
        </circle>
        <circle cx="4" cy="10" r="1.3">
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="0.3s"
            dur="0.2s"
            values="0;1"
          />
        </circle>
        <circle cx="4" cy="15" r="1.3">
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="0.6s"
            dur="0.2s"
            values="0;1"
          />
        </circle>
        <circle cx="4" cy="20" r="1.3">
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            begin="0.9s"
            dur="0.2s"
            values="0;1"
          />
        </circle>
      </g>
    </svg>
  );
}
