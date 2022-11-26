import React from "react";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";
import { Observe } from "../../lib/IntersectionObserver";
import { dateFromObjectId } from "../../lib/dateFromObjectId";
import { CrossSVG , Fallback } from "../../components";

import styles from "../../styles/main.module.css";
import css from "./search.module.css";
import { Entry } from "../../lib/Entry";

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR("/api/entries", fetcher);
  React.useEffect(() => {
    Observe();
  });
  if (error) return <div>failed loading entries</div>;
  if (!data) return <Fallback />;
  return (
    <>
      <Head>
        <title>entries</title>
      </Head>
      <Search data={data} />
      {data
        .map((entry: Entry) => (
          <>
            <div key={entry.id} className={`hidden ${styles.Card}`}>
              <div className={styles.H2} style={{ fontSize: "2em" }}>
                <Link href={`entry/${entry.title}`}>{entry.title}</Link>
              </div>
              <p>{entry.body}</p>
              <div style={{ fontSize: ".6em" }}>
                {dateFromObjectId(entry.id).toLocaleDateString()}
              </div>
            </div>
            <div style={{ padding: "1.4em" }} />
          </>
        ))
        .reverse()}
    </>
  );
}

function Search({ data }: { data: Entry[] }) {
  const [current, setCurrent] = React.useState("");
  const [filtered, setFiltered]: any = React.useState([]);

  const handleInput = (event: any) => {
    const current = event.target.value
    setCurrent(current);
    const newData = data.filter((entry) => {
      return entry.title.includes(current);
    });
    
    if (current === "") {
      setFiltered([]);
    } else {
      setFiltered(newData);
    }
  };

  return (
      <div className={css.wrapper}>
          <>
            <input onChange={handleInput} className={css.input} type="text" value={current} placeholder="search titles..." />
            <button style={{ all: "unset" }} onClick={() => {
              setCurrent("");
            }}>
              {current === "" ? (<SearchSVG />) : (<CloseSVG />)}
            </button>
          </>
          {filtered.length !== 0 ? (<div className={css.output}>
            {filtered.map((entry: Entry) => (
              <div  key={entry.id}>
                <Link href={`/entry/${entry.title}`} className={css.item}>{entry.title}</Link>
                <span style={{ paddingLeft: 15, fontSize: ".6em", verticalAlign: 1 }}>{dateFromObjectId(entry.id).toLocaleDateString()}</span>
                <div style={{ paddingBottom: 7}} />
              </div>
              
            ))}
          </div>) : (<></>)}
      </div>
  );
}

function SearchSVG() {
  return (
      <svg className={css.icon} xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m18.9 20.3l-5.6-5.6q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075q-.35.975-.95 1.725l5.625 5.625q.275.275.275.675t-.3.7q-.275.275-.7.275q-.425 0-.7-.275ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5Q7.625 5 6.312 6.312Q5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"/></svg>
  );
}

function CloseSVG() {
  return (
    <div className={css.icon}>
      <CrossSVG/>
    </div>
  )
}
