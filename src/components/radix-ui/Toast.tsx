import * as T from "@radix-ui/react-toast";
import { ReactNode } from "react";

import styles from "../../styles/styles.module.css";
import toast from "./toast.module.css";

export function Toast({ children }: { children: ReactNode }) {
  return (
    <T.Provider duration={60000}>
      <T.Root className={styles.Card} style={{ borderRadius: "1rem" }}>
        {children}
      </T.Root>
      <T.Viewport className={`${styles.Toast}, ${toast.Viewport}`} />
    </T.Provider>
  );
}

export function ToastAction({
  children,
  altText,
}: {
  children: ReactNode;
  altText: string;
}) {
  return (
    <T.Action altText={altText} className={toast.Action}>
      {children}
    </T.Action>
  );
}
