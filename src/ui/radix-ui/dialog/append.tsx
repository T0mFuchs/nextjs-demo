import React from "react";
import * as A from "@radix-ui/react-dialog";

import css from "./index.module.scss";

export default function Append({
  children,
  open,
  onOpenChange,
  className,
  position,
  style,
  width,
  container,
  ...props
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  position?: string; // declare position of component via css modules
  style?: React.CSSProperties;
  width?: number | string; // fix for width of component so it is easier to be dismissed
  container?: HTMLElement;
}) {
  return (
    <A.Root open={open} onOpenChange={onOpenChange}>
      <A.Portal
        container={container}
        className={position}
        style={{ width: width, margin: "0 auto" }}
      >
        <A.Overlay className={css.Overlay} />
        <A.Content className={`${className}`} style={{ ...style }} {...props}>
          {children}
        </A.Content>
      </A.Portal>
    </A.Root>
  );
}
