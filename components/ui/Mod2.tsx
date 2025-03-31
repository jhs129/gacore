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
    tabs.find((tab) => tab.isActive)?.id || tabs[0].id,
  );

  const handleTabClick = (tabId: string) => {
    setActiveTabId(tabId);
  };

  // Split cards into rows of 2 for responsive layout
  const cardRows = React.useMemo(() => {
    const rows = [];
    for (let i = 0; i < cards.length; i += 2) {
      rows.push(cards.slice(i, i + 2));
    }
    return rows;
  }, [cards]);

  return (
    <section
      className="flex flex-wrap gap-6 items-end px-40 pt-8 pb-20 max-md:px-5"
      aria-labelledby="mod2-heading"
    >
      <div className="grow shrink min-w-60 w-[437px] max-md:max-w-full">
        <h2
          id="mod2-heading"
          className="w-full text-3xl text-zinc-800 max-md:max-w-full"
        >
          {heading.includes("yours") ? (
            <>
              {heading.split("yours")[0]}
              <span style={{ fontStyle: "italic" }}>yours.</span>
            </>
          ) : (
            heading
          )}
        </h2>
        <div className="flex flex-col mt-20 w-full font-semibold max-md:mt-10 max-md:max-w-full">
          <div className="flex relative gap-10 items-center self-start pb-2 text-base border-b border-zinc-300 text-zinc-800 max-md:max-w-full">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`z-0 self-stretch my-auto ${
                  activeTabId === tab.id ? "text-zinc-800" : ""
                }`}
                onClick={() => handleTabClick(tab.id)}
                aria-selected={activeTabId === tab.id}
                role="tab"
              >
                {tab.label}
              </button>
            ))}
            <div
              className="flex absolute left-0 -bottom-px z-0 shrink-0 self-start bg-zinc-800 h-[3px] w-[131px]"
              style={{
                transform: `translateX(${
                  tabs.findIndex((tab) => tab.id === activeTabId) * 100
                }%)`,
                transition: "transform 0.3s ease",
              }}
              aria-hidden="true"
            />
          </div>
          <div className="mt-12 w-full text-base leading-6 text-slate-600 max-md:mt-10 max-md:max-w-full">
            {cardRows.map((row, rowIndex) => (
              <div
                key={`row-${rowIndex}`}
                className={`flex flex-wrap gap-6 items-center ${
                  rowIndex > 0 ? "mt-6" : ""
                } w-full max-md:max-w-full`}
              >
                {row.map((card, cardIndex) => (
                  <a
                    key={`card-${rowIndex}-${cardIndex}`}
                    href={card.linkUrl || "#"}
                    className="flex-1 shrink self-stretch p-6 my-auto bg-white rounded-lg basis-0 min-w-60 shadow-[0px_0px_8px_rgba(0,0,0,0.1)] max-md:px-5 hover:shadow-md transition-shadow"
                    aria-label={card.text}
                  >
                    <img
                      src={card.iconSrc}
                      alt=""
                      className="object-contain w-6 aspect-square"
                      aria-hidden="true"
                    />
                    <div className="flex gap-8 justify-between items-center mt-4 w-full">
                      <div className="self-stretch my-auto">{card.text}</div>
                      <img
                        src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/4f014f5428c01a5b9a62c78dd82eabc8525f9c78?placeholderIfAbsent=true"
                        alt=""
                        className="object-contain shrink-0 self-stretch my-auto w-3 aspect-[1.2]"
                        aria-hidden="true"
                      />
                    </div>
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <img
        src={imageSrc}
        alt={imageAlt}
        className="object-contain grow shrink rounded-lg aspect-[0.88] min-w-60 w-[437px] max-md:max-w-full"
      />
    </section>
  );
};

export default Mod2;
