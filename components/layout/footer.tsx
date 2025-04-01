"use client";
import * as React from "react";

/**
 * Footer component displays a footer with a logo and social media icons
 */
const Footer: React.FC = () => {
  return (
    <footer
      className="flex items-center justify-between px-12 py-6 bg-primaryDark max-md:px-5"
      role="contentinfo"
    >
      <div className="flex items-center justify-between w-full max-w-[1332px] mx-auto">
        <div className="flex items-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/80429e675360772f7bf2bbf94dd9f19e9c387e0a?placeholderIfAbsent=true"
            alt="Company Logo"
            className="h-8 w-auto object-contain"
          />
        </div>
        <nav
          className="flex items-center"
          aria-label="Social Media Links"
        >
          <ul className="flex items-center gap-7 list-none p-0 m-0">
            <li>
              <a href="#" aria-label="Social Media Link">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/33ead44d6482d0acae6d8a684ff1d9d4fe3fe75b?placeholderIfAbsent=true"
                  alt="Social Media Icon"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[0.95] w-[19px]"
                />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Social Media Link">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/5d9d1d0b9db83f8fcc120d5aead169dc79a0de58?placeholderIfAbsent=true"
                  alt="Social Media Icon"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[0.95] w-[19px]"
                />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Social Media Link">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/b07ae9581a89656aea73b267fe47c07b084ef321?placeholderIfAbsent=true"
                  alt="Social Media Icon"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[0.95] w-[19px]"
                />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Social Media Link">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/33ed55dd461c128cd5abb399962f415ee5fdc57e?placeholderIfAbsent=true"
                  alt="Social Media Icon"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[0.95] w-[19px]"
                />
              </a>
            </li>
            <li>
              <a href="#" aria-label="Social Media Link">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/ea4bc43c6bc75502f0ebc3e241a22efce90f6e5c?placeholderIfAbsent=true"
                  alt="Social Media Icon"
                  className="object-contain shrink-0 self-stretch my-auto aspect-[0.95] w-[19px]"
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
