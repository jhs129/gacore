"use client";
import * as React from "react";
import StyledItalicSpan from "./shared/StyledItalicSpan";
import ResourceCard from "./ResourceCard";
import CTA from "./CTA";

interface CardProps {
  label: string;
  title?: string;
  description: string;
  linkText: string;
  linkUrl?: string;
  className?: string;
}

export interface Module6Props {
  mainHeading?: string;
  advocateSection?: {
    title: string;
    description: string;
    statNumber: string;
    statDescription: string;
    buttonText: string;
    buttonUrl?: string;
  };
  learnCard?: CardProps;
  engageCard?: CardProps;
  careSection?: {
    heading: string;
    caregiverCard: CardProps;
    providerCard: CardProps;
  };
  images?: {
    advocateImage?: string;
    arrowIcon?: string;
    decorativeImage?: string;
  };
}

const Card: React.FC<CardProps> = ({
  label,
  description,
  linkText,
  linkUrl = "#",
  className = "",
}) => (
  <div className={`p-6 w-full bg-white rounded-lg ${className}`}>
    <div className="text-xs font-bold tracking-wider uppercase text-gray-700">
      {label}
    </div>
    <div className="mt-4 text-base leading-6 text-gray-800">{description}</div>
    <a
      href={linkUrl}
      className="flex gap-2 items-center mt-4 text-sm font-semibold text-gray-600 hover:text-gray-800"
    >
      {linkText}
      <img
        src="https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/6494ea8479abb879854a9760290e548e50836f9b"
        className="w-3 h-3"
        alt=""
      />
    </a>
  </div>
);

const Module6: React.FC<Module6Props> = ({
  mainHeading = "Knowledge empowers. Action transforms.",
  advocateSection = {
    title: "Advocate",
    description:
      "Your voice matters. Help shape the future of cancer care by advocating for funding, policy changes, and better patient support.",
    statNumber: "10k+",
    statDescription:
      "patients in Georgia have benefited from advocacy-led initiatives.",
    buttonText: "Take action now",
    buttonUrl: "#",
  },
  learnCard = {
    label: "Learn",
    title: "Stay Informed",
    description:
      "Breakthroughs happen every day. Stay informed on the latest cancer research and treatment advancements.",
    linkText: "Read the latest research",
    linkUrl: "#",
  },
  engageCard = {
    label: "Engage",
    title: "Get Involved",
    description:
      "Join a movement for change. Get involved by attending local events or volunteering in your community.",
    linkText: "Discover upcoming events",
    linkUrl: "#",
  },
  careSection = {
    heading: "Resources for those who care, at home & in the clinic.",
    caregiverCard: {
      label: "for caregivers",
      description:
        "Caring for a loved one? Get access to guidance, financial aid, and support.",
      linkText: "Explore caregiver resources",
      linkUrl: "#",
    },
    providerCard: {
      label: "for providers",
      description:
        "Be part of something bigger. Find clinical trials, access research, and more.",
      linkText: "Explore provider resources",
      linkUrl: "#",
    },
  },
  images = {
    advocateImage:
      "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/4c6e3051df595301792f15c75d2f46876e9f5d8a",
    arrowIcon:
      "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/6494ea8479abb879854a9760290e548e50836f9b",
    decorativeImage:
      "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/f93ba7ace2cb8d192b54725c0a0fbd4e24cca342",
  },
}) => {
  const renderMainHeading = (text: string) => {
    const parts = text.split("transforms");
    return (
      <h2 className="text-3xl text-gray-800 mb-8 md:mb-12">
        {parts[0]}
        <StyledItalicSpan>transforms</StyledItalicSpan>
        {parts[1]}
      </h2>
    );
  };

  const renderCareHeading = (text: string) => {
    return (
      <h3 className="text-3xl text-gray-800 mb-6 md:mb-8">
        Resources for <StyledItalicSpan>those who care</StyledItalicSpan>, at
        home & in the clinic.
      </h3>
    );
  };

  return (
    <section className="px-4 md:px-16 lg:px-24 py-8 md:py-16 max-w-7xl mx-auto">
      {renderMainHeading(mainHeading)}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Advocate Section */}
        <div className="lg:col-span-7">
          <CTA {...advocateSection} image={images.advocateImage} />
        </div>

        {/* Learn and Engage Cards */}
        <div className="lg:col-span-5 space-y-4">
          <Card {...learnCard} />
          <Card {...engageCard} />
        </div>
      </div>

      {/* Divider */}
      <div className="my-12 md:my-20 border-t border-gray-200" />

      {/* Care Resources Section */}
      <div>
        {renderCareHeading(careSection.heading)}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <ResourceCard {...careSection.caregiverCard} />
          <ResourceCard {...careSection.providerCard} />
        </div>
      </div>
    </section>
  );
};

export default Module6;
