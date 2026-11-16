"use client";

import { useCallback, useEffect, useState } from "react";
import SideMenu from "./SideMenu";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Projects", href: "#projects" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const scrollable =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const percentage =
        scrollable > 0
          ? (window.scrollY / scrollable) * 100
          : 0;

      setProgress(Math.max(0, Math.min(100, percentage)));
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>

      <div
        aria-hidden="true"
        className="fixed left-0 top-0 z-[100] h-[3px] bg-electric"
        style={{ width: `${progress}%` }}
      />

      <header
        className={`fixed left-0 top-0 z-40 w-full
          px-5 py-7 md:px-10 xl:px-14
          transition-transform duration-500
          ${
            scrolled
              ? "-translate-y-full pointer-events-none"
              : "translate-y-0"
          }`}
      >
        <div className="flex items-center justify-between gap-6">

          <a
            href="#home"
            className="brand group flex shrink-0 items-center gap-2 text-white"
            aria-label="Sayeed Bin Salim - Home"
          >
            <span
              aria-hidden="true"
              className="brand-symbol text-xl font-medium"
            >
              ©
            </span>

            <span className="relative block h-6 w-[160px] overflow-hidden text-sm font-medium">
              <span className="brand-first">
                Code by Sayeed
              </span>

              <span className="brand-second">
                Sayeed Bin Salim
              </span>
            </span>
          </a>

          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-5 xl:gap-9"
          >
            {navLinks.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="nav-link whitespace-nowrap text-sm font-medium text-white/90 transition-colors hover:text-white"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open navigation menu"
        aria-expanded={menuOpen}
        aria-controls="portfolio-side-menu"
        className={`menu-trigger fixed right-5 top-5 z-40
          flex h-[60px] w-[60px]
          flex-col items-center justify-center
          gap-[6px] rounded-full bg-electric
          shadow-xl transition-all duration-500 md:right-10
          ${
            scrolled
              ? "scale-100 opacity-100"
              : "lg:pointer-events-none lg:scale-75 lg:opacity-0"
          }`}
      >
        <span className="relative z-10 h-[2px] w-6 bg-white" />
        <span className="relative z-10 h-[2px] w-6 bg-white" />
      </button>

      <SideMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        links={navLinks}
      />
    </>
  );
}
