"use client";
import * as React from "react";

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

const ResourceCard: React.FC<CardProps> = ({
  label,
  description,
  linkText,
  linkUrl = "#",
}) => (
  <div className="flex-1 p-8 rounded-lg bg-[#F4F9F6]">
    <div className="text-xs font-bold tracking-wider uppercase text-gray-700">
      {label}
    </div>
    <div className="mt-4 text-xl leading-7 text-gray-800">{description}</div>
    <a
      href={linkUrl}
      className="flex gap-2 items-center mt-6 text-sm font-semibold text-gray-600 hover:text-gray-800"
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
        <span className="italic relative">
          transforms
          <img
            src={images.decorativeImage}
            alt=""
            className="absolute left-0 -bottom-2 w-full"
          />
        </span>
        {parts[1]}
      </h2>
    );
  };

  const renderCareHeading = (text: string) => {
    return (
      <h3 className="text-3xl text-gray-800 mb-6 md:mb-8">
        Resources for{" "}
        <span className="italic relative">
          those who care
          <img
            src={images.decorativeImage}
            alt=""
            className="absolute left-0 -bottom-2 w-full"
          />
        </span>
        , at home & in the clinic.
      </h3>
    );
  };

  return (
    <section className="px-4 md:px-16 lg:px-24 py-8 md:py-16 max-w-7xl mx-auto">
      {renderMainHeading(mainHeading)}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        {/* Advocate Section */}
        <div className="lg:col-span-7">
          <div className="p-6 md:p-8 rounded-lg bg-[#F4F9F6] relative min-h-[600px] md:min-h-[420px]">
            <div className="max-w-full md:max-w-[60%] relative z-10">
              <div className="text-xs font-bold tracking-wider uppercase text-gray-700">
                {advocateSection.title}
              </div>
              <div className="mt-4 md:mt-6 text-lg md:text-xl leading-7 text-gray-800">
                {advocateSection.description}
              </div>
              <div className="mt-6 md:mt-8">
                <div className="text-2xl font-bold text-gray-800">
                  {advocateSection.statNumber}
                </div>
                <div className="mt-2 text-base text-gray-700">
                  {advocateSection.statDescription}
                </div>
              </div>
              <a
                href={advocateSection.buttonUrl}
                className="inline-block mt-6 md:mt-8 px-6 py-2 text-sm font-semibold text-white bg-secondaryAccent rounded-full hover:bg-gray-700"
              >
                {advocateSection.buttonText}
              </a>
            </div>
            <img
              src={images.advocateImage}
              alt=""
              className="absolute right-0 bottom-0 md:bottom-0 w-[55%] md:w-[45%] h-auto"
            />
          </div>
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
