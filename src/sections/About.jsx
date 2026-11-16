"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

const details = [
  {
    label: "Currently",
    title: "CSE · 2nd Year",
    note: "Presidency University",
  },
  {
    label: "What I Build",
    title: "Full-Stack Web",
    note: "Exploring AI Automation",
  },
  {
    label: "Beyond Code",
    title: "Football & Space",
    note: "Always Curious",
  },
];

export default function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = section.querySelectorAll(
      "[data-about-enter], [data-about-headline]"
    );

    let observer;
    let frameId = 0;
    if (
      prefersReducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      targets.forEach((element) => {
        element.classList.add("is-visible");
      });
    } else {

observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const element = entry.target;

      if (entry.isIntersecting) {
        element.classList.add("is-visible");
      } else {
        const viewportBottom =
          entry.rootBounds?.bottom ??
          window.innerHeight;

        if (
          entry.boundingClientRect.top >=
          viewportBottom
        ) {
          element.classList.remove("is-visible");
        }
      }
    });
  },
  {
    threshold: 0.05,
    rootMargin: "0px 0px -5% 0px",
  }
);

      targets.forEach((element) => {
        observer.observe(element);
      });

      section.classList.add("am-motion-ready");
    }
    const updateParallax = () => {
      frameId = 0;

      if (prefersReducedMotion) return;

      const rect = section.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      if (
        rect.bottom < 0 ||
        rect.top > viewportHeight
      ) {
        return;
      }

      const progress = Math.max(
        0,
        Math.min(
          1,
          (viewportHeight - rect.top) /
            (viewportHeight + rect.height)
        )
      );

      const offset = progress - 0.5;

      section.style.setProperty(
        "--am-photo-y",
        `${-offset * 75}px`
      );

      section.style.setProperty(
        "--am-photo-rotate",
        `${offset * 2.5}deg`
      );

      section.style.setProperty(
        "--am-copy-y",
        `${-offset * 18}px`
      );

      section.style.setProperty(
        "--am-orbit-angle",
        `${progress * 250}deg`
      );

      section.style.setProperty(
        "--am-glow-y",
        `${-offset * 90}px`
      );
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(
          updateParallax
        );
      }
    };

    updateParallax();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      observer?.disconnect();

      window.removeEventListener(
        "scroll",
        handleScroll
      );

      window.removeEventListener(
        "resize",
        handleScroll
      );

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="am-section relative isolate overflow-hidden bg-[#edf2fa] text-[#081b36]"
    >

      <div
        aria-hidden="true"
        className="am-glow pointer-events-none absolute -right-40 top-[12%] -z-10 h-[600px] w-[600px] rounded-full bg-[#9ec4ff]/30 blur-[110px]"
      />

      <div className="mx-auto max-w-[1450px] px-6 py-24 md:px-12 md:py-32 xl:px-20">

        <div className="flex items-center justify-between gap-4 border-b border-[#bdcde2] pb-6">
          <span
            data-about-enter
            className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#506b92]"
          >
            01 / About
          </span>

          <div
            data-about-enter
            style={{ "--am-delay": "100ms" }}
            className="flex items-center gap-2"
          >
            <span
              aria-hidden="true"
              className="h-[7px] w-[7px] rounded-full bg-[#455ce9]"
            />

            <span className="text-[10px] uppercase tracking-[0.17em] text-[#6b7d98] sm:text-xs">
              Beyond the Code
            </span>
          </div>
        </div>

        <div className="mt-16 grid items-center gap-14 lg:mt-20 lg:grid-cols-[1.17fr_0.83fr] lg:gap-16">

          <div className="am-copy-parallax">
            <p
              data-about-enter
              className="mb-6 text-xs font-medium uppercase tracking-[0.23em] text-[#455ce9]"
            >
              Hello, I'm Sayeed
            </p>

            <h2
              data-about-headline
              className="am-headline text-[clamp(2.8rem,7.3vw,8rem)] font-medium leading-[1.02] tracking-[-0.075em]"
            >
              <span className="am-title-mask">
                <span className="am-title-line">
                  I build what
                </span>
              </span>

              <span className="am-title-mask">
                <span className="am-title-line text-[#455ce9]">
                  I imagine.
                </span>
              </span>
            </h2>

            <p
              data-about-enter
              style={{ "--am-delay": "160ms" }}
              className="mt-9 max-w-[470px] text-[clamp(1.1rem,1.75vw,1.55rem)] leading-[1.6] text-[#365070]"
            >
              I love coding because it lets me turn
              ideas into real experiences—and share
              them with the world.
            </p>
          </div>

          <figure className="relative mx-auto w-full max-w-[440px]">

            <div
              data-about-enter
              style={{ "--am-delay": "120ms" }}
            >
              <div className="am-photo-parallax relative mx-auto w-[86%] max-w-[390px]">

                <div
                  aria-hidden="true"
                  className="am-orbit-ring pointer-events-none absolute -inset-[15px] rounded-full border border-[#88a9e0]/65"
                />

                <a
                  href="/images/sayeed-about-photo.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Sayeed's portrait"
                  className="am-photo-link relative block aspect-square cursor-pointer overflow-hidden rounded-full border-[8px] border-[#dbe7f6] bg-[#dbe7f6] shadow-[0_22px_80px_rgba(29,63,125,0.13)]"
                >
                  <Image
                    width={1254}
                    height={1254}
                    src="/images/sayeed-about-photo.png"
                    alt="Sayeed Bin Salim"
                    loading="lazy"
                    className="am-photo-image h-full w-full object-cover"
                  />
                </a>
              </div>
            </div>

            <figcaption
              data-about-enter
              style={{ "--am-delay": "220ms" }}
              className="mt-11 text-center text-[10px] uppercase tracking-[0.2em] text-[#7083a0]"
            >
              The person behind the code
            </figcaption>
          </figure>
        </div>

        <div className="mt-20 grid border-t border-[#bdcde2] md:grid-cols-3 lg:mt-24">
          {details.map((item, index) => (
            <div
              key={item.label}
              data-about-enter
              style={{
                "--am-delay": `${index * 110}ms`,
              }}
              className="am-fact group relative border-b border-[#bdcde2] py-8 md:border-b-0 md:px-8 md:first:pl-0 md:last:pr-0 md:not-first:border-l"
            >
              <p className="text-[10px] uppercase tracking-[0.19em] text-[#7387a2]">
                {item.label}
              </p>

              <h3 className="am-fact-title mt-3 text-xl font-medium tracking-tight text-[#152b4c] sm:text-[1.45rem]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-[#697e9b]">
                {item.note}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-between gap-5 border-t border-[#bdcde2] pt-7">

          <p
            data-about-enter
            className="max-w-[230px] text-sm text-[#677b98]"
          >
            Curiosity drives what I create.
          </p>

          <div
            data-about-enter
            style={{ "--am-delay": "100ms" }}
          >
            <a
              href="#projects"
              className="am-work-link group inline-flex cursor-pointer items-center gap-4 text-sm font-medium text-[#172e50]"
            >
              <span className="hidden sm:inline">
                Explore my work
              </span>

              <span
                aria-hidden="true"
                className="am-work-arrow flex h-12 w-12 items-center justify-center rounded-full bg-[#455ce9] text-xl text-white"
              >
                ↗
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
