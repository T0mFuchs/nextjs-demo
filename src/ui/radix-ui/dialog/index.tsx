import React from "react";
import * as A from "@radix-ui/react-dialog";

import css from "./index.module.scss";

export default function Dialog({
  children,
  open,
  onOpenChange,
  className,
  position,
  style,
  width,
  ...props
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
  position?: string; // declare position of component via css modules
  style?: React.CSSProperties;
  width?: number | string; // fix for width of component so it is easier to be dismissed
}) {
  return (
    <A.Root open={open} onOpenChange={onOpenChange}>
      <A.Portal
        className={`${position}`}
        style={{ width: width, margin: "0 auto" }}
      >
        <A.Overlay className={css.Overlay} />
        <A.Content
          className={`${css.dialog} ${className}`}
          tabIndex={0}
          style={{ ...style }}
          {...props}
        >
          {children}
        </A.Content>
      </A.Portal>
    </A.Root>
  );
}
