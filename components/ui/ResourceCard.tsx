"use client";
import * as React from "react";
import { Builder } from "@builder.io/react";

interface CardProps {
  label: string;
  title?: string;
  description: string;
  linkText: string;
  linkUrl?: string;
  className?: string;
  theme?: "primaryLight" | "secondaryLight" | "secondaryAccent";
}

const ResourceCard: React.FC<CardProps> = ({
  label,
  description,
  linkText,
  linkUrl = "#",
  theme = "accent",
}) => (
  <div
    className={`flex-1 p-8 rounded-lg bg-${theme}`}
  >
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

export default ResourceCard;
