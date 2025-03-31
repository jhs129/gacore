"use client";
import * as React from "react";
import {
  FinancialIcon,
  EmotionalSupportIcon,
  PracticalHelpIcon,
} from "./SupportIcons";

export interface Module4Props {
  backgroundImage?: string;
  heading?: string;
  buttonText?: string;
  buttonUrl?: string;
  cards?: SupportCardItem[];
}

interface SupportCardItem {
  iconType: "financial" | "emotional" | "practical";
  title: string;
  description: string;
  linkText: string;
  linkUrl?: string;
}

const Module4: React.FC<Module4Props> = ({
  backgroundImage = "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/8b87078e14ad05d684ddddf38f1c7414c9a662f7?placeholderIfAbsent=true",
  heading = "Cancer impacts more than your health. We're here to connect you to resources that support your whole journey.",
  buttonText = "View all support resources",
  buttonUrl = "#",
  cards,
}) => {
  // Default cards if none provided
  const defaultCards: SupportCardItem[] = [
    {
      iconType: "financial",
      title: "Financial Relief",
      description:
        "Cost should never be a barrier to care. Find programs that can help ease the financial burden of cancer treatment.",
      linkText: "Explore financial assistance",
      linkUrl: "#",
    },
    {
      iconType: "emotional",
      title: "Emotional Support",
      description:
        "You are not alone. Connect with people who understand and find support along the way.",
      linkText: "Find a support group",
      linkUrl: "#",
    },
    {
      iconType: "practical",
      title: "Practical help",
      description:
        "From transportation to housing, we help you focus on healing by connecting you to essential services.",
      linkText: "Get practical assistance",
      linkUrl: "#",
    },
  ];

  const supportCards = cards || defaultCards;

  // Helper function to render the appropriate icon
  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case "financial":
        return <FinancialIcon />;
      case "emotional":
        return <EmotionalSupportIcon />;
      case "practical":
        return <PracticalHelpIcon />;
      default:
        return <FinancialIcon />;
    }
  };

  return (
    <section
      className="flex flex-col justify-center py-10 md:py-20"
      aria-labelledby="module4-heading"
    >
      <div className="flex flex-col w-full max-w-full">
        <img
          src={backgroundImage}
          alt=""
          className="object-contain w-full aspect-[1.98] max-w-full"
        />
        <div className="z-10 self-center px-5 py-10 md:px-10 lg:px-20 md:py-16 lg:py-20 mt-0 -mb-4 md:-mb-8 lg:-mb-16 w-full bg-white rounded-3xl max-w-[1264px]">
          <div className="flex flex-col md:flex-row md:flex-wrap gap-5 md:gap-8 lg:gap-10 justify-between items-start md:items-end w-full min-h-[82px]">
            <h2
              id="module4-heading"
              className="text-2xl md:text-3xl text-zinc-800 w-full md:w-[70%] lg:w-[825px]"
            >
              {heading.includes("whole journey") ? (
                <>
                  {heading.split("whole journey")[0]}
                  <span className="italic">whole journey.</span>
                </>
              ) : (
                heading
              )}
            </h2>
            <a
              href={buttonUrl}
              className="flex justify-center items-center px-5 py-2 text-sm md:text-base font-semibold leading-relaxed border border-solid border-slate-600 rounded-[100px] text-slate-600 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:ring-offset-2 transition-colors"
              aria-label={buttonText}
            >
              <span>{buttonText}</span>
            </a>
          </div>
          <div className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-8 mt-8 md:mt-10 lg:mt-12 w-full shadow-[0px_0px_8px_rgba(0,0,0,0.1)]">
            {supportCards.map((card, index) => (
              <article
                key={`support-card-${index}`}
                className="flex-1 shrink-0 md:shrink p-5 md:p-6 bg-white rounded-lg md:basis-[calc(50%-1rem)] lg:basis-0 min-w-full md:min-w-[280px] lg:min-w-60"
              >
                <div
                  className="flex items-center p-3 bg-orange-300 rounded-[45.176px]"
                  aria-hidden="true"
                >
                  {renderIcon(card.iconType)}
                </div>
                <div className="mt-6 md:mt-8 w-full text-zinc-800">
                  <h3 className="text-lg leading-none">{card.title}</h3>
                  <p className="mt-2 text-base leading-6">{card.description}</p>
                </div>
                <a
                  href={card.linkUrl || "#"}
                  className="flex gap-4 md:gap-10 justify-between items-center mt-6 md:mt-8 w-full text-base font-semibold leading-relaxed text-slate-600 hover:underline focus:outline-none focus:underline"
                  aria-label={card.linkText}
                >
                  <span className="self-stretch my-auto">{card.linkText}</span>
                  <svg
                    className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[1.2]"
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6.667 0.75C6.667 1.30614 7.216 2.1372 7.773 2.83547C8.488 3.73448 9.343 4.5201 10.324 5.1196C11.058 5.5686 11.95 6 12.667 6M12.667 6C11.95 6 11.058 6.4314 10.324 6.8804C9.343 7.4799 8.488 8.2655 7.773 9.1646C7.216 9.8628 6.667 10.6939 6.667 11.25M12.667 6H0.667"
                      stroke="#475569"
                      strokeWidth="0.75"
                    ></path>
                  </svg>
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module4;
