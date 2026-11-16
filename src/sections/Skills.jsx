"use client";

import { useEffect, useRef, useState } from "react";

import {
  SiHtml5,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiTailwindcss,
  SiDaisyui,
  SiNextdotjs,
  SiNodedotjs,
  SiMongodb,
  SiN8N,
  SiGit,
  SiGithub,
  SiVite,
} from "react-icons/si";

import { FaCss3Alt } from "react-icons/fa";

const categories = [
  { id: "all", name: "All" },
  { id: "web", name: "Web" },
  { id: "ui", name: "Frameworks & UI" },
  { id: "backend", name: "Backend & AI" },
  { id: "tools", name: "Dev Tools" },
];

const technologies = [
  {
    id: "html",
    name: "HTML5",
    category: "web",
    type: "Markup",
    description: "Semantic web structure.",
    color: "#E34F26",
    icon: SiHtml5,
  },
  {
    id: "css",
    name: "CSS3",
    category: "web",
    type: "Styling",
    description: "Responsive layouts and animations.",
    color: "#3997E6",
    icon: FaCss3Alt,
  },
  {
    id: "javascript",
    name: "JavaScript",
    category: "web",
    type: "Programming",
    description: "Interactive web experiences.",
    color: "#F7DF1E",
    icon: SiJavascript,
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "web",
    type: "Programming",
    description: "Type-safe JavaScript.",
    color: "#3178C6",
    icon: SiTypescript,
  },
  {
    id: "react",
    name: "React",
    category: "ui",
    type: "Frontend",
    description: "Component-based interfaces.",
    color: "#61DAFB",
    icon: SiReact,
  },
  {
    id: "tailwind",
    name: "Tailwind CSS",
    category: "ui",
    type: "Styling",
    description: "Modern responsive design.",
    color: "#38BDF8",
    icon: SiTailwindcss,
  },
  {
    id: "daisyui",
    name: "DaisyUI",
    category: "ui",
    type: "UI Components",
    description: "Customizable Tailwind components.",
    color: "#A78BFA",
    icon: SiDaisyui,
  },
  {
    id: "nextjs",
    name: "Next.js",
    category: "ui",
    type: "Framework",
    description: "Full-stack React applications.",
    color: "#FFFFFF",
    icon: SiNextdotjs,
  },
  {
    id: "node",
    name: "Node.js",
    category: "backend",
    type: "Runtime",
    description: "Server-side JavaScript.",
    color: "#83CD29",
    icon: SiNodedotjs,
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "backend",
    type: "Database",
    description: "Document-oriented data storage.",
    color: "#47A248",
    icon: SiMongodb,
  },
  {
    id: "n8n",
    name: "n8n",
    category: "backend",
    type: "Automation",
    description: "Automated workflows.",
    color: "#FF6D5A",
    icon: SiN8N,
  },
  {
    id: "git",
    name: "Git",
    category: "tools",
    type: "Version Control",
    description: "Tracking code changes.",
    color: "#F05032",
    icon: SiGit,
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools",
    type: "Collaboration",
    description: "Code hosting and collaboration.",
    color: "#FFFFFF",
    icon: SiGithub,
  },
  {
    id: "vite",
    name: "Vite",
    category: "tools",
    type: "Build Tool",
    description: "Fast frontend development.",
    color: "#A78BFA",
    icon: SiVite,
  },
];

