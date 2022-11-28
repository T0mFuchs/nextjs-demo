import React from "react";
import * as D from "@radix-ui/react-dialog";

import styles from "../../../styles/main.module.scss";
import css from "./index.module.scss";

export default function Dialog({
  children,
  open,
  onOpenChange,
  className,
  ...props
}: {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  className?: string;
}) {
  return (
    <D.Root open={open} onOpenChange={onOpenChange}>
      <D.Portal>
        <D.Overlay className={css.Overlay} />
        <D.Content className={css.Content} {...props}>
          <div className={`${styles.Card} ${className}`}>{children}</div>
        </D.Content>
      </D.Portal>
    </D.Root>
  );
}
