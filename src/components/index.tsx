import React from "react";

export * from "./HeaderContent";
export * from "./NavMenu";

// todo ::  make this go up component on click and sticky ontop of header

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

function Center({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div
        style={{ position: "relative", paddingTop: "9rem", fontSize: "9rem" }}
      >
        {children}
      </div>
    </>
  );
}

export const Spinner = () => (
  <Center>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15rem"
      height="15rem"
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
          dur="1.5s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        />
      </path>
    </svg>
  </Center>
);
