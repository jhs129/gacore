"use client";

import * as React from "react";
import { useState } from "react";

/**
 * NavigationHeader component with dropdown menus and responsive design
 * Includes keyboard accessibility and semantic HTML structure
 */
const Header: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /**
   * Toggle dropdown menu open/closed state
   * @param name - The name of the dropdown to toggle
   */
  function toggleDropdown(name: string) {
    setOpenDropdown(openDropdown === name ? null : name);
  }

  /**
   * Handle keyboard navigation for accessibility
   * @param event - Keyboard event
   * @param name - The name of the dropdown to interact with
   */
  function handleKeyDown(event: React.KeyboardEvent, name: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown(name);
    } else if (event.key === "Escape") {
      setOpenDropdown(null);
      setIsMobileMenuOpen(false);
    }
  }

  const menuItems = [
    {
      name: "care",
      label: "Care & Treatment",
      items: [
        { label: "Find Treatment", href: "/clinical-trial-search" },
        { label: "Treatment Options", href: "/treatment-options" },
        { label: "Side Effects", href: "/side-effects" },
      ],
    },
    {
      name: "support",
      label: "Support Resources",
      href: "/support-resources",
      items: [
        { label: "Support Groups", href: "/support-groups" },
        { label: "Financial Resources", href: "/financial-resources" },
        { label: "Patient Services", href: "/patient-services" },
      ],
    },
    {
      name: "learn",
      label: "Learn About Cancer",
      href: "/learn-about-cancer",
      items: [
        { label: "Types of Cancer", href: "/cancer-types" },
        { label: "Prevention", href: "/prevention" },
        { label: "Research", href: "/research" },
      ],
    },
    {
      name: "involved",
      label: "Get Involved",
      items: [
        { label: "Volunteer", href: "/volunteer" },
        { label: "Donate", href: "/donate" },
        { label: "Events", href: "/events" },
      ],
    },
  ];

  return (
    <header className="w-full relative z-50">
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />

      {/* Mobile Header */}
      <div className="lg:hidden w-full bg-secondaryLight pt-4">
        <div className="px-4 py-3 flex justify-between items-center max-w-[1440px] mx-auto">
          <div>
            <a href="/">
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce3fe73af90324710198629b7dbf8f28d7cb4f6f"
                className="h-12 w-[87.6px]"
                alt="GA Core Logo"
              />
            </a>
          </div>
          <div className="pr-4">
            <button
              className="p-2"
              aria-label="Toggle mobile menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="space-y-2">
                <div
                  className={`w-8 h-0.5 bg-primaryDark transition-transform duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-2.5" : ""}`}
                ></div>
                <div
                  className={`w-8 h-0.5 bg-primaryDark transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`}
                ></div>
                <div
                  className={`w-8 h-0.5 bg-primaryDark transition-transform duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
                ></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:block w-full bg-secondaryLight pt-4">
        <div className="max-w-[1440px] mx-auto px-12 py-3 h-[72px] relative">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a href="/">
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce3fe73af90324710198629b7dbf8f28d7cb4f6f"
                  className="h-12 w-[87.6px]"
                  alt="GA Core Logo"
                />
              </a>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <nav
                className="bg-primaryLight rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.05)] w-[1000px]"
                aria-label="Main Navigation"
              >
                <div className="flex items-center w-full px-8 py-2">
                  <div className="flex items-center justify-between flex-1 gap-16">
                    {menuItems.map((item) => (
                      <div
                        key={item.name}
                        className="relative"
                        onClick={() => toggleDropdown(item.name)}
                        onKeyDown={(e) => handleKeyDown(e, item.name)}
                        tabIndex={0}
                      >
                        <div className="flex items-center gap-2 px-4 py-2 cursor-pointer hover:text-primary whitespace-nowrap">
                          {item.href ? (
                            <a
                              href={item.href}
                              className="text-primaryDark hover:text-primary whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {item.label}
                            </a>
                          ) : (
                            <span className="text-primaryDark whitespace-nowrap">
                              {item.label}
                            </span>
                          )}
                          {item.items && (
                            <svg
                              width="13"
                              height="12"
                              viewBox="0 0 13 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              className={`transition-transform duration-300 ${
                                openDropdown === item.name ? "rotate-180" : ""
                              }`}
                            >
                              <path
                                d="M6.66458 8.9292C6.83532 8.9283 6.98982 8.86273 7.11677 8.72931L10.9408 4.81171C11.0506 4.70192 11.1098 4.56612 11.1098 4.40711C11.1098 4.07906 10.8552 3.82031 10.5299 3.82031C10.3709 3.82031 10.2228 3.88409 10.1094 3.99609L6.41867 7.78123H6.90998L3.21563 3.99609C3.10545 3.8859 2.95829 3.82031 2.79427 3.82031C2.46802 3.82031 2.21429 4.07906 2.21429 4.40711C2.21429 4.56522 2.27446 4.70102 2.38244 4.81583L6.20825 8.72931C6.34345 8.86453 6.4906 8.9292 6.66458 8.9292Z"
                                fill="currentColor"
                              />
                            </svg>
                          )}
                        </div>
                        {openDropdown === item.name && item.items && (
                          <div className="absolute left-0 top-full px-0 py-2 mt-2 bg-primaryLight rounded-lg min-w-[200px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-[999]">
                            {item.items.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                className="block px-4 py-2 text-primaryDark hover:bg-secondaryLight whitespace-nowrap"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenDropdown(null);
                                }}
                              >
                                {subItem.label}
                              </a>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <button
                    className="ml-4 p-1.5 hover:bg-gray-50 rounded-lg transition-colors !bg-transparent !px-0 !py-0 !m-0"
                    aria-label="Search"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5 17.5L13.875 13.875M15.8333 9.16667C15.8333 12.8486 12.8486 15.8333 9.16667 15.8333C5.48477 15.8333 2.5 12.8486 2.5 9.16667C2.5 5.48477 5.48477 2.5 9.16667 2.5C12.8486 2.5 15.8333 5.48477 15.8333 9.16667Z"
                        stroke="#52525B"
                        strokeWidth="1.66667"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-primaryLight z-50 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <a href="/" className="block">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce3fe73af90324710198629b7dbf8f28d7cb4f6f"
              className="h-8"
              alt="GA Core Logo"
            />
          </a>
          <button
            className="w-8 h-8 flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 18L18 6M6 6L18 18"
                stroke="#18181B"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu Content */}
        <div className="overflow-y-auto">
          <nav className="px-6">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="border-b border-gray-100 last:border-b-0"
              >
                <button
                  className="flex items-center justify-between w-full py-4"
                  onClick={() => toggleDropdown(item.name)}
                >
                  <span className="text-lg text-gray-900">{item.label}</span>
                  {item.items && (
                    <svg
                      className={`w-5 h-5 transition-transform ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.83333 7.5L10 11.6667L14.1667 7.5"
                        stroke="#18181B"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </button>
                {item.items && (
                  <div
                    className={`${
                      openDropdown === item.name ? "max-h-48" : "max-h-0"
                    } overflow-hidden transition-all duration-300 ease-in-out`}
                  >
                    <div className="pb-3">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.label}
                          href={subItem.href}
                          className="block py-2 text-primaryDark hover:text-gray-900"
                        >
                          {subItem.label}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
