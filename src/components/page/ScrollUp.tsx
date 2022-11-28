import { useEffect, useState } from "react";
import { ArrowTopSVG } from "components";
import { AccessibleIcon } from "@radix-ui/react-accessible-icon";

import styles from "styles/main.module.scss";
import css from "./scrollup.module.scss";

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
          <AccessibleIcon label="go to top button">
            <ArrowTopSVG />
          </AccessibleIcon>
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
