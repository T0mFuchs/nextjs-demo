import anime from "animejs";

export default function GenerateTiles() {
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
