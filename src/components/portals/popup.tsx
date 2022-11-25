import React from "react";
import ReactDOM from "react-dom";

import styles from "../../styles/main.module.css";

export const PopupCentered = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className={styles.Card} tabIndex={0}>
        {children}
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

export const PopupAppend = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(
    <div
      style={{
        paddingTop: ".5em",
      }}
    >
      <div className={styles.Card} style={{ maxWidth: 300 }} tabIndex={0}>
        {children}
      </div>
    </div>,
    document.getElementById("portal") as HTMLElement
  );
};

// for dialogpopup
// add this box-shadow: 0 0 0 100vmax #00000080, 0 0 2em #00000080;  to cast shadow over the whole screen
