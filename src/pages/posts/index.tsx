import React, { Suspense } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import useSWR from "swr";
import { Observe } from "../../lib/IntersectionObserver";
import { ArrowDownSVG } from "../../components";
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogItem,
} from "../../components/radix-ui/Dialog";

import styles from "../../styles/styles.module.css";
import { dateFromObjectId } from "../../lib/dateFromObjectId";

const Background = dynamic(() => import("../../components/page/Background"), {
  suspense: true,
});

const fetcher = (url: string) =>
  fetch(url, { cache: "no-store" }).then((res) => res.json());

// todo :: implement refetching for options "10" & "20" to make it infite on scrolling

export default function Page() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState("10");
  let route;
  if (options === "10") route = "/api/posts/10";
  if (options === "20") route = "/api/posts/20";
  if (options === "i") route = "/api/posts";

  const { data } = useSWR(route, fetcher);
  React.useEffect(() => {
    Observe();
  });
  if (!data)
    return (
      <Suspense>
        <Background delay={150} />
      </Suspense>
    );
  return (
    <>
      <Head>
        <title>posts</title>
      </Head>
      <ArrowDownSVG />
      <div style={{ padding: "0 2em 1em 0" }} />
      <DialogRoot open={open} onOpenChange={setOpen}>
        <div
          style={{ position: "fixed", padding: ".3em" }}
          className={styles.Options}
        >
          <DialogTrigger>
            <SearchSVG />
          </DialogTrigger>
        </div>
        <DialogContent>
          <div
            onClick={() => {
              setOptions("10");
              setOpen(false);
            }}
          >
            <DialogItem>10</DialogItem>
          </div>
          <div
            onClick={() => {
              setOptions("20");
              setOpen(false);
            }}
          >
            <DialogItem>20</DialogItem>
          </div>
          <div
            onClick={() => {
              setOptions("i");
              setOpen(false);
            }}
          >
            <DialogItem>∞</DialogItem>
          </div>
        </DialogContent>
      </DialogRoot>
      {data.map((post: any) => (
        <div key={post.id} className="hidden">
          <div
            className={styles.Card}
            style={{ width: "67%", padding: "1rem" }}
          >
            <div>
              <Link
                className={styles.Link}
                style={{
                  fontSize: "1.7em",
                  fontWeight: 500,
                }}
                href={{
                  pathname: "/post/[title]",
                  query: { title: post.title },
                }}
              >
                {post.title}
              </Link>
            </div>
            <p>{post.body}</p>
            <div style={{ fontSize: "0.6em" }}>
              {dateFromObjectId(post.id).toLocaleDateString()}
            </div>
          </div>
          <div style={{ padding: "2em" }}></div>
        </div>
      ))}
    </>
  );
}

function SearchSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ verticalAlign: "-.125em" }}
      width="1em"
      height="1em"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      strokeWidth="2"
    >
      <path
        fill="currentColor"
        d="m18.9 20.3l-5.6-5.6q-.75.6-1.725.95Q10.6 16 9.5 16q-2.725 0-4.612-1.887Q3 12.225 3 9.5q0-2.725 1.888-4.613Q6.775 3 9.5 3t4.613 1.887Q16 6.775 16 9.5q0 1.1-.35 2.075q-.35.975-.95 1.725l5.625 5.625q.275.275.275.675t-.3.7q-.275.275-.7.275q-.425 0-.7-.275ZM9.5 14q1.875 0 3.188-1.312Q14 11.375 14 9.5q0-1.875-1.312-3.188Q11.375 5 9.5 5Q7.625 5 6.312 6.312Q5 7.625 5 9.5q0 1.875 1.312 3.188Q7.625 14 9.5 14Z"
      />
    </svg>
  );
}
