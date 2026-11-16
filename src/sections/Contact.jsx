"use client";

import { useEffect, useRef } from "react";
import { profile } from "../data/profile";

import {
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";

const CONTACT = profile.contact;

const socialLinks = [
  {
    id: "facebook",
    name: "Facebook",
    subtitle: "Meta",
    icon: FaFacebookF,
    href: CONTACT.socials.facebook,
  },
  {
    id: "x",
    name: "X",
    subtitle: "Social",
    icon: null,
    href: CONTACT.socials.x,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    subtitle: "Professional",
    icon: FaLinkedinIn,
    href: CONTACT.socials.linkedin,
  },
  {
    id: "youtube",
    name: "YouTube",
    subtitle: "Videos",
    icon: FaYoutube,
    href: CONTACT.socials.youtube,
  },
  {
    id: "github",
    name: "GitHub",
    subtitle: "Code",
    icon: FaGithub,
    href: CONTACT.socials.github,
  },
  {
    id: "discord",
    name: "Discord",
    subtitle: "Community",
    icon: FaDiscord,
    href: CONTACT.socials.discord,
  },
];

function SocialCard({ social }) {
  const Icon = social.icon;
  const available = Boolean(social.href?.trim());

  const content = (
    <>
      <span className="contact-social-top">
        <span className="contact-social-symbol">
          {Icon ? (
            <Icon aria-hidden="true" />
          ) : (
            <span
              aria-hidden="true"
              className="contact-x-symbol"
            >
              𝕏
            </span>
          )}
        </span>

        <span
          aria-hidden="true"
          className="contact-social-arrow"
        >
          {available ? "↗" : "+"}
        </span>
      </span>

      <span className="contact-social-bottom">
        <span className="contact-social-name">
          {social.name}
        </span>

        <span className="contact-social-subtitle">
          {available
            ? social.subtitle
            : "Add your link"}
        </span>
      </span>
    </>
  );

  if (!available) {
    return (
      <div
        className="contact-social contact-social-pending"
        aria-label={`${social.name} link not added yet`}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={social.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Visit my ${social.name}`}
      className="contact-social contact-social-link"
    >
      {content}
    </a>
  );
}

export default function Contact() {
  const rootRef = useRef(null);

  const email = CONTACT.email.trim();
  const phone = CONTACT.phone.trim();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll(
      "[data-contact-reveal]"
    );

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (
      reducedMotion ||
      !("IntersectionObserver" in window)
    ) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });

      return;
    }

    root.classList.add("contact-motion-ready");

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
              element.classList.remove(
                "is-visible"
              );
            }
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: "0px 0px -7% 0px",
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const orbContent = (
    <>
      <span className="contact-orb-small">
        {email ? "START A CONVERSATION" : "YOUR NEXT IDEA"}
      </span>

      <span className="contact-orb-arrow">
        ↗
      </span>

      <span className="contact-orb-bottom">
        {email ? "Say hello" : "Starts here"}
      </span>
    </>
  );

  return (
    <div ref={rootRef} className="contact-root">

      <section
        id="contact"
        className="contact-section relative isolate overflow-hidden text-[#081b36]"
      >
        <div
          aria-hidden="true"
          className="contact-background-glow pointer-events-none absolute -right-40 top-20 -z-10 h-[650px] w-[650px] rounded-full bg-[#7da3f1]/20 blur-[110px]"
        />

        <div className="relative mx-auto max-w-[1500px] px-6 pb-24 pt-24 md:px-12 md:pb-32 md:pt-32 xl:px-20">

          <div
            data-contact-reveal
            className="border-b border-[#c7d4e6] pb-7"
          >
            <div className="contact-rise flex items-center justify-between gap-4">
              <span className="text-xs font-medium uppercase tracking-[0.22em] text-[#526a90]">
                05 / Contact
              </span>

              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#455ce9]" />

                <span className="text-[10px] uppercase tracking-[0.18em] text-[#647b9b] sm:text-xs">
                  Let's Connect
                </span>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-24">

            <p data-contact-reveal className="mb-7">
              <span className="contact-rise block text-xs font-medium uppercase tracking-[0.2em] text-[#455ce9]">
                Have something in mind?
              </span>
            </p>

            <h2 className="text-[clamp(3.6rem,8.4vw,9rem)] font-medium leading-[1.03] tracking-[-0.075em]">

              <span
                data-contact-reveal
                className="contact-title-mask"
              >
                <span className="contact-rise block">
                  Let's build
                </span>
              </span>

              <span
                data-contact-reveal
                className="contact-title-mask"
                style={{
                  "--contact-delay": "130ms",
                }}
              >
                <span className="contact-rise block text-[#455ce9]">
                  something.
                </span>
              </span>
            </h2>
          </div>

          <div className="mt-12 grid items-center gap-12 lg:mt-20 lg:grid-cols-[1fr_0.8fr] lg:gap-20">

            <div>
              <div data-contact-reveal>
                <div className="contact-rise">
                  <p className="max-w-xl text-lg leading-relaxed text-[#607795] sm:text-xl">
                    Have an idea worth making real?
                    A question, a project, or just
                    want to say hello? I'd love
                    to hear about it.
                  </p>
                </div>
              </div>

              <div
                data-contact-reveal
                className="mt-12"
              >
                <div className="contact-rise">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#748aa8]">
                    Email Address
                  </p>

                  {email ? (
                    <a
                      href={`mailto:${email}`}
                      className="contact-detail-link inline-block cursor-pointer break-all text-lg font-medium text-[#152c4d] sm:text-2xl"
                    >
                      {email} ↗
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-[#91a2b9] sm:text-2xl">
                      sayeedbinsalim@gmail.com
                    </p>
                  )}
                </div>
              </div>

              <div
                data-contact-reveal
                className="mt-9"
              >
                <div className="contact-rise">
                  <p className="mb-3 text-[11px] uppercase tracking-[0.2em] text-[#748aa8]">
                    Phone Number
                  </p>

                  {phone ? (
                    <a
                      href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                      className="contact-detail-link inline-block cursor-pointer text-lg font-medium text-[#152c4d] sm:text-2xl"
                    >
                      {phone} ↗
                    </a>
                  ) : (
                    <p className="text-lg font-medium text-[#91a2b9] sm:text-2xl">
                      +8801522105462
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div
              data-contact-reveal
              className="flex justify-center lg:justify-end"
            >
              <div className="contact-rise">
                {email ? (
                  <a
                    href={`mailto:${email}`}
                    aria-label="Send me an email"
                    className="contact-orb contact-orb-link"
                  >
                    {orbContent}
                  </a>
                ) : (
                  <div className="contact-orb contact-orb-disabled">
                    {orbContent}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            data-contact-reveal
            className="mt-24 border-t border-[#c7d4e6] pt-8 md:mt-32"
          >
            <div className="contact-rise flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#748aa8]">
                  Around the Internet
                </p>

                <h3 className="mt-3 text-3xl font-medium tracking-[-0.045em] text-[#102747] sm:text-4xl">
                  Find me online.
                </h3>
              </div>

              <span className="text-xs text-[#7b8ca6]">
                06 / Platforms
              </span>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">

            {socialLinks.map((social, index) => (
              <div
                key={social.id}
                data-contact-reveal
                style={{
                  "--contact-delay": `${
                    (index % 6) * 60
                  }ms`,
                }}
              >
                <div className="contact-rise h-full">
                  <SocialCard social={social} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="contact-footer relative overflow-hidden text-white">

        <div className="mx-auto max-w-[1500px] px-6 py-10 md:px-12 xl:px-20">

          <div
            data-contact-reveal
            className="contact-footer-top"
          >
            <div className="contact-rise flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

              <div>
                <p className="text-xl font-medium tracking-[-0.045em]">
                  Sayeed Bin Salim<span className="text-[#8199ff]">.</span>
                </p>

                <p className="mt-2 text-sm text-[#9aafd1]">
                  Developer · Builder · Always Learning
                </p>
              </div>

              <nav
                aria-label="Footer navigation"
                className="flex flex-wrap gap-x-6 gap-y-3"
              >
                <a href="#about" className="contact-footer-link">
                  About
                </a>

                <a href="#skills" className="contact-footer-link">
                  Skills
                </a>

                <a href="#education" className="contact-footer-link">
                  Education
                </a>

                <a href="#projects" className="contact-footer-link">
                  Projects
                </a>
              </nav>
            </div>
          </div>

          <div
            data-contact-reveal
            className="mt-10 border-t border-white/15 pt-6"
          >
            <div className="contact-rise flex flex-col gap-4 text-xs text-[#94a9ca] sm:flex-row sm:items-center sm:justify-between">

              <span>
                © {new Date().getFullYear()} Sayeed Bin Salim.
                All rights reserved.
              </span>

              <a
                href="#"
                className="contact-back-top inline-flex w-fit cursor-pointer items-center gap-3 font-medium text-white"
              >
                Back to top
                <span aria-hidden="true">
                  ↑
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
