import { useEffect } from "react";
import anime from "animejs";
import css from "./background.module.css";

export default function Background({ delay }: { delay: number }) {
  useEffect(() => {
    anime({
      targets: `.${css.background} .${css.animated}`,
      easing: "cubicBezier(.5, .4, .3, .2)",
      loop: true,
      delay: (el, i) => delay * i,
      opacity: [
        {
          duration: 500,
          value: "1",
        },
      ],
      width: [
        {
          value: "170px",
        },
        {
          value: "0px",
        },
      ],
      translateX: 400,
    });
  }, [delay]);

  return (
    <>
      <div className={css.background}>
        {[...Array(150)].map((x, y) => (
          <div
            key={y}
            className={css.animated}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </>
  );
}
