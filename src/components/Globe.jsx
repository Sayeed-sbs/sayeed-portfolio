export default function Globe() {
  return (
    <div
      className="globe-shell flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white/15 sm:h-[74px] sm:w-[74px]"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        fill="none"
        className="globe-rotation h-10 w-10 sm:h-12 sm:w-12"
        stroke="white"
        strokeWidth="1.5"
      >
        <circle cx="32" cy="32" r="25" />

        <ellipse
          cx="32"
          cy="32"
          rx="12"
          ry="25"
        />

        <ellipse
          cx="32"
          cy="32"
          rx="20"
          ry="25"
        />

        <path d="M7 32H57" />
        <path d="M12 19H52" />
        <path d="M12 45H52" />
      </svg>
    </div>
  );
}
