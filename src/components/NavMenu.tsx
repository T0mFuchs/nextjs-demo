import Link from "next/link";
import { useState } from "react";

export function NavMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav role="navigation">
        <div className="menuToggle" onMouseLeave={() => setOpen(false)}>
          <input
            type="checkbox"
            checked={open}
            onChange={() => setOpen(!open)}
          />
          <span></span>
          <span></span>
          <span></span>
          <ul className="menu">
            <Link href="/" prefetch={false}>
              <li>Home</li>
            </Link>
            <Link href="/posts" prefetch={false}>
              <li>Posts</li>
            </Link>
            <Link href="/about" prefetch={false}>
              <li>About</li>
            </Link>
            <Link href="/auth/account" prefetch={false}>
              <li>OAuth login</li>
            </Link>
            <a href="https://github.com/T0mFuchs/">
              <li>my Github</li>
            </a>
          </ul>
        </div>
      </nav>
    </>
  );
}
