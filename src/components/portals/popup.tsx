import React from "react";
import ReactDOM from "react-dom";

import styles from "../../styles/main.module.scss";
import css from "./popup.module.scss";

export const PopupCentered = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <div className={css.position}>
      <div className={styles.Card} tabIndex={0}>
        {children}
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

export const PopupAppend = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) => {
  return ReactDOM.createPortal(
    <div style={style}>
      <div className={styles.Card} style={{ maxWidth: 300 }} tabIndex={0}>
        {children}
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};
