import { useEffect, useState } from "react";
import { ArrowTopSVG } from "..";

import styles from "../../styles/main.module.css";
import css from "./scrollup.module.css";

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
          className={`${styles.Button} ${css.Position}`}
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
