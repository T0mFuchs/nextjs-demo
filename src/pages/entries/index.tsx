import React from "react";
import Link from "next/link";
import Head from "next/head";
import useSWRInfinite from "swr/infinite";
import { EntryType } from "types/Entry";
import { Observe } from "lib/observer-toggle-visibility";
import { dateFromObjectId } from "lib/dateFromObjectId";
import { useGetAllEntries } from "hooks/entry/getAllEntries";

import { CrossSVG, SearchSVG } from "ui";
import Fallback from "ui/entry/fallback";
import Error from "ui/entry/error";

import styles from "styles/main.module.scss";
import search from "./search.module.scss";
import css from "./index.module.scss";

const fetcher = async (url: string) =>
  await fetch(url, { method: "POST" }).then((res) => res.json());

export default function Page() {
  const [openSort, setOpenSort] = React.useState(false);
  const [sortKey, setSortKey] = React.useState("_id");
  const [sortValue, setSortValue] = React.useState("-1");
  const [sortPlaceholder, setSortPlaceholder] = React.useState("descending");

  const { data: allPublicEntries } = useGetAllEntries("/api/entries");
  const { data, error, size, setSize, isValidating } = useSWRInfinite(
    (index) =>
      `/api/entries/${index * 6}/${(index + 1) * 6}/${sortKey}/${sortValue}`,
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
        <div
          style={{
            display: "inline-flex",
            paddingTop: 15,
            paddingBottom: 10,
            gap: 10,
          }}
        >
          {openSort ? (
            <>
              <button
                className={
                  sortPlaceholder === "descending"
                    ? `${css.sortoption} ${css.highlight}`
                    : css.sortoption
                }
                onClick={() => {
                  if (sortPlaceholder === "descending") {
                    setOpenSort(false);
                    return;
                  }
                  setSortKey("_id");
                  setSortValue("-1");
                  setSortPlaceholder("descending");
                  setOpenSort(false);
                }}
              >
                descending
              </button>
              <button
                className={
                  sortPlaceholder === "ascending"
                    ? `${css.sortoption} ${css.highlight}`
                    : css.sortoption
                }
                onClick={() => {
                  if (sortPlaceholder === "ascending") {
                    setOpenSort(false);
                    return;
                  }
                  setSortKey("_id");
                  setSortValue("1");
                  setSortPlaceholder("ascending");
                  setOpenSort(false);
                }}
              >
                ascending
              </button>
              <button
                className={
                  sortPlaceholder === "recently updated"
                    ? `${css.sortoption} ${css.highlight}`
                    : css.sortoption
                }
                onClick={() => {
                  if (sortPlaceholder === "recently updated") {
                    setOpenSort(false);
                    return;
                  }
                  setSortKey("updatedAt");
                  setSortValue("-1");
                  setSortPlaceholder("recently updated");
                  setOpenSort(false);
                }}
              >
                recently updated
              </button>
            </>
          ) : (
            <button
              className={css.opensort}
              onClick={() => setOpenSort(true)}
              tabIndex={0}
            >
              {sortPlaceholder}
            </button>
          )}
        </div>
        <span className={css.span}>
          <Search data={allPublicEntries} />
        </span>

        <div className={css.entries}>
          {entries ? (
            entries.map((entry: EntryType) => (
              <div key={entry.title} style={{ padding: "1em" }}>
                {/* `hidden` for lib/observer-toggle-visibility */}
                <div className={`${styles.Card} hidden`}>
                  <div
                    className={styles.H2}
                    style={{ fontSize: "2em", position: "relative", bottom: 7 }}
                  >
                    <Link
                      prefetch={false}
                      href={`entry/${entry.title}`}
                      className={styles.Link}
                    >
                      {entry.title}
                    </Link>
                  </div>
                  <p className={css.limiter}>{entry.body}</p>
                  <div
                    style={{ fontSize: ".6em", position: "relative", top: 9 }}
                  >
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
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setCurrent("");
              setShow([]);
              setFiltered([]);
            }
          }}
        />
        <button
          className={search.current}
          onClick={() => {
            setCurrent("");
            setShow([]);
            setFiltered([]);
          }}
        >
          {current === "" ? <SearchIcon /> : <CloseIcon />}
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

function SearchIcon() {
  return (
    <div className={search.icon}>
      <SearchSVG />
    </div>
  );
}

function CloseIcon() {
  return (
    <div className={search.icon} style={{ top: -3, left: "-.3em" }}>
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
      <div style={{ paddingTop: 10 }} />
      <button className={css.sortoption} style={{ height: 23, width: 78 }} />
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
