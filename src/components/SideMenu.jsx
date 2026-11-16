"use client";

import { useEffect, useRef } from "react";
import { profile } from "../data/profile";

const socialLinks = [
  ["LinkedIn", profile.contact.socials.linkedin],
  ["GitHub", profile.contact.socials.github],
  ["Facebook", profile.contact.socials.facebook],
  ["YouTube", profile.contact.socials.youtube],
  ["Discord", profile.contact.socials.discord],
  ["X", profile.contact.socials.x],
].filter(([, url]) => Boolean(url));

export default function SideMenu({
  isOpen,
  onClose,
  links,
}) {
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;

    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
      previousFocus?.focus?.();
    };
  }, [isOpen, onClose]);

  return (
    <div
      id="portfolio-side-menu"
      className={`fixed inset-0 z-50 ${
        !isOpen ? "pointer-events-none" : ""
      }`}
      aria-hidden={!isOpen}
      inert={!isOpen}
    >

      <button
        type="button"
        onClick={onClose}
        aria-label="Close navigation menu"
        className={`absolute inset-0 w-full
          bg-[#020817]/60 backdrop-blur-[2px]
          transition-opacity duration-500
          ${isOpen ? "opacity-100" : "opacity-0"}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        className={`absolute right-0 top-0
          flex h-dvh w-[min(460px,90vw)]
          flex-col overflow-y-auto
          bg-[#101827] px-8 py-7
          shadow-2xl sm:px-12
          transition-[transform,border-radius]
          duration-[650ms]
          ease-[cubic-bezier(0.22,1,0.36,1)]
          ${
            isOpen
              ? "translate-x-0 rounded-l-none"
              : "translate-x-full rounded-l-[45%]"
          }`}
      >

        <div className="flex justify-end">
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="flex h-14 w-14 items-center justify-center
              rounded-full bg-electric text-3xl text-white
              transition-transform duration-300 hover:rotate-90"
          >
            ×
          </button>
        </div>

        <div className="mt-8">
          <p className="border-b border-white/20 pb-5
            text-xs uppercase tracking-[0.25em] text-gray-400">
            Navigation
          </p>

          <nav className="mt-8 flex flex-col gap-3 sm:gap-4">
            {links.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={onClose}
                className="group flex items-center gap-4
                  text-[clamp(1.9rem,4.2vh,3.25rem)]
                  font-light leading-[1.12] text-white
                  transition-all duration-300
                  hover:translate-x-2"
              >

                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 scale-0
                    rounded-full bg-blue-400
                    transition-transform duration-300
                    group-hover:scale-100
                    group-focus-visible:scale-100"
                />

                <span className="transition-colors group-hover:text-blue-300">
                  {item.name}
                </span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-auto pt-10">
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-gray-400">
            Socials
          </p>

          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {socialLinks.map(([name, url]) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/80
                  transition-colors hover:text-blue-400"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}
