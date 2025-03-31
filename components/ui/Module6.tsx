"use client";
import * as React from "react";

interface CardProps {
  label: string;
  title: string;
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
  title,
  description,
  linkText,
  linkUrl = "#",
  className = "",
}) => (
  <div
    className={`p-8 w-full bg-white rounded-lg min-h-[219px] shadow-[0px_0px_8px_rgba(0,0,0,0.1)] max-md:px-5 max-md:max-w-full ${className}`}
  >
    <div className="text-xs font-bold tracking-wider uppercase">{label}</div>
    <div className="mt-6 w-full text-lg leading-6">{description}</div>
    <a
      href={linkUrl}
      className="flex gap-10 justify-between items-center mt-6 w-full text-base font-semibold leading-relaxed min-h-6 text-slate-600"
    >
      <span className="self-stretch my-auto">{linkText}</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/6494ea8479abb879854a9760290e548e50836f9b?placeholderIfAbsent=true"
        className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[1.2]"
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
  <div className="flex-1 shrink p-8 rounded-lg basis-0 bg-slate-100 min-w-60 max-md:px-5 max-md:max-w-full">
    <div className="text-xs font-bold tracking-wider uppercase max-md:max-w-full">
      {label}
    </div>
    <div className="mt-8 w-full text-2xl leading-8 max-md:max-w-full">
      {description}
    </div>
    <a
      href={linkUrl}
      className="flex flex-wrap gap-10 justify-between items-center mt-8 w-full text-base font-semibold leading-relaxed min-h-6 text-slate-600 max-md:max-w-full"
    >
      <span className="self-stretch my-auto">{linkText}</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/6494ea8479abb879854a9760290e548e50836f9b?placeholderIfAbsent=true"
        className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[1.2]"
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
      "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/4c6e3051df595301792f15c75d2f46876e9f5d8a?placeholderIfAbsent=true",
    arrowIcon:
      "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/6494ea8479abb879854a9760290e548e50836f9b?placeholderIfAbsent=true",
    decorativeImage:
      "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/f93ba7ace2cb8d192b54725c0a0fbd4e24cca342?placeholderIfAbsent=true",
  },
}) => {
  const renderMainHeading = (text: string) => {
    const parts = text.split("transforms");
    return (
      <div className="text-3xl text-zinc-800 max-md:max-w-full">
        {parts[0]}
        <span style={{ fontStyle: "italic" }}>transforms</span>
        {parts[1]}
      </div>
    );
  };

  const renderCareHeading = (text: string) => {
    return (
      <div className="text-3xl max-md:max-w-full">
        Resources for{" "}
        <span style={{ fontStyle: "italic" }}>those who care,</span> at home &
        in the clinic.
      </div>
    );
  };

  return (
    <section
      className="relative px-40 py-20 max-md:px-5"
      aria-labelledby="module6-heading"
    >
      <div className="z-0 w-full max-md:max-w-full">
        <h2 id="module6-heading" className="sr-only">
          Knowledge and Action Section
        </h2>
        {renderMainHeading(mainHeading)}

        <div className="flex flex-wrap gap-6 items-center mt-12 w-full max-md:mt-10 max-md:max-w-full">
          {/* Advocate Section */}
          <div className="flex overflow-hidden flex-col grow shrink self-stretch my-auto rounded-lg min-w-60 w-[574px] max-md:max-w-full">
            <div className="flex flex-col px-8 py-10 rounded-lg bg-slate-100 min-h-[462px] max-md:px-5 max-md:max-w-full">
              <div className="w-full text-zinc-800 max-md:max-w-full">
                <div className="text-xs font-bold tracking-wider uppercase max-md:max-w-full">
                  {advocateSection.title}
                </div>
                <div className="mt-12 text-2xl max-md:mt-10 max-md:max-w-full">
                  {advocateSection.description}
                </div>
                <div className="mt-12 max-w-full w-[292px] max-md:mt-10">
                  <div className="w-full">
                    <div className="text-2xl font-bold">
                      {advocateSection.statNumber}
                    </div>
                    <div className="mt-2 text-base">
                      {advocateSection.statDescription}
                    </div>
                  </div>
                </div>
              </div>
              <a
                href={advocateSection.buttonUrl}
                className="flex flex-col justify-center items-center self-start px-6 py-2 mt-8 text-base font-semibold leading-relaxed text-white bg-slate-600 min-h-10 rounded-[100px] max-md:px-5"
              >
                <span className="gap-4 self-stretch">
                  {advocateSection.buttonText}
                </span>
              </a>
            </div>
            <img
              src={images.advocateImage}
              alt=""
              className="object-contain z-10 self-end mt-0 max-w-full aspect-[0.71] w-[277px] max-md:mt-0"
            />
          </div>

          {/* Learn and Engage Cards */}
          <div className="grow shrink self-stretch my-auto min-w-60 text-zinc-800 w-[346px] max-md:max-w-full">
            <Card {...learnCard} />
            <Card {...engageCard} className="mt-6" />
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="z-0 mt-20 w-full min-h-0 border border-solid border-zinc-800 border-opacity-20 max-md:mt-10 max-md:max-w-full" />

      {/* Care Resources Section */}
      <div className="z-0 mt-20 w-full text-zinc-800 max-md:mt-10 max-md:max-w-full">
        {renderCareHeading(careSection.heading)}
        <div className="flex flex-wrap gap-6 items-start mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <ResourceCard {...careSection.caregiverCard} />
          <ResourceCard {...careSection.providerCard} />
        </div>
      </div>

      {/* Decorative Image */}
      <img
        src={images.decorativeImage}
        alt=""
        className="object-contain absolute z-0 max-w-full aspect-[27.78] bottom-[346px] h-[7px] left-[363px] w-[195px]"
      />
    </section>
  );
};

export default Module6;
