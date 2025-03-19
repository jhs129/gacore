"use client";
import * as React from "react";
import SupportCard, { SupportCardProps } from "./SupportCard";
import {
  FinancialIcon,
  EmotionalSupportIcon,
  PracticalHelpIcon,
} from "./SupportIcons";

export interface SupportResourcesProps {
  heading?: string;
  buttonText?: string;
  buttonUrl?: string;
  cards?: SupportCardProps[];
}

const SupportResources: React.FC<SupportResourcesProps> = ({
  heading = "Cancer affects more than your health—we're here to connect you to resources that make life easier.",
  buttonText = "View all support resources",
  buttonUrl = "#",
  cards,
}) => {
  // Default cards if none provided
  const defaultCards: SupportCardProps[] = [
    {
      iconSvg: <FinancialIcon />,
      title: "Financial Relief",
      description:
        "Cost shouldn't be a barrier to care. Financial assistance programs can help.",
      linkText: "Explore financial assistance",
      linkUrl: "#",
    },
    {
      iconSvg: <EmotionalSupportIcon />,
      title: "Emotional Support",
      description:
        "You don't have to go through this alone. Connect with others who understand.",
      linkText: "Find a support group",
      linkUrl: "#",
    },
    {
      iconSvg: <PracticalHelpIcon />,
      title: "Practical help",
      description:
        "From transportation to housing, we make it easier to focus on healing.",
      linkText: "Get practical assistance",
      linkUrl: "#",
    },
  ];

  const supportCards = cards || defaultCards;

  return (
    <section
      className="flex flex-col items-center px-20 py-20 w-full bg-white rounded-3xl max-md:px-10 max-md:py-16 max-sm:px-5 max-sm:py-10"
      aria-labelledby="support-resources-heading"
    >
      <header className="flex justify-between items-end mb-12 w-full max-md:flex-col max-md:gap-6 max-md:items-start">
        <h2
          id="support-resources-heading"
          className="text-3xl max-w-[738px] text-zinc-800 max-md:text-3xl max-sm:text-2xl"
        >
          {heading}
        </h2>
        <a
          href={buttonUrl}
          className="px-6 py-3 text-base font-semibold leading-6 text-green-900 border border-green-900 rounded-[100px] hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-green-900 focus:ring-offset-2 transition-colors"
          aria-label={buttonText}
        >
          {buttonText}
        </a>
      </header>

      <div className="flex gap-8 items-stretch w-full shadow-sm max-md:flex-col">
        {supportCards.map((card, index) => (
          <SupportCard
            key={`support-card-${index}`}
            iconSvg={card.iconSvg}
            title={card.title}
            description={card.description}
            linkText={card.linkText}
            linkUrl={card.linkUrl}
            backgroundColor={card.backgroundColor}
            iconBackgroundColor={card.iconBackgroundColor}
          />
        ))}
      </div>
    </section>
  );
};

export default SupportResources;
