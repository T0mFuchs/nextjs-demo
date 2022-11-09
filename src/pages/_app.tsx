import { ReactNode, StrictMode } from "react";
import type { AppProps } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { NavMenu, HeaderContent } from "../components";
import anime from "animejs";
import "../styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <StrictMode>
      <SessionProvider session={session}>
        <div id="tiles" />
        <GenerateTiles />
        <Layout>
          <Header>
            <NavMenu />
            <HeaderContent />
          </Header>
          <Page>
            <Component {...pageProps} />
          </Page>
        </Layout>
      </SessionProvider>
    </StrictMode>
  );
}

function GenerateTiles() {
  // todo :: this might trigger warnings when page is prefetching session
  if (typeof window === "undefined") {
    return null;
  }
  const tiles = document.getElementById("tiles");

  let columns = 0,
    rows = 0,
    clicked = false;

  const click = () => {
    clicked = !clicked;
    document.body.classList.toggle("clicked");
  };

  const handleOnClick = (tile: any) => {
    click();
    anime({
      targets: ".tile",
      opacity: clicked ? 0 : 1,
      delay: anime.stagger(50, { grid: [columns, rows], from: tile }),
    });
  };

  const createTile = (n: any) => {
    const tile = document.createElement("div");
    tile.classList.add("tile");
    tile.style.opacity = clicked ? "0" : "1";
    tile.onclick = (e) => handleOnClick(n);
    return tile;
  };

  const createTiles = (quantity: number) => {
    Array.from(Array(quantity)).map((tile, index) => {
      tiles?.appendChild(createTile(index));
    });
  };

  const createGrid = () => {
    // @ts-ignore
    tiles.innerHTML = "";
    const size = document.body.clientWidth > 600 ? 45 : 45;
    columns = Math.floor(document.body.clientWidth / size);
    rows = Math.floor(document.body.clientHeight / size);
    tiles?.style.setProperty("--columns", columns.toString());
    tiles?.style.setProperty("--rows", rows.toString());
    createTiles(columns * rows);
  };

  createGrid();
  window.onresize = () => createGrid();
  // so typescript doesn't complain
  return <></>;
}

function Layout({ children }: { children: ReactNode }) {
  return <div className="Layout">{children}</div>;
}

function Header({ children }: { children: ReactNode }) {
  return <div className="Header">{children}</div>;
}

function Page({ children }: { children: ReactNode }) {
  return <div className="Page">{children}</div>;
}
