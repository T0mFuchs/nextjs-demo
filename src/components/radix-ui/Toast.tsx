import * as T from "@radix-ui/react-toast";
import { ReactNode } from "react";
import styles from "../../styles/styles.module.css";

export function Toast({ children }: { children: ReactNode }) {
  return (
    <T.Provider duration={60000}>
      <T.Root className={styles.Card} style={{ borderRadius: "1rem" }}>
        {children}
      </T.Root>
      <T.Viewport
        className={styles.Toast}
        style={{
          position: "fixed",
          bottom: "0",
          right: "0",
          display: "flex",
          flexDirection: "column",
          padding: ".5rem",
          listStyle: "none",
          zIndex: 10,
          outline: "none",
        }}
      />
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
    <T.Action
      altText={altText}
      style={{
        color: "var(--color-secondary)",
        border: "0",
        background: "none",
      }}
    >
      {children}
    </T.Action>
  );
}
