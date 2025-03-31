"use client";
import * as React from "react";

interface TabItem {
  id: string;
  label: string;
  isActive?: boolean;
}

interface CardItem {
  iconSrc: string;
  text: string;
  linkUrl?: string;
}

export interface Mod2Props {
  heading?: string;
  tabs?: TabItem[];
  cards?: CardItem[];
  imageSrc?: string;
  imageAlt?: string;
}

const Mod2: React.FC<Mod2Props> = ({
  heading = "Every cancer journey is unique. We're here to guide you through yours.",
  tabs = [
    { id: "newly-diagnosed", label: "Newly diagnosed", isActive: true },
    { id: "treatment", label: "Undergoing treatment", isActive: false },
    { id: "survivor", label: "Survivor", isActive: false },
  ],
  cards = [
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/710bb545f70f803b0cc93e61dc89c754cc801b9a?placeholderIfAbsent=true",
      text: "Find a doctor or cancer center near you",
      linkUrl: "#",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/afe4e8e029d5037450c728c791a3ef6d55f2d743?placeholderIfAbsent=true",
      text: "Understand your diagnosis & treatment",
      linkUrl: "#",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/c3ed767f9c66fdf592499e4a7111bf5f354e8811?placeholderIfAbsent=true",
      text: "Get financial & emotional support",
      linkUrl: "#",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/6bcfcbd586711c3127d1e42494d470c1701cbcd2?placeholderIfAbsent=true",
      text: "Explore additionalresources",
      linkUrl: "#",
    },
  ],
  imageSrc = "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/1fd67c6e443e2ba97e0c14d58120b749616041cf?placeholderIfAbsent=true",
  imageAlt = "Cancer support image",
}) => {
  const [activeTabId, setActiveTabId] = React.useState<string>(
    tabs.find((tab) => tab.isActive)?.id || tabs[0].id
  );

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  return (
    <section className="flex flex-col px-4 md:px-6 lg:px-16 py-6 md:py-12">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-[32px] leading-[40px] text-zinc-800 font-normal mb-6 md:mb-8">
              {heading.includes("yours") ? (
                <>
                  {heading.split("yours")[0]}
                  <span style={{ fontStyle: "italic" }}>yours</span>
                  <span>.</span>
                </>
              ) : (
                heading
              )}
            </h2>

            {/* Tabs - No bottom border on mobile */}
            <div className="mb-6 md:mb-8">
              <div className="flex gap-6 md:gap-8 relative overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`pb-2 text-sm md:text-base whitespace-nowrap ${
                      activeTabId === tab.id
                        ? "text-zinc-800 font-semibold"
                        : "text-zinc-500"
                    }`}
                    onClick={() => handleTabClick(tab.id)}
                    aria-selected={activeTabId === tab.id}
                    role="tab"
                  >
                    {tab.label}
                  </button>
                ))}
                {/* Only show border and indicator on larger screens */}
                <div className="hidden md:block absolute bottom-0 w-full h-px bg-zinc-200" />
                <div
                  className="hidden md:block absolute bottom-0 h-0.5 bg-zinc-800 transition-all duration-300"
                  style={{
                    left: `${
                      tabs.findIndex((tab) => tab.id === activeTabId) *
                      (100 / tabs.length)
                    }%`,
                    width: `${100 / tabs.length}%`,
                  }}
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* Cards - Single column on mobile */}
            <div className="flex flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
              {cards.map((card, index) => (
                <a
                  key={index}
                  href={card.linkUrl || "#"}
                  className="flex flex-col p-4 md:p-6 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <img
                    src={card.iconSrc}
                    alt=""
                    className="w-6 h-6 mb-3 md:mb-4"
                    aria-hidden="true"
                  />
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base text-slate-600 pr-4">
                      {card.text}
                    </span>
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/4f014f5428c01a5b9a62c78dd82eabc8525f9c78?placeholderIfAbsent=true"
                      alt=""
                      className="w-3 h-3 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Image - Full width on mobile */}
          <div className="flex-1 min-w-0 mt-6 md:mt-0">
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mod2;
