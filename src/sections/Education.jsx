"use client";

import { useEffect, useRef, useState } from "react";

const education = [
  {
    id: "university",
    level: "Undergraduate",
    title: "B.Sc. in Computer Science & Engineering",
    institution: "Presidency University",
    period: "Current · 2nd Year",
    result: "CGPA 3.92",
    field: "Computer Science & Engineering",
  },
  {
    id: "hsc",
    level: "Higher Secondary",
    title: "HSC",
    institution: "Dhaka Residential Model College",
    period: "2023 – 2024",
    result: "GPA 5.00",
    field: "Science",
  },
  {
    id: "ssc",
    level: "Secondary",
    title: "SSC",
    institution: "Darunnazat Siddikia Kamil Madrasah",
    period: "2021 – 2022",
    result: "GPA 5.00",
    field: "Science",
  },

];

export default function Education() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;

    if (!section || !timeline) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = section.querySelectorAll(
      "[data-edu-reveal]"
    );

    let observer;
    let frameId = 0;

    if (
      !reducedMotion &&
      "IntersectionObserver" in window
    ) {
      section.classList.add("edu-motion-ready");

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
                viewportBottom - 2
              ) {
                element.classList.remove(
                  "is-visible"
                );
              }
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      targets.forEach((element) => {
        observer.observe(element);
      });
    } else {
      targets.forEach((element) => {
        element.classList.add("is-visible");
      });
    }

    const updateTimeline = () => {
      frameId = 0;

      const rect = timeline.getBoundingClientRect();
      const triggerPoint = window.innerHeight * 0.72;

      const distance = Math.max(1, rect.height - 70);

      const progress = Math.max(
        0,
        Math.min(
          1,
          (triggerPoint - rect.top - 35) / distance
        )
      );

      section.style.setProperty(
        "--edu-progress",
        `${progress * 100}%`
      );
    };

    const requestUpdate = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(
          updateTimeline
        );
      }
    };

    updateTimeline();

    const resizeObserver =
      "ResizeObserver" in window
        ? new ResizeObserver(requestUpdate)
        : null;

    resizeObserver?.observe(timeline);

    window.addEventListener("scroll", requestUpdate, {
      passive: true,
    });

    window.addEventListener("resize", requestUpdate);

    return () => {
      observer?.disconnect();
      resizeObserver?.disconnect();

      window.removeEventListener(
        "scroll",
        requestUpdate
      );

      window.removeEventListener(
        "resize",
        requestUpdate
      );

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const toggleEntry = (id) => {
    setExpandedId((current) =>
      current === id ? null : id
    );
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className="edu-section relative isolate overflow-hidden text-[#081b36]"
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-20 -z-10 h-[600px] w-[600px] rounded-full bg-blue-300/20 blur-[110px]"
      />

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-32 xl:px-20">

        <div
          data-edu-reveal
          className="border-b border-[#c7d4e6] pb-7"
        >
          <div className="edu-rise flex items-center justify-between gap-4">

            <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#526a90]">
              03 / Education
            </span>

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#455ce9]" />

              <span className="text-[10px] uppercase tracking-[0.16em] text-[#647b9b] sm:text-xs">
                The Journey So Far
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 grid items-start gap-16 lg:mt-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">

          <div className="lg:sticky lg:top-28">

            <p
              data-edu-reveal
              className="mb-7"
            >
              <span className="edu-rise block text-xs font-medium uppercase tracking-[0.2em] text-[#455ce9]">
                My Academic Journey
              </span>
            </p>

            <h2 className="text-[clamp(3.6rem,7.8vw,8rem)] font-medium leading-[1.02] tracking-[-0.075em]">

              <span
                data-edu-reveal
                className="edu-title-mask"
              >
                <span className="edu-rise block">
                  Always
                </span>
              </span>

              <span
                data-edu-reveal
                className="edu-title-mask"
                style={{ "--edu-delay": "120ms" }}
              >
                <span className="edu-rise block text-[#455ce9]">
                  learning.
                </span>
              </span>
            </h2>

            <div
              data-edu-reveal
              className="mt-8 max-w-sm"
            >
              <p className="edu-rise text-base leading-relaxed text-[#647792] sm:text-lg">
                A journey of curiosity, growth
                and new possibilities.
              </p>
            </div>

            <div
              data-edu-reveal
              className="mt-14 hidden lg:block"
            >
              <div className="edu-rise">
                <span
                  aria-hidden="true"
                  className="edu-decoration text-7xl font-light text-[#455ce9]/20"
                >
                  ↘
                </span>
              </div>
            </div>
          </div>

          <div
            ref={timelineRef}
            className="edu-timeline relative"
          >

            <div
              aria-hidden="true"
              className="edu-timeline-track"
            >
              <div className="edu-timeline-fill" />
            </div>

            {education.map((item, index) => {
              const isOpen = expandedId === item.id;

              return (
                <article
                  key={item.id}
                  className={`edu-entry relative ${
                    isOpen ? "is-open" : ""
                  }`}
                >

                  <span
                    aria-hidden="true"
                    className="edu-marker"
                  />

                  <div data-edu-reveal>
                    <div
                      className="edu-rise"
                      style={{
                        "--edu-delay": `${index * 100}ms`,
                      }}
                    >

                      <button
                        type="button"
                        onClick={() =>
                          toggleEntry(item.id)
                        }
                        aria-expanded={isOpen}
                        aria-controls={`edu-detail-${item.id}`}
                        className="edu-entry-button group flex w-full cursor-pointer items-start justify-between gap-4 py-8 text-left"
                      >
                        <div className="min-w-0">

                          <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.2em] text-[#6f83a1]">
                            {item.level}
                          </p>

                          <h3 className="edu-entry-title text-xl font-medium leading-snug tracking-[-0.035em] text-[#102949] sm:text-2xl">
                            {item.title}
                          </h3>

                          <p className="mt-3 text-sm text-[#526b8f]">
                            {item.institution}
                          </p>

                          <p className="mt-2 text-xs text-[#788ba6]">
                            {item.period}
                          </p>
                        </div>

                        <span
                          aria-hidden="true"
                          className="edu-toggle-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#bdcce3] text-xl text-[#455ce9]"
                        >
                          <span
                            className={`edu-plus ${
                              isOpen ? "is-open" : ""
                            }`}
                          >
                            +
                          </span>
                        </span>
                      </button>

                      <div
                        id={`edu-detail-${item.id}`}
                        className={`edu-detail ${
                          isOpen ? "is-open" : ""
                        }`}
                        aria-hidden={!isOpen}
                      >
                        <div className="edu-detail-inner">
                          <div className="grid gap-5 border-t border-[#d1dced] pb-8 pt-6 sm:grid-cols-2">

                            <div>
                              <p className="text-[10px] uppercase tracking-[0.18em] text-[#7b8daa]">
                                Academic Result
                              </p>

                              <p className="mt-2 text-sm font-medium text-[#203a5e]">
                                {item.result}
                              </p>
                            </div>

                            <div>
                              <p className="text-[10px] uppercase tracking-[0.18em] text-[#7b8daa]">
                                Field / Group
                              </p>

                              <p className="mt-2 text-sm font-medium text-[#203a5e]">
                                {item.field}
                              </p>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div
          data-edu-reveal
          className="mt-20 border-t border-[#c7d4e6] pt-8 lg:mt-28"
        >
          <div className="edu-rise flex items-center justify-between gap-5">

            <p className="text-sm text-[#637a99]">
              Keep learning. Keep building.
            </p>

            <a
              href="#projects"
              className="edu-work-link group inline-flex cursor-pointer items-center gap-4 text-sm font-medium text-[#172e50]"
            >
              <span className="hidden sm:inline">
                Explore Projects
              </span>

              <span className="edu-work-arrow flex h-12 w-12 items-center justify-center rounded-full bg-[#455ce9] text-xl text-white">
                ↗
              </span>
            </a>
          </div>
        </div>

        <p className="mt-8 text-xs text-[#7c8eaa]">
          Sample institutions, dates and GPA values
          must be replaced before publishing.
        </p>

      </div>
    </section>
  );
}
