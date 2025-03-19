"use client";
import * as React from "react";
import {
  FinancialIcon,
  EmotionalSupportIcon,
  PracticalHelpIcon,
} from "./SupportIcons";

export interface SupportCardProps {
  iconSvg: React.ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkUrl?: string;
  iconType: string;
  backgroundColor?: string;
  iconBackgroundColor?: string;
}

const SupportCard: React.FC<SupportCardProps> = ({
  title,
  description,
  linkText,
  iconType,
  linkUrl = "#",
  backgroundColor = "bg-white",
  iconBackgroundColor = "bg-orange-300",
}) => {

  let iconComponent;
  switch (iconType) {
    case "financial":
      iconComponent = <FinancialIcon />;
      break;
    case "emotional":
      iconComponent = <EmotionalSupportIcon />;
      break;
    case "practical":
      iconComponent = <PracticalHelpIcon />;
      break;
    default:
      iconComponent = <FinancialIcon />;
  }

  return (
    <article
      className={`flex flex-col flex-1 gap-8 items-start p-6 ${backgroundColor} rounded-lg`}
    >
      <div
        className={`flex items-center p-3 ${iconBackgroundColor} rounded-[45.176px]`}
        aria-hidden="true"
      >
        {iconComponent}
      </div>

      <div className="flex flex-col gap-2 items-start w-full">
        <h3 className="text-lg leading-6 text-zinc-800">{title}</h3>
        <p className="text-base leading-6 text-zinc-800">{description}</p>
      </div>

      <a
        href={linkUrl}
        className="group flex items-center text-green-900 font-semibold text-base hover:underline focus:outline-none focus:underline"
        aria-label={linkText}
      >
        <span>{linkText}</span>
        <svg
          className="ml-2"
          width="13"
          height="12"
          viewBox="0 0 13 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6.667 0.75C6.667 1.30614 7.216 2.1372 7.773 2.83547C8.488 3.73448 9.343 4.5201 10.324 5.1196C11.058 5.5686 11.95 6 12.667 6M12.667 6C11.95 6 11.058 6.4314 10.324 6.8804C9.343 7.4799 8.488 8.2655 7.773 9.1646C7.216 9.8628 6.667 10.6939 6.667 11.25M12.667 6H0.667"
            stroke="#285133"
            strokeWidth="0.75"
          ></path>
        </svg>
      </a>
    </article>
  );
};

export default SupportCard;
