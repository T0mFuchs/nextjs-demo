import React from "react";
import Link from "next/link";

export function NavMenu() {
  const [checked, setChecked] = React.useState(false);
  return (
    <>
      <nav role="navigation">
        <div className="menuToggle">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
          />
          <span></span>
          <span></span>
          <span></span>
          <ul
            className="menu"
            onMouseLeave={() => setChecked((c) => c == false)}
          >
            <Link href="/" prefetch={false}>
              <li>Home</li>
            </Link>
            <Link href="/posts" prefetch={false}>
              <li>Posts</li>
            </Link>
            <Link href="/about" prefetch={false}>
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
