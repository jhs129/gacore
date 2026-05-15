import * as React from "react";

type CTAButtonVariant = "filled-green" | "outlined-green" | "outlined-white" | "link-underlined";
type CTAButtonSize = "sm" | "md";

interface CTAButtonProps {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?: CTAButtonVariant;
  size?: CTAButtonSize;
  external?: boolean;
  className?: string;
}

const variantClasses: Record<CTAButtonVariant, string> = {
  "filled-green":
    "bg-brand-green text-white border border-brand-green rounded-full hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green",
  "outlined-green":
    "bg-transparent text-brand-green border border-brand-green rounded-full hover:bg-brand-green hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green",
  "outlined-white":
    "bg-transparent text-white border border-white rounded-full hover:bg-white hover:text-brand-green focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
  "link-underlined":
    "text-brand-green border-b border-brand-green leading-normal hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green",
};

const sizeClasses: Record<CTAButtonSize, string> = {
  sm: "px-6 py-2 text-sm",
  md: "px-6 py-2.5 text-[15px]",
};

const CTAButton: React.FC<CTAButtonProps> = ({
  label,
  href,
  onClick,
  variant = "filled-green",
  size = "md",
  external = false,
  className = "",
}) => {
  const isLink = variant === "link-underlined";
  const baseClasses = `font-secondary font-semibold leading-6 transition-colors duration-200 inline-block ${
    isLink ? "" : sizeClasses[size]
  } ${variantClasses[variant]} ${className}`.trim();

  if (href) {
    return (
      <a
        href={href}
        className={baseClasses}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {label}
        {external && <span className="sr-only"> (opens in new tab)</span>}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {label}
    </button>
  );
};

export default CTAButton;
