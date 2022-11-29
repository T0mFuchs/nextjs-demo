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
  width?: number; // fix for width of component so it is easier to be dismissed
}) {
  return (
    <A.Root open={open} onOpenChange={onOpenChange}>
      <A.Portal>
        <A.Overlay className={css.Overlay} />
        <A.Content
          className={position}
          style={{ width: width, margin: "0 auto" }}
        >
          <div className={`${className}`} style={{ ...style }} {...props}>
            {children}
          </div>
        </A.Content>
      </A.Portal>
    </A.Root>
  );
}
