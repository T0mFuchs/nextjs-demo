export function FallbackSVG() {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35vh"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeDasharray="15"
          strokeDashoffset="15"
          strokeLinecap="round"
          strokeWidth="2"
          d="M12 3C16.9706 3 21 7.02944 21 12"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="15;0"
          />
          <animateTransform
            attributeName="transform"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </svg>
    </>
  );
}

export function CheckSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-0.125em" }}
      width="1em"
      height="1em"
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
      style={{ verticalAlign: "-0.175em" }}
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
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
      width="1em"
      height="1em"
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

export function DataErrorSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35vh"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 32 32"
    >
      <circle cx="11" cy="8" r="1" fill="currentColor" />
      <circle cx="11" cy="16" r="1" fill="currentColor" />
      <circle cx="11" cy="24" r="1" fill="currentColor" />
      <path
        fill="currentColor"
        d="M24 3H8a2 2 0 0 0-2 2v22a2 2 0 0 0 2 2h10v-2H8v-6h18V5a2 2 0 0 0-2-2Zm0 16H8v-6h16Zm0-8H8V5h16Z"
      />
      <path
        fill="currentColor"
        d="M29 24.415L27.586 23L25 25.587L22.414 23L21 24.415L23.586 27L21 29.586L22.414 31L25 28.414L27.586 31L29 29.586L26.414 27L29 24.415z"
      />
    </svg>
  );
}
