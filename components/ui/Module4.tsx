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
    <section className="w-full relative" aria-labelledby="module4-heading">
      {/* Hero Image */}
      <div className="relative w-full">
        <img
          src={backgroundImage}
          alt=""
          className="w-full h-[400px] object-cover"
        />

        {/* Heading Container */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] px-6">
          <div className="bg-white rounded-t-2xl py-8">
            <div className="max-w-[1000px] mx-auto flex justify-between items-center gap-8">
              <h2
                id="module4-heading"
                className="text-[32px] leading-[1.2] text-gray-900 max-w-[700px]"
              >
                Cancer impacts more than your health. We're here to connect you
                to resources that support your{" "}
                <span className="italic font-serif">whole journey</span>.
              </h2>
              <a
                href={buttonUrl}
                className="inline-flex items-center px-4 py-2 text-sm text-gray-700 rounded-full border border-gray-300 hover:border-gray-400 whitespace-nowrap"
              >
                {buttonText}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Section */}
      <div className="bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
            {supportCards.map((card, index) => (
              <div key={`card-${index}`} className="flex flex-col">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 mb-4 flex-grow">
                  {card.description}
                </p>
                <a
                  href={card.linkUrl || "#"}
                  className="inline-flex items-center text-gray-700 font-medium group"
                >
                  {card.linkText}
                  <svg
                    className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.667 0.75C6.667 1.30614 7.216 2.1372 7.773 2.83547C8.488 3.73448 9.343 4.5201 10.324 5.1196C11.058 5.5686 11.95 6 12.667 6M12.667 6C11.95 6 11.058 6.4314 10.324 6.8804C9.343 7.4799 8.488 8.2655 7.773 9.1646C7.216 9.8628 6.667 10.6939 6.667 11.25M12.667 6H0.667"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Module4;
