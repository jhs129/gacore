"use client";
import * as React from "react";

export interface CTAProps {
  title: string;
  description: string;
  statNumber: string;
  statDescription: string;
  buttonText: string;
  buttonUrl?: string;
  image?: string;
  theme?: "primaryLight" | "secondaryLight" | "secondaryAccent";
}

const CTA: React.FC<CTAProps> = ({
  title,
  description,
  statNumber,
  statDescription,
  buttonText,
  buttonUrl = "#",
  image = "https://cdn.builder.io/api/v1/image/assets/a5186b5cd9b64253b08921edb4a9fded/4c6e3051df595301792f15c75d2f46876e9f5d8a",
  theme = "accent",
}) => {
  return (
    <div
      className={`p-6 md:p-8 rounded-lg relative min-h-[600px] md:min-h-[420px] bg-${theme}`}
    >
      <div className="max-w-full md:max-w-[60%] relative z-10">
        <div className="text-xs font-bold tracking-wider uppercase text-gray-700">
          {title}
        </div>
        <div className="mt-4 md:mt-6 text-lg md:text-xl leading-7 text-gray-800">
          {description}
        </div>
        <div className="mt-6 md:mt-8">
          <div className="text-2xl font-bold text-gray-800">{statNumber}</div>
          <div className="mt-2 text-base text-gray-700">{statDescription}</div>
        </div>
        <a
          href={buttonUrl}
          className="inline-block mt-6 md:mt-8 px-6 py-2 text-sm font-semibold text-white bg-primaryAccent hover:bg-secondaryDark rounded-full transition-colors duration-300 ease-in-out"
        >
          {buttonText}
        </a>
      </div>
      <img
        src={image}
        alt=""
        className="absolute right-0 bottom-0 md:bottom-0 w-[55%] md:w-[45%] h-auto"
      />
    </div>
  );
};

export default CTA;
