import * as React from "react";

interface ArticleWithImageProps {
  heading: string;
  subheading?: string;
  bodyText: string;
  imageSrc: string;
  imageAlt: string;
}

const Banner50: React.FC<ArticleWithImageProps> = ({
  heading,
  subheading,
  bodyText,
  imageSrc,
  imageAlt
}) => {
  return (
    <article className="flex flex-wrap gap-10 items-center p-16 leading-6 bg-neutral-100 max-md:px-5">
      <div className="flex flex-col self-stretch my-auto min-h-[351px] min-w-[300px] w-[484px] max-md:max-w-full">
        <header className="flex flex-col w-full leading-tight whitespace-nowrap max-md:max-w-full">
          <h1 className="font-sans text-neutral-10 text-3xl tracking-tight max-md:max-w-full">
            {heading}
          </h1>
          {subheading && (
            <h2 className="mt-2 font-sans text-neutral-20 text-xl max-md:max-w-full">
              {subheading}
            </h2>
          )}
        </header>
        <div className="flex-1 shrink mt-6 w-full font-sans text-neutral-10 text-base max-md:max-w-full" dangerouslySetInnerHTML={{ __html: bodyText }} />    
      </div>
      <img
        loading="lazy"
        src={imageSrc}
        alt={imageAlt}
        className="object-contain self-stretch my-auto aspect-[1.38] min-h-[350px] min-w-[240px] w-[484px] max-md:max-w-full"
      />
    </article>
  );
}

export default Banner50;