"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="navbar flex justify-center gap-3">
      <Link
        className={`navbar-link ${pathname === "/" ? "active" : ""}`}
        href="/"
      >
        Dashboard
      </Link>
      <Link
        className={`navbar-link ${pathname === "/movieviewer" ? "active" : ""}`}
        href="/movieviewer"
      >
        Movie Viewer
      </Link>
      <Link
        className={`navbar-link ${pathname === "/aboutme" ? "active" : ""}`}
        href="/aboutme"
      >
        About Me
      </Link>
    </div>
  );
}
