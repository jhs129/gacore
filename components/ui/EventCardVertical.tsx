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
    aria-label={`View details for ${title}`}
    className="block bg-white p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-green"
  >
    <p className="font-secondary font-bold text-xs uppercase text-ink leading-label mb-6">
      {eventType}
    </p>

    <div className="mb-4">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={imageAlt}
          className="w-18 h-18 rounded-full object-cover"
        />
      ) : (
        <div
          className="w-18 h-18 rounded-full bg-gray-300"
          aria-hidden="true"
        />
      )}
    </div>

    <h3 className="font-secondary font-semibold text-base leading-normal text-ink line-clamp-2 mb-1">
      {title}
    </h3>

    <p className="font-secondary font-normal text-sm leading-body text-ink">
      {dateTime}
    </p>

    <p className="font-secondary font-normal text-sm leading-body text-ink mb-4">
      {location}
    </p>

    <span aria-hidden="true" className="font-secondary font-semibold text-base leading-normal text-brand-green border-b border-brand-green">
      View Details
    </span>
  </a>
);

export default EventCardVertical;
