"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import Globe from "../components/Globe";
import NameTicker from "../components/NameTicker";
import LiquidButton from "../components/LiquidButton";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    if (reducedMotion.matches) return;

    let frameId = 0;

    const updateParallax = () => {
      const scroll = Math.min(
        window.scrollY,
        hero.offsetHeight
      );

      hero.style.setProperty(
        "--photo-shift",
        `${scroll * 0.10}px`
      );

      hero.style.setProperty(
        "--text-shift",
        `${scroll * 0.18}px`
      );

      hero.style.setProperty(
        "--intro-shift",
        `${scroll * 0.08}px`
      );

      hero.style.setProperty(
        "--badge-shift",
        `${scroll * 0.12}px`
      );
    };

    const handleScroll = () => {
      cancelAnimationFrame(frameId);

      frameId = requestAnimationFrame(updateParallax);
    };

    updateParallax();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="hero-scene relative isolate h-[100svh] min-h-[680px] overflow-hidden text-white"
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[25%] h-[55vw] w-[55vw] max-h-[800px] max-w-[800px] -translate-x-1/2 rounded-full bg-blue-400/10 blur-[90px]"
      />

      <div className="hero-parallax-intro absolute left-6 top-32 z-30 md:left-[6%] md:top-[24%]">
        <div className="hero-intro">
          <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-blue-200/80 sm:text-xs">
            Hello, I'm
          </p>

          <h1 className="max-w-[230px] text-2xl font-medium leading-tight tracking-tight sm:text-4xl md:max-w-[380px]">
            Sayeed Bin Salim
          </h1>
        </div>
      </div>

      <div className="hero-parallax-photo pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-[69%] justify-center sm:h-[78%] lg:h-[90%]">
        <Image
          width={1064}
          height={1478}
          priority
          src="/images/sayeed-cutout.png"
          alt="Portrait of Sayeed Bin Salim"
          className="hero-portrait h-full w-auto max-w-none object-contain object-bottom"
        />
      </div>

      <div className="hero-parallax-badge absolute left-0 top-[49%] z-30 origin-left scale-[0.82] sm:scale-100 md:top-[47%]">
        <div className="flex items-center gap-5 rounded-r-full bg-[#101521] py-3 pl-6 pr-3 shadow-xl sm:gap-7 sm:pl-10">
          <p className="text-sm font-medium leading-snug text-white sm:text-base">
            Based in
            <br />
            Bangladesh
          </p>

          <Globe />
        </div>
      </div>

      <div className="hero-parallax-text absolute right-6 top-[30%] z-30 max-w-[165px] text-right sm:right-[6%] sm:top-[37%] sm:max-w-[300px] md:top-[35%] md:text-left">
        <div className="hero-intro">
          <span
            aria-hidden="true"
            className="mb-5 hidden text-4xl font-light sm:block"
          >
            ↘
          </span>

          <p className="text-lg font-light leading-snug tracking-tight sm:text-2xl lg:text-3xl">
            Full-Stack
            <br />
            Web Developer
          </p>

          <p className="mt-3 text-xs text-blue-200 sm:text-sm">
            AI Automation Enthusiast
          </p>
        </div>
      </div>

      <NameTicker />

      <div className="absolute inset-x-5 bottom-7 z-30 flex items-end justify-end gap-3 md:inset-x-[6%] md:justify-between">
        <div className="hidden md:block">
          <p className="text-xs uppercase tracking-[0.22em] text-white/70">
            Scroll to explore
          </p>

          <span
            aria-hidden="true"
            className="mt-2 block text-2xl"
          >
            ↓
          </span>
        </div>

       <div className="flex flex-wrap gap-3">
          <LiquidButton href="#projects">Explore Work ↗</LiquidButton>
          <LiquidButton variant="outline" href="#contact">
            Get in Touch ↗
          </LiquidButton>
        </div>


        <LiquidButton
          variant="outline"
          href="/Sayeed_Bin_Salim_Resume.pdf"
          download="Sayeed_Bin_Salim_Resume.pdf"
        >
          Download Resume ↓
        </LiquidButton>


      </div>
    </section>
  );
}
