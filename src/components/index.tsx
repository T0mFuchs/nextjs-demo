import React from "react";

export function CheckSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.125em" }}
      width="2em"
      height="1.75em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 1600 1280"
    >
      <path
        fill="currentColor"
        d="M1575 310q0 40-28 68l-724 724l-136 136q-28 28-68 28t-68-28l-136-136L53 740q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 295l656-657q28-28 68-28t68 28l136 136q28 28 28 68z"
      />
    </svg>
  );
}

export function CrossSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.125em" }}
      width="2em"
      height="2em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
    >
      <path
        fill="currentColor"
        d="m24.778 21.42l-5.502-5.503l5.5-5.502l-2.827-2.83l-5.503 5.502l-5.502-5.502l-2.828 2.83l5.5 5.502l-5.5 5.502l2.83 2.828l5.5-5.502l5.5 5.502z"
      />
    </svg>
  );
}

export function ArrowTopSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.115em" }}
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 48 48"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
        d="M24.008 14.1V42M12 26l12-12l12 12M12 6h24"
      />
    </svg>
  );
}

export function ArrowDownSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.115em" }}
      height="2.5rem"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <g transform="rotate(-90 12 12)">
        <g
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        >
          <path strokeDasharray="20" strokeDashoffset="20" d="M21 3V21">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.3s"
              values="20;0"
            />
          </path>
          <path strokeDasharray="15" strokeDashoffset="15" d="M17 12H3.5">
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.4s"
              dur="0.2s"
              values="15;0"
            />
          </path>
          <path
            strokeDasharray="12"
            strokeDashoffset="12"
            d="M3 12L10 19M3 12L10 5"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.6s"
              dur="0.2s"
              values="12;0"
            />
          </path>
        </g>
      </g>
    </svg>
  );
}
