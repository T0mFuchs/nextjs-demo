import * as D from "@radix-ui/react-dialog";
import { ReactNode } from "react";

import styles from "../../styles/styles.module.css";
import dialog from "./dialog.module.css";

export const DialogRoot = D.Root;

export function DialogTrigger({ children }: { children: ReactNode }) {
  return (
    <D.Trigger className={`${styles.Button} ${dialog.Trigger}`}>
      {children}
    </D.Trigger>
  );
}

export function DialogContent({ children }: { children: ReactNode }) {
  return (
    <D.Portal>
      <D.Overlay className={styles.DialogOverlay} />
      <D.Content
        className={`${styles.DialogContent}`}
        style={{
          position: "fixed",
          top: "11%",
          right: 0,
          transform: "translate(-25%, -25%)",
        }}
      >
        <div className={styles.Card}>{children}</div>
      </D.Content>
    </D.Portal>
  );
}

export function DialogItem({ children }: { children: ReactNode }) {
  return <div className={dialog.Item}>{children}</div>;
}
