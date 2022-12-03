import Background from "ui/animated/fallback-card";
import css from "styles/main.module.scss";

export default function Fallback({
  style,
  maxWidth,
}: {
  style?: React.CSSProperties;
  maxWidth?: string;
}) {
  return (
    <>
      <div style={{ padding: "2em 0" }} />
      <Background style={{ maxWidth: maxWidth }}>
        <div className={css.Card} style={{ ...style, maxWidth: maxWidth }}>
          <div style={{ fontSize: "1.6em", color: "transparent" }}>...</div>
          <p style={{ color: "transparent" }}>...</p>
          <div style={{ fontSize: ".6em", color: "transparent" }}>...</div>
        </div>
      </Background>
    </>
  );
}