export default function Skills() {
  const sectionRef = useRef(null);

  const [selectedId, setSelectedId] = useState("react");
  const [activeCategory, setActiveCategory] = useState("all");

  const selectedSkill =
    technologies.find((skill) => skill.id === selectedId) ??
    technologies[0];

  const SelectedIcon = selectedSkill.icon;

  const visibleSkills =
    activeCategory === "all"
      ? technologies
      : technologies.filter(
          (skill) => skill.category === activeCategory
        );

  const selectCategory = (categoryId) => {
    setActiveCategory(categoryId);

    if (
      categoryId !== "all" &&
      selectedSkill.category !== categoryId
    ) {
      const firstSkill = technologies.find(
        (skill) => skill.category === categoryId
      );

      if (firstSkill) {
        setSelectedId(firstSkill.id);
      }
    }
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const elements = section.querySelectorAll(
      "[data-skills-reveal]"
    );

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    section.classList.add("skills-motion-ready");

    const observer = new IntersectionObserver(
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
              element.classList.remove("is-visible");
            }
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -6% 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [activeCategory]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
    ) {
      return;
    }

    let frameId = 0;

    const updateMotion = () => {
      frameId = 0;

      const rect = section.getBoundingClientRect();
      const viewport = window.innerHeight;

      if (rect.bottom < 0 || rect.top > viewport) {
        return;
      }

      const progress = Math.max(
        0,
        Math.min(
          1,
          (viewport - rect.top) /
            (viewport + rect.height)
        )
      );

      section.style.setProperty(
        "--skills-glow-y",
        `${(progress - 0.5) * -150}px`
      );

      section.style.setProperty(
        "--skills-orbit-angle",
        `${progress * 230}deg`
      );
    };

    const handleScroll = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(updateMotion);
      }
    };

    updateMotion();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="skills-section relative isolate overflow-hidden text-white"
    >

      <div
        aria-hidden="true"
        className="skills-backlight pointer-events-none absolute -right-40 top-20 -z-10 h-[700px] w-[700px] rounded-full bg-blue-500/10 blur-[110px]"
      />

      <div
        aria-hidden="true"
        className="skills-orbit pointer-events-none absolute -bottom-24 -left-48 -z-10 h-[430px] w-[430px] rounded-full border border-white/10"
      />

      <div className="relative mx-auto max-w-[1500px] px-6 py-20 md:px-12 md:py-28 xl:px-20">

        <div
          data-skills-reveal
          className="border-b border-white/20 pb-6"
        >
          <div className="skills-rise flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.2em] text-blue-200/75">
              02 / Skills
            </span>

            <span className="text-xs uppercase tracking-[0.18em] text-blue-200/65">
              My Toolkit
            </span>
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <h2 className="text-[clamp(3.5rem,8vw,8rem)] font-medium leading-[1.04] tracking-[-0.07em]">

            <span
              data-skills-reveal
              className="skills-title-mask"
            >
              <span className="skills-rise block">
                Tools I build
              </span>
            </span>

            <span
              data-skills-reveal
              className="skills-title-mask"
              style={{ "--skills-delay": "120ms" }}
            >
              <span className="skills-rise block text-[#91adff]">
                with.
              </span>
            </span>
          </h2>
        </div>

        <div className="mt-14 grid items-start gap-10 lg:mt-20 lg:grid-cols-[0.88fr_1.12fr] lg:gap-14">

          <div
            data-skills-reveal
            className="lg:sticky lg:top-24"
          >
            <div className="skills-rise">
              <div
                id="skills-spotlight"
                className="skills-feature relative overflow-hidden rounded-[28px] border border-white/15 p-6 sm:p-8"
                style={{
                  "--skill-accent": selectedSkill.color,
                }}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9cafd0]">
                    Technology Spotlight
                  </span>

                  <span className="text-[#91adff]">✳</span>
                </div>

                <div className="relative flex h-[200px] items-center justify-center sm:h-[250px]">

                  <div
                    aria-hidden="true"
                    className="skills-feature-halo absolute h-[170px] w-[170px] rounded-full border border-white/10 sm:h-[215px] sm:w-[215px]"
                  />

                  <div
                    key={selectedSkill.id}
                    className="skills-active-icon relative z-10"
                  >
                    <SelectedIcon
                      aria-hidden="true"
                      className="h-24 w-24 sm:h-28 sm:w-28"
                      style={{
                        color: selectedSkill.color,
                      }}
                    />
                  </div>
                </div>

                <div
                  aria-live="polite"
                  className="relative z-10 border-t border-white/15 pt-5"
                >
                  <span className="text-[11px] uppercase tracking-[0.16em] text-[#91a5c7]">
                    {selectedSkill.type}
                  </span>

                  <h3 className="mt-3 text-3xl font-medium">
                    {selectedSkill.name}
                  </h3>

                  <p className="mt-2 text-sm text-[#a4b5d0]">
                    {selectedSkill.description}
                  </p>
                </div>

                <div className="relative z-10 mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="text-xs text-[#91a5c7]">
                    {technologies.length} technologies
                  </span>

                  <span className="text-xs text-[#91adff]">
                    Select a skill ↗
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div>

            <div
              data-skills-reveal
              className="mb-7"
            >
              <div className="skills-rise">
                <p className="mb-4 text-[11px] uppercase tracking-[0.2em] text-[#8ca4c9]">
                  Filter Technologies
                </p>

                <div
                  role="group"
                  aria-label="Filter technologies"
                  className="flex flex-wrap gap-2"
                >
                  {categories.map((category) => {
                    const count =
                      category.id === "all"
                        ? technologies.length
                        : technologies.filter(
                            (skill) =>
                              skill.category === category.id
                          ).length;

                    const isActive =
                      activeCategory === category.id;

                    return (
                      <button
                        key={category.id}
                        type="button"
                        onClick={() =>
                          selectCategory(category.id)
                        }
                        aria-pressed={isActive}
                        className={`skills-filter cursor-pointer rounded-full border px-4 py-2.5 text-xs font-medium sm:text-sm ${
                          isActive ? "is-active" : ""
                        }`}
                      >
                        {category.name}
                        <span className="ml-2 opacity-60">
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">

              {visibleSkills.map((skill, index) => {
                const Icon = skill.icon;
                const isSelected =
                  selectedId === skill.id;

                return (
                  <div
                    key={skill.id}
                    data-skills-reveal
                    style={{
                      "--skills-delay": `${
                        (index % 4) * 65
                      }ms`,
                    }}
                  >
                    <div className="skills-rise h-full">
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedId(skill.id)
                        }
                        aria-pressed={isSelected}
                        aria-controls="skills-spotlight"
                        className={`skills-tile group relative flex h-full min-h-[105px] w-full cursor-pointer flex-col justify-center gap-3 overflow-hidden rounded-2xl border p-3 text-left sm:min-h-[90px] sm:flex-row sm:items-center sm:justify-start sm:p-4 ${
                          isSelected ? "is-selected" : ""
                        }`}
                      >
                        <Icon
                          aria-hidden="true"
                          className="skills-tile-icon relative z-10 h-7 w-7 shrink-0 sm:h-8 sm:w-8"
                          style={{
                            color: skill.color,
                          }}
                        />

                        <span className="relative z-10 min-w-0">
                          <span className="block text-sm font-medium leading-tight text-white sm:text-base">
                            {skill.name}
                          </span>

                          <span className="mt-1 block text-[10px] leading-tight text-[#91a5c7] sm:text-xs">
                            {skill.type}
                          </span>
                        </span>

                        <span
                          aria-hidden="true"
                          className="skills-tile-arrow absolute right-3 top-3 text-sm text-[#91adff]"
                        >
                          ↗
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              data-skills-reveal
              className="mt-5"
            >
              <div className="skills-rise flex items-center justify-between border-t border-white/15 pt-5">
                <span className="text-xs text-[#8399bb]">
                  Showing {visibleSkills.length} of{" "}
                  {technologies.length} technologies
                </span>

                <span className="text-xs text-[#91adff]">
                  Select to explore
                </span>
              </div>
            </div>
          </div>
        </div>

        <div
          data-skills-reveal
          className="mt-20 border-t border-white/20 pt-8"
        >
          <div className="skills-rise flex items-center justify-between gap-5">

            <p className="text-sm text-[#a4b5d0]">
              New tools. New possibilities.
            </p>

            <a
              href="#projects"
              className="skills-work-link group inline-flex cursor-pointer items-center gap-3 text-sm"
            >
              <span className="hidden sm:inline">
                Explore Projects
              </span>

              <span className="skills-work-arrow flex h-12 w-12 items-center justify-center rounded-full bg-[#455ce9] text-xl text-white">
                ↗
              </span>
            </a>

          </div>
        </div>
      </div>
    </section>
  );
}
