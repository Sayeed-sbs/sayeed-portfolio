"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProjectDetails({ project }) {
  const [activeImage, setActiveImage] = useState(0);

  const gallery = project.gallery?.length
    ? project.gallery
    : [
        {
          src: project.image,
          width: project.imageWidth,
          height: project.imageHeight,
          alt: `${project.title} project screenshot`,
          caption: "Project screenshot",
        },
      ];

  const visibleImage = gallery[Math.min(activeImage, gallery.length - 1)];

  return (
    <main className="min-h-screen bg-[#edf2fa] text-[#071329]">
      <header className="border-b border-[#cbd7e8]">
        <div className="mx-auto flex max-w-[1450px] items-center justify-between gap-4 px-6 py-7 md:px-12 xl:px-20">
          <Link
            href="/"
            className="cursor-pointer text-sm font-medium tracking-tight transition-colors hover:text-[#455ce9]"
          >
            © Code by Sayeed
          </Link>
          <Link
            href="/#projects"
            className="group inline-flex cursor-pointer items-center gap-3 text-sm font-medium"
          >
            <span className="transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
              ↖
            </span>
            Back to Projects
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-[1450px] px-6 pb-28 pt-16 md:px-12 md:pt-24 xl:px-20">
        <div className="max-w-5xl">
          <p className="mb-7 text-xs uppercase tracking-[0.2em] text-[#617a9d]">
            {project.number} / {project.category}
          </p>
          <h1 className="text-[clamp(3.5rem,9vw,9rem)] font-medium leading-[1.02] tracking-[-0.075em]">
            {project.title}<span className="text-[#455ce9]">.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-xl leading-relaxed text-[#506581] md:text-2xl">
            {project.summary}
          </p>
        </div>

        <div className="mt-14 md:mt-20">
          <div className="overflow-hidden rounded-[24px] border border-[#d8e1ee] bg-[#071329] shadow-[0_25px_75px_rgba(12,34,75,0.12)]">
            <Image
              width={visibleImage.width}
              height={visibleImage.height}
              sizes="(max-width: 1024px) 100vw, 1280px"
              key={visibleImage.src}
              src={visibleImage.src}
              alt={visibleImage.alt}
              className="block h-auto max-h-[820px] w-full object-contain"
            />
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-[#607695]" aria-live="polite">
              {visibleImage.caption}
            </p>
            <span className="text-xs uppercase tracking-[0.13em] text-[#6f83a3]">
              {String(Math.min(activeImage, gallery.length - 1) + 1).padStart(2, "0")}
              {" / "}
              {String(gallery.length).padStart(2, "0")}
            </span>
          </div>
          {gallery.length > 1 && (
            <div role="group" aria-label="Project screenshots" className="mt-6 flex flex-wrap gap-4">
              {gallery.map((item, index) => (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveImage(index)}
                  aria-pressed={activeImage === index}
                  aria-label={`Show screenshot ${index + 1}: ${item.caption}`}
                  className={`group w-28 cursor-pointer overflow-hidden rounded-xl border-2 bg-[#0b1c37] text-left transition-all duration-300 sm:w-36 ${
                    activeImage === index
                      ? "border-[#455ce9] shadow-[0_0_0_2px_rgba(69,92,233,0.16)]"
                      : "border-transparent hover:-translate-y-1 hover:border-[#9db1d8]"
                  }`}
                >
                  <Image
                    width={item.width}
                    height={item.height}
                    sizes="150px"
                    src={item.src}
                    alt=""
                    loading="lazy"
                    className="aspect-[1.45/1] w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="mt-20 grid gap-14 border-b border-[#cbd7e8] pb-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#617a9d]">01 / Overview</p>
            <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-4xl">About the project</h2>
            <p className="max-w-2xl text-lg leading-[1.85] text-[#516784]">{project.description}</p>
          </div>
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#617a9d]">02 / Technology</p>
            <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-4xl">Built with</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span key={tech} className="rounded-full border border-[#bfcee2] px-5 py-3 text-sm text-[#344d70]">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-14 border-b border-[#cbd7e8] py-16 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#617a9d]">03 / Challenges</p>
            <h2 className="mb-8 text-3xl font-medium tracking-tight md:text-4xl">What I worked through.</h2>
            <div className="space-y-5">
              {project.challenges.map((challenge, index) => (
                <div key={index} className="flex gap-5 border-b border-[#d3deeb] pb-5">
                  <span className="text-xs text-[#455ce9]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-base leading-relaxed text-[#526782]">{challenge}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-6 text-xs uppercase tracking-[0.2em] text-[#617a9d]">04 / What's next</p>
            <h2 className="mb-8 text-3xl font-medium tracking-tight md:text-4xl">Future improvements.</h2>
            <div className="space-y-5">
              {project.improvements.map((improvement, index) => (
                <div key={index} className="flex gap-5 border-b border-[#d3deeb] pb-5">
                  <span className="text-xs text-[#455ce9]">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-base leading-relaxed text-[#526782]">{improvement}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="mb-8 text-xs uppercase tracking-[0.2em] text-[#617a9d]">05 / Explore</p>
          <div className="flex flex-wrap gap-4">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-4 rounded-full bg-[#455ce9] px-7 py-4 font-medium text-white transition-all hover:-translate-y-1 hover:bg-[#2a41cd]"
              >
                Live Website ↗
              </a>
            ) : (
              <span className="rounded-full border border-[#bfcee2] px-7 py-4 text-sm text-[#70829d]">Live link not added</span>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex cursor-pointer items-center gap-4 rounded-full bg-[#071b39] px-7 py-4 font-medium text-white transition-all hover:-translate-y-1 hover:bg-[#455ce9]"
              >
                GitHub Repository ↗
              </a>
            ) : (
              <span className="rounded-full border border-[#bfcee2] px-7 py-4 text-sm text-[#70829d]">GitHub link not added</span>
            )}
          </div>
        </div>

        <div className="mt-24 border-t border-[#cbd7e8] pt-9">
          <Link href="/#projects" className="group inline-flex cursor-pointer items-center gap-4 text-lg font-medium text-[#1c3456]">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#455ce9] text-xl text-white transition-transform group-hover:-translate-x-1">
              ←
            </span>
            All Projects
          </Link>
        </div>
      </div>
    </main>
  );
}
