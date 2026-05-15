"use client";
import * as React from "react";

interface EventCardVerticalProps {
  eventType: string;
  title: string;
  dateTime: string;
  location: string;
  imageUrl?: string;
  href: string;
  imageAlt?: string;
}

const EventCardVertical: React.FC<EventCardVerticalProps> = ({
  eventType,
  title,
  dateTime,
  location,
  imageUrl,
  href,
  imageAlt = "",
}) => (
  <a
    href={href}
    className="block bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
  >
    <p className="font-secondary font-bold text-xs uppercase text-ink leading-[1.4] mb-6">
      {eventType}
    </p>

    <div className="mb-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-[72px] h-[72px] rounded-full object-cover"
        />
      ) : (
        <div
          className="w-[72px] h-[72px] rounded-full bg-gray-300"
          aria-hidden="true"
        />
      )}
    </div>

    <h3 className="font-secondary font-semibold text-base leading-[1.5] text-ink line-clamp-2 mb-[4px]">
      {title}
    </h3>

    <p className="font-secondary font-normal text-sm leading-[1.45] text-ink">
      {dateTime}
    </p>

    <p className="font-secondary font-normal text-sm leading-[1.45] text-ink mb-4">
      {location}
    </p>

    <span className="font-secondary font-semibold text-base leading-[1.5] text-brand-green border-b border-brand-green">
      View Details
    </span>
  </a>
);

export default EventCardVertical;
