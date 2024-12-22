import * as React from "react";

// Types
interface HeroButtonProps {
  variant: "light" | "dark";
  text: string;
  className: string;
}

interface HeroSectionProps {
  title: string;
  subtitle: string;
  heroImage: string;
  buttons: HeroButtonProps[];
}

// HeroButton Component
function HeroButton({ text, className }: HeroButtonProps) {
  return (
    <button
      className={`overflow-hidden gap-2 self-stretch p-3 my-auto rounded-lg border border-solid ${className} hover:opacity-90 focus:ring-2 focus:ring-offset-2 focus:ring-var(--color-accent-teal) transition-all`}
      type="button"
      aria-label={text}
    >
      {text}
    </button>
  );
}

// HeroSection Component
export function HeroSection({
  title,
  subtitle,
  heroImage,
  buttons,
}: HeroSectionProps) {
  return (
    <section
      className="flex relative flex-col justify-center items-center px-6 py-40 whitespace-nowrap min-h-[524px] max-md:px-5 max-md:py-24 bg-var(--color-primary-dark)"
      role="banner"
      aria-labelledby="hero-title"
    >
      <img
        loading="lazy"
        src={heroImage}
        className="object-cover absolute inset-0 size-full"
        alt=""
        role="presentation"
      />
      <div className="flex relative flex-col max-w-full leading-tight text-center text-var(--color-primary-light) w-[151px]">
        <h1
          id="hero-title"
          className="tracking-tighter font-var(--font-primary) text-4xl md:text-5xl"
        >
          {title}
        </h1>
        <p className="mt-2 font-var(--font-secondary) text-lg">{subtitle}</p>
      </div>
      <div className="flex relative gap-4 justify-center items-center mt-8 leading-none font-var(--font-secondary) text-base">
        {buttons.map((button, index) => (
          <HeroButton
            key={index}
            variant={button.variant}
            text={button.text}
            className={button.className}
          />
        ))}
      </div>
    </section>
  );
}
