"use client";

import { useEffect, useRef } from "react";

const tickerItems = [
  "FULL-STACK DEVELOPER",
  "AI AUTOMATION",
  "REACT",
  "JAVASCRIPT",
  "NODE.JS",
  "TAILWIND CSS",
  "WEB DEVELOPMENT",
];

function TickerGroup() {
  return (
    <div className="hero-ticker-group">
      {tickerItems.map((item) => (
        <span
          key={item}
          className="flex shrink-0 items-center gap-8"
        >
          <span>{item}</span>
          <span className="text-[0.45em]">✳</span>
        </span>
      ))}
    </div>
  );
}

export default function NameTicker() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (prefersReducedMotion.matches) return;

    let frameId;
    let groupWidth = 0;
    let position = 0;
    let direction = -1;

    let lastScroll = window.scrollY;
    let lastTime = performance.now();

    const measureWidth = () => {
      const group = track.firstElementChild;

      if (group) {
        groupWidth = group.getBoundingClientRect().width;
      }
    };

    const handleScroll = () => {
      const currentScroll = window.scrollY;
      const delta = currentScroll - lastScroll;

      if (delta !== 0) {
        direction = delta > 0 ? 1 : -1;

        position += delta * 0.45;
      }

      lastScroll = currentScroll;
    };

    const animate = (time) => {
      const deltaTime = Math.min(
        (time - lastTime) / 1000,
        0.05
      );

      lastTime = time;

      if (groupWidth > 0) {
        position += direction *30  * deltaTime;
        position =
          ((position % groupWidth) + groupWidth) %
          groupWidth;

        track.style.transform = `translate3d(${
          position - groupWidth
        }px, 0, 0)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    measureWidth();

    const resizeObserver = new ResizeObserver(measureWidth);
    resizeObserver.observe(track.firstElementChild);

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="hero-ticker pointer-events-none absolute inset-x-0 bottom-[15%] z-20 overflow-hidden md:bottom-[13%]"
      aria-hidden="true"
    >
      <div
        ref={trackRef}
        className="hero-ticker-track"
      >
        <TickerGroup />
        <TickerGroup />
      </div>
    </div>
  );
}
