import * as D from "@radix-ui/react-dialog";
import { ReactNode } from "react";

import styles from "../../styles/styles.module.css";

export const DialogRoot = D.Root;

export function DialogTrigger({ children }: { children: ReactNode }) {
  return (
    <D.Trigger asChild className={styles.Button}>
      {children}
    </D.Trigger>
  );
}

export function DialogContent({ children }: { children: ReactNode }) {
  return (
    <D.Portal>
      <D.Overlay className={styles.DialogOverlay} style={{}} />
      <D.Content
        className={styles.DialogContent}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          maxWidth: "300px",
        }}
      >
        <div className={styles.Card}>{children}</div>
      </D.Content>
    </D.Portal>
  );
}

export function DialogClose({ children }: { children: ReactNode }) {
  return (
    <D.Close asChild className={styles.Button}>
      {children}
    </D.Close>
  );
}
