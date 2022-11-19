import { useEffect } from "react";
import anime from "animejs";
import css from "./background.module.css";

export default function Background({ n }: { n: number }) {
  // find a solution where this doesnt loop backwards sometimes after loading next page
  useEffect(() => {
    anim();
  });
  const anim = () => {
    anime({
      targets: `.${css.background} .${css.animated}`,
      easing: "linear",
      loop: true,
      delay: (el, i) => 500 * i,
      opacity: [
        {
          duration: 1000,
          value: "1",
        },
      ],
      width: [
        {
          value: "150px",
        },
        {
          value: "0px",
        },
      ],
      translateX: 400,
    });
  };

  return (
    <>
      <div className={css.background}>
        {[...Array(n)].map((x, y) => (
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
