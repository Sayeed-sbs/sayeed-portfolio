"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "../data/projects";

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = section.querySelectorAll(
      "[data-project-reveal]"
    );

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
    }

    section.classList.add("projects-motion-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target;

          if (entry.isIntersecting) {
            element.classList.add("is-visible");
          } else {
            const bottom =
              entry.rootBounds?.bottom ??
              window.innerHeight;
            if (
              entry.boundingClientRect.top >=
              bottom - 2
            ) {
              element.classList.remove("is-visible");
            }
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -7% 0px",
      }
    );

    elements.forEach((element) =>
      observer.observe(element)
    );

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects-section relative isolate overflow-hidden text-white"
    >
      <div
        aria-hidden="true"
        className="projects-glow pointer-events-none absolute -right-40 top-20 -z-10 h-[650px] w-[650px] rounded-full bg-blue-600/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-[1500px] px-6 py-24 md:px-12 md:py-32 xl:px-20">

        <div
          data-project-reveal
          className="border-b border-white/20 pb-7"
        >
          <div className="projects-rise flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.22em] text-[#96acd0]">
              04 / Projects
            </span>

            <span className="flex items-center gap-3 text-[10px] uppercase tracking-[0.16em] text-[#96acd0] sm:text-xs">
              <span className="h-2 w-2 rounded-full bg-[#536dff]" />
              Selected Work
            </span>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <h2 className="text-[clamp(3.5rem,8vw,8.5rem)] font-medium leading-[1.04] tracking-[-0.075em]">

            <span
              data-project-reveal
              className="projects-title-mask"
            >
              <span className="projects-rise block">
                Selected
              </span>
            </span>

            <span
              data-project-reveal
              style={{ "--projects-delay": "130ms" }}
              className="projects-title-mask"
            >
              <span className="projects-rise block text-[#91adff]">
                work.
              </span>
            </span>
          </h2>

          <div
            data-project-reveal
            className="mt-7"
          >
            <p className="projects-rise text-base text-[#a5b8d5]">
              Ideas brought to the screen.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:mt-20 lg:grid-cols-3">

          {projects.map((project, index) => (
            <div
              key={project.slug}
              data-project-reveal
              style={{
                "--projects-delay": `${
                  (index % 3) * 110
                }ms`,
              }}
            >
              <div className="projects-rise h-full">
                <article className="projects-card group h-full overflow-hidden rounded-[26px] border border-white/15">

                  <Link
                    href={`/projects/${project.slug}`}
                    aria-label={`View details for ${project.title}`}
                    className="block h-full cursor-pointer"
                  >

                    <div className="projects-cover relative aspect-[1.45/1] overflow-hidden">

                      <Image
                        src={project.image}
                        width={project.imageWidth}
                        height={project.imageHeight}
                        sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 33vw"
                        alt={`Preview of ${project.title}`}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />

                      <span
                        aria-hidden="true"
                        className="projects-view absolute bottom-5 right-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#455ce9] text-2xl text-white"
                      >
                        ↗
                      </span>
                    </div>

                    <div className="p-6 sm:p-7">

                      <div className="flex items-center justify-between gap-3">
                        <span className="text-[11px] uppercase tracking-[0.16em] text-[#98b0d3]">
                          {project.number} / {project.category}
                        </span>

                        {project.isSample && (
                          <span className="text-[10px] uppercase tracking-wider text-[#849ac0]">
                            Sample
                          </span>
                        )}
                      </div>

                      <h3 className="mt-6 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl">
                        {project.title}
                      </h3>

                      <p className="mt-3 text-sm leading-relaxed text-[#a4b5d0]">
                        {project.summary}
                      </p>

                      <div className="mt-7 flex items-center justify-between gap-3 border-t border-white/15 pt-5">

                        <span className="text-xs text-[#91a5c7]">
                          {project.technologies
                            .slice(0, 2)
                            .join(" · ")}
                        </span>

                        <span className="projects-link-arrow text-sm text-[#91adff]">
                          View Details ↗
                        </span>
                      </div>
                    </div>
                  </Link>

                </article>
              </div>
            </div>
          ))}
        </div>

        <div
          data-project-reveal
          className="mt-20 border-t border-white/20 pt-8"
        >
          <div className="projects-rise flex items-center justify-between gap-5">
            <p className="text-sm text-[#9fb3d2]">
              Every project starts with an idea.
            </p>

            <a
              href="#contact"
              className="projects-contact-link group inline-flex cursor-pointer items-center gap-4 text-sm font-medium text-white"
            >
              <span className="hidden sm:inline">
                Let's Connect
              </span>

              <span className="projects-contact-arrow flex h-12 w-12 items-center justify-center rounded-full bg-[#455ce9] text-xl">
                ↗
              </span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
