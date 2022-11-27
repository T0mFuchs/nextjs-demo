import React from "react";

import animate from "./animate.module.scss";

export default function Flicker({
  children,
  string,
  style,
  className,
}: {
  children: React.ReactNode;
  string: string;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <div
      className={`${animate.flicker} ${className}`}
      style={style}
      data-text={string}
    >
      {children}
    </div>
  );
}
