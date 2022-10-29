import React from "react";

export * from "./NavMenu";
export * from "./HeaderContent";

export function Spacer({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div style={{ lineHeight: "2rem", padding: "1rem" }}>{children}</div>
    </>
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
