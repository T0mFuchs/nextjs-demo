import { useEffect, useState } from "react";
import { ArrowTopSVG } from "..";

import styles from "../../styles/styles.module.css";

export default function ScrollUp() {
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 500) {
        setShowBtn(true);
      } else {
        setShowBtn(false);
      }
    });
  }, []);
  return (
    <>
      {showBtn ? (
        <button
          className={styles.Button}
          style={{
            position: "fixed",
            bottom: ".2em",
            right: ".2em",
            zIndex: 1,
          }}
          onClick={goToTop}
        >
          <ArrowTopSVG />
        </button>
      ) : (
        <></>
      )}
    </>
  );
}

function goToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
