import React from "react";
import Link from "next/link";

export function NavMenu() {
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <nav role="navigation" onMouseLeave={() => setChecked((c) => c == false)}>
        <div id="menuToggle">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span></span>
          <span></span>
          <span></span>
          <ul id="menu">
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/posts">
              <li>Posts</li>
            </Link>
            <Link href="/about">
              <li>About</li>
            </Link>
            <a href="https://github.com/T0mFuchs/">
              <li>Github</li>
            </a>
          </ul>
        </div>
      </nav>
    </>
  );
}
