import * as T from "@radix-ui/react-toast";

import css from "./index.module.scss";
import styles from "../../../styles/main.module.scss";

export function ToastBottomSR({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <T.Provider duration={15000} swipeDirection="right">
        <T.Root {...props}>{children}</T.Root>
        <ViewportBottom />
      </T.Provider>
    </>
  );
}

export function ToastTopSR({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <T.Provider duration={15000} swipeDirection="right">
        <T.Root {...props}>{children}</T.Root>
        <ViewportTop />
      </T.Provider>
    </>
  );
}

function ViewportBottom() {
  return <T.Viewport className={css.bottom} />;
}

function ViewportTop() {
  return <T.Viewport className={css.top} />;
}

export function ToastClose({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <T.Close {...props} className={styles.Button}>
      {children}
    </T.Close>
  );
}
