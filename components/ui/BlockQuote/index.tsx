import * as React from "react";

export interface BlockQuoteProps {
  quote: string;
  attribution?: string;
}

const BlockQuote: React.FC<BlockQuoteProps> = ({ quote, attribution }) => {
  return (
    <blockquote className="border-l-2 border-[#F9A77E] pl-5 sm:pl-6 w-full">
      <p className="font-serif italic text-lg sm:text-[22px] leading-[135%] text-ink">
        {quote}
      </p>
      {attribution && (
        <footer className="mt-3 sm:mt-4 font-secondary text-sm sm:text-[15px] text-ink">
          {attribution}
        </footer>
      )}
    </blockquote>
  );
};

export default BlockQuote;
