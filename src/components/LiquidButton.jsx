export default function LiquidButton({
  children,
  href,
  onClick,
  variant = "primary",
  download = false,
}) {
  const className = `
    liquid-button
    relative inline-flex cursor-pointer
    items-center justify-center
    overflow-hidden rounded-full
    border px-6 py-3.5
    text-sm font-medium
    text-white
    transition-colors duration-300
    sm:px-8 sm:py-4
    ${
      variant === "primary"
        ? "border-electric bg-electric"
        : "border-white/40 bg-white/10"
    }
  `;

  const content = (
    <span className="relative z-10 whitespace-nowrap">
      {children}
    </span>
  );

  if (href) {
    return (
      <a
        href={href}
        download={download || undefined}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={className}
    >
      {content}
    </button>
  );
}
