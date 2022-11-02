import styles from "../styles/styles.module.css";

export default function Home() {
  return (
    <>
      <h2 style={{ paddingTop: "1rem", paddingBottom: "2rem" }}>
        empty home page
      </h2>
      <div
        style={{
          display: "grid",
          gap: "2.5rem",
          margin: "0 auto",
          width: "80%",
        }}
      >
        <div
          className={styles.Card}
          style={{ gridRow: "1", gridColumn: "1" }}
        >{``}</div>
        <div
          className={styles.Card}
          style={{ gridRow: "1", gridColumn: "2" }}
        >{`gridRow: "1", gridColumn: "2"`}</div>
        <div
          className={styles.Card}
          style={{ gridRow: "2", gridColumn: "1" }}
        >{``}</div>
        <div
          className={styles.Card}
          style={{ gridRow: "2", gridColumn: "2" }}
        >{``}</div>
      </div>
    </>
  );
}
