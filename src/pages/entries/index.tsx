import React from "react";
import Link from "next/link";
import Head from "next/head";
import useSWR from "swr";
import { Entry } from "lib/Entry";
import { Observe } from "lib/observer-toggle-visibility";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CrossSVG } from "ui";
import Background from "ui/animated/fallback-card";
import Fallback from "ui/entry/fallback";
import Error from "ui/entry/error";

import styles from "styles/main.module.scss";
import search from "./search.module.scss";
import css from "./index.module.scss";

const fetcher = async (url: string) =>
  await fetch(url, { cache: "no-store" }).then((res) => res.json());

export default function Page() {
  const { data, error } = useSWR(`/api/entries`, fetcher);


  React.useEffect(() => Observe());

  if (error) return <Error />;

  if (!data) return <PageFallback />;
  return (
    <>
      <Head>
        {data ? <title>entries</title> : <title>loading entries...</title>}
      </Head>
      <>
        <Search data={data} />
        <div className={css.entries}>
          {data ? (
            data
              .map((entry: Entry) => (
                <div key={entry.id} style={{ padding: "1em" }}>
                  {/* `hidden` for lib/observer-toggle-visibility */}
                  <div className={`${styles.Card} hidden`}>
                    <div className={styles.H2} style={{ fontSize: "2em" }}>
                      <Link
                        prefetch={false}
                        href={`entry/${entry.title}`}
                        className={styles.Link}
                      >
                        {entry.title}
                      </Link>
                    </div>
                    <p>{entry.body}</p>
                    <div style={{ fontSize: ".6em" }}>
                      {dateFromObjectId(entry.id).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))
              .reverse() // reverse to show newest first
          ) : (
            <DataFallback />
          )}
          <div style={{ padding: "2em" }} />
        </div>
      </>
    </>
  );
}

function Search({ data }: { data: Entry[] }) {
  const [current, setCurrent] = React.useState("");
  const [show, setShow]: any = React.useState([]);
  const [filtered, setFiltered]: any = React.useState([]);

  const includesCaseInsensitive = (searched: string, searchString: string) => {
    return new RegExp(searchString, "i").test(searched); // setting "i" flag to ignore case sensitivity
  };

  const handleInput = (event: any) => {
    const current = event.target.value;
    setCurrent(current);
    const filteredTitle = data.filter((entry) => {
      return includesCaseInsensitive(entry.title, current);
    });
    const filteredBody = data.filter((entry) => {
      return includesCaseInsensitive(entry.body, current);
    });
    if (current === "") {
      setFiltered([]);
      setShow([]);
    } else {
      setFiltered(filteredTitle);
      setShow(filteredBody);
    }
  };

  return (
    <div className={search.wrapper}>
      <>
        <input
          onChange={handleInput}
          className={search.input}
          type="text"
          value={current}
          placeholder="search all entries"
        />
        <button
          className={search.current}
          onClick={() => {
            setCurrent("");
            setShow([]);
            setFiltered([]);
          }}
        >
          {current === "" ? <SearchSVG /> : <CloseSVG />}
        </button>
      </>
      {filtered.length !== 0 ? (
        <div className={search.output}>
          {filtered.map((entry: Entry) => (
            <div key={entry.id} style={{ padding: "1em 1.5em 0 1em" }}>
              <div className={styles.Card}>
              <Link
                href={`/entry/${entry.title}`}
                prefetch={false}
                className={`${search.item}`}
              >
                <span
                  dangerouslySetInnerHTML={{
                    __html:
                      current.length > 0
                        ? entry.title.replace(
                            new RegExp(current, "gi"),
                            (match) => {
                              return `<span class="${search.highlight}">${match}</span>`;
                            }
                          )
                        : entry.title,
                  }}
                />
              </Link>
              {show.length !== 0 ? (
                <div
                  className={search.body}
                  dangerouslySetInnerHTML={{
                    __html:
                      current.length > 0
                        ? entry.body.replace(
                            new RegExp(current, "gi"),
                            (match) => {
                              return `<span class="${search.highlight}">${match}</span>`;
                            }
                          )
                        : entry.body,
                  }}
                />
              ) : null}
              <span className={search.span}>
                {dateFromObjectId(entry.id).toLocaleDateString()}
              </span>
              <div style={{ paddingBottom: 7 }} />
            </div>
            </div>
          ))}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

function SearchSVG() {
  return (
    <svg
      className={search.icon}
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m18.9 20.3l-5.6-5.6q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075q-.35.975-.95 1.725l5.625 5.625q.275.275.275.675t-.3.7q-.275.275-.7.275q-.425 0-.7-.275ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5Q7.625 5 6.312 6.312Q5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"
      />
    </svg>
  );
}

function CloseSVG() {
  return (
    <div className={search.icon}>
      <CrossSVG />
    </div>
  );
}

function SearchFallback() {
  return (
    <div style={{ width: "83.5vw", maxWidth: 550, margin: "auto" }}>
      <div className={search.wrapper}>
        <Background style={{ padding: "2px 2px 2px 1.5px" }}>
          <input
            className={search.input}
            style={{ background: "#000000fe", border: 0 }}
          />
        </Background>
      </div>
    </div>
  );
}

function DataFallback() {
  return (
    <div className={css.entries}>
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
    </div>
  );
}

function PageFallback() {
  return (
    <>
      <SearchFallback />
      <DataFallback />
      <DataFallback />
      <DataFallback />
    </>
  );
}
