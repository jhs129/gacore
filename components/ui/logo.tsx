import React from "react";
import Image from "next/image";

interface LogoProps {
    image: string;
    alt: string;
}

const Logo: React.FC<LogoProps> = ({ image, alt }) => {
    return (
        <Image
            loading="lazy"
            src={image}
            className="object-contain w-full aspect-[1.82] max-w-[219px]"
            alt={alt}
            layout="responsive"
            width={219}
            height={120}
        />
    );
};

export default Logo;
