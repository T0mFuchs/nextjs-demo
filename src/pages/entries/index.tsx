import React from "react";
import Link from "next/link";
import Head from "next/head";
import dynamic from "next/dynamic";
import useSWR from "swr";
import useSWRInfinite from "swr/infinite";
import { EntryType } from "types/Entry";
import { Observe } from "lib/observer-toggle-visibility";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { CrossSVG } from "ui";
import Fallback from "ui/entry/fallback";
import Error from "ui/entry/error";

import styles from "styles/main.module.scss";
import search from "./search.module.scss";
import css from "./index.module.scss";

const Append = dynamic(() => import("ui/radix-ui/dialog/append"), {
  suspense: true,
});

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page() {
  const [openSort, setOpenSort] = React.useState(false);
  const [sort, setSort] = React.useState("-1");
  const [placeholder, setPlaceholder] = React.useState("descending");
  const { data: allPublicEntries } = useSWR(`/api/entries`, fetcher);
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) => `/api/entries/${index * 6}/${(index + 1) * 6}/${sort}`,
    fetcher
  );

  const entries = data ? [].concat(...data) : [];

  React.useEffect(() => {
    Observe();
    const elem = document.querySelectorAll("#end")[0];
    const observer = new IntersectionObserver(
      async (n) => {
        const last = n[0];
        if (last.isIntersecting) {
          if (entries.length > (size + 1) * 6) {
            return 0;
          }
          setSize(size + 1);
          observer.unobserve(last.target);
        }
      },
      { threshold: 0 }
    );
    if (elem && !isValidating) {
      observer.observe(elem);
    }
  });
  if (error) return <Error />;
  if (!data) return <PageFallback />;
  return (
    <>
      <Head>
        {data ? <title>entries</title> : <title>loading entries...</title>}
      </Head>
      <>
        <span className={css.span}>
          <button
            className={css.opensort}
            onClick={() => setOpenSort(!openSort)}
          >
            {placeholder}
          </button>
          <React.Suspense>
            <Append
              open={openSort}
              onOpenChange={setOpenSort}
              className={css.sortdialog}
            >
              <button
                className={css.sortoption}
                onClick={() => {
                  setSort("-1");
                  setPlaceholder("descending");
                  setOpenSort(false);
                }}
              >
                descending
              </button>
              <button
                className={css.sortoption}
                onClick={() => {
                  setSort("1");
                  setPlaceholder("ascending");
                  setOpenSort(false);
                }}
              >
                ascending
              </button>
            </Append>
          </React.Suspense>
          <Search data={allPublicEntries} />
        </span>

        <div className={css.entries}>
          {entries ? (
            entries.map((entry: EntryType) => (
              <div key={entry.title} style={{ padding: "1em" }}>
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
                  <p className={css.limiter}>{entry.body}</p>
                  <div style={{ fontSize: ".6em" }}>
                    {dateFromObjectId(entry._id).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <DataFallback />
          )}
          {isValidating ? (
            <RefetchFallback />
          ) : (
            <div aria-hidden id="end" style={{ height: 100 }} />
          )}
        </div>
      </>
    </>
  );
}

function Search({ data }: { data: EntryType[] }) {
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
          {filtered.map((entry: EntryType) => (
            <div key={entry.title} style={{ padding: "1em 1.5em 0 1em" }}>
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
                  {dateFromObjectId(entry._id).toLocaleDateString()}
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
    <div className={search.wrapper}>
      <input className={search.input} style={{ border: "1px solid #808080" }} />
      <svg
        className={search.icon}
        style={{
          position: "relative",
          left: "-1.3em",
          fontSize: "1.5em",
          verticalAlign: "-.3em",
        }}
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="#808080"
          strokeDasharray="15"
          strokeDashoffset="15"
          strokeLinecap="round"
          strokeWidth="1"
          d="M12 3C16.9706 3 21 7.02944 21 12"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="15;0"
          />
          <animateTransform
            attributeName="transform"
            dur="1s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          />
        </path>
      </svg>
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

function RefetchFallback() {
  return (
    <>
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
      <Fallback maxWidth="600px" />
    </>
  );
}

function ChevronDownSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-.225em", position: "relative", left: ".15em" }}
      width="1.1em"
      height="100%"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 512 512"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
        d="m112 184l144 144l144-144"
      />
    </svg>
  );
}
