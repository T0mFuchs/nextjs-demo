import React from "react";
import * as A from "@radix-ui/react-alert-dialog";

import styles from "styles/main.module.scss";
import css from "./index.module.scss";

export default function AlertDialog({
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
    <A.Root open={open} onOpenChange={onOpenChange}>
      <A.Portal>
        <A.Overlay className={css.Overlay} />
        <A.Content className={css.Content} {...props}>
          <div className={`${styles.Card} ${className}`}>{children}</div>
        </A.Content>
      </A.Portal>
    </A.Root>
  );
}
