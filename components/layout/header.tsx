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
      items: ["Find Treatment", "Treatment Options", "Side Effects"]
    },
    {
      name: "support",
      label: "Support Resources",
      items: ["Support Groups", "Financial Resources", "Patient Services"]
    },
    {
      name: "learn",
      label: "Learn About Cancer",
      items: ["Types of Cancer", "Prevention", "Research"]
    },
    {
      name: "involved",
      label: "Get Involved",
      items: ["Volunteer", "Donate", "Events"]
    }
  ];

  return (
    <header className="w-full relative">
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="box-border flex items-center px-12 py-3 w-full bg-secondaryLight h-[72px] max-md:px-6 max-md:py-3 max-sm:px-4 max-sm:py-3">
        <div className="mr-28">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce3fe73af90324710198629b7dbf8f28d7cb4f6f"
            className="h-12 w-[87.6px]"
            alt="GA Core Logo"
          />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="flex gap-16 ml-28 items-center px-16 py-2 bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.05)] max-md:gap-6 max-sm:hidden" aria-label="Main Navigation">
          {menuItems.map((item) => (
            <div
              key={item.name}
              className="flex relative gap-1 items-center cursor-pointer whitespace-nowrap"
              role="button"
              aria-haspopup={item.items ? "true" : undefined}
              tabIndex={0}
              aria-expanded={openDropdown === item.name}
              onClick={() => toggleDropdown(item.name)}
              onKeyDown={(event) => handleKeyDown(event, item.name)}
            >
              <span className="text-sm font-semibold leading-6 text-zinc-800 whitespace-nowrap">
                {item.label}
              </span>
              {item.items && (
                <div>
                  <svg
                    width="13"
                    height="12"
                    viewBox="0 0 13 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="dropdown-icon"
                    style={{
                      width: "12px",
                      height: "12px",
                      transform: `rotate(${openDropdown === item.name ? "180" : "0"}deg)`,
                      transition: "transform 0.2s"
                    }}
                    aria-hidden="true"
                  >
                    <path d="M6.66458 8.9292C6.83532 8.9283 6.98982 8.86273 7.11677 8.72931L10.9408 4.81171C11.0506 4.70192 11.1098 4.56612 11.1098 4.40711C11.1098 4.07906 10.8552 3.82031 10.5299 3.82031C10.3709 3.82031 10.2228 3.88409 10.1094 3.99609L6.41867 7.78123H6.90998L3.21563 3.99609C3.10545 3.8859 2.95829 3.82031 2.79427 3.82031C2.46802 3.82031 2.21429 4.07906 2.21429 4.40711C2.21429 4.56522 2.27446 4.70102 2.38244 4.81583L6.20825 8.72931C6.34345 8.86453 6.4906 8.9292 6.66458 8.9292Z" fill="currentColor" />
                  </svg>
                </div>
              )}
              {openDropdown === item.name && item.items && (
                <div
                  className="absolute left-0 top-full px-0 py-2 mt-2 bg-white rounded-lg min-w-[200px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-[100]"
                  role="menu"
                  aria-orientation="vertical"
                >
                  {item.items.map((subItem) => (
                    <a
                      key={subItem}
                      className="block px-4 py-2 no-underline text-zinc-800 hover:bg-gray-100"
                      href="#"
                      role="menuitem"
                    >
                      {subItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="hidden max-sm:flex items-center ml-auto">
          <button
            className="p-2"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="space-y-2">
              <div className={`w-8 h-0.5 bg-zinc-600 transition-transform duration-300 ${isMobileMenuOpen ? 'transform rotate-45 translate-y-2.5' : ''}`}></div>
              <div className={`w-8 h-0.5 bg-zinc-600 transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-8 h-0.5 bg-zinc-600 transition-transform duration-300 ${isMobileMenuOpen ? 'transform -rotate-45 -translate-y-2.5' : ''}`}></div>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } max-sm:block hidden`}
      >
        <div className="px-4 py-6">
          <nav className="space-y-4">
            {menuItems.map((item) => (
              <div key={item.name} className="space-y-2">
                <button
                  className="flex items-center justify-between w-full px-4 py-2 text-left text-zinc-800 font-semibold"
                  onClick={() => toggleDropdown(item.name)}
                >
                  {item.label}
                  {item.items && (
                    <svg
                      width="13"
                      height="12"
                      viewBox="0 0 13 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-300 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    >
                      <path d="M6.66458 8.9292C6.83532 8.9283 6.98982 8.86273 7.11677 8.72931L10.9408 4.81171C11.0506 4.70192 11.1098 4.56612 11.1098 4.40711C11.1098 4.07906 10.8552 3.82031 10.5299 3.82031C10.3709 3.82031 10.2228 3.88409 10.1094 3.99609L6.41867 7.78123H6.90998L3.21563 3.99609C3.10545 3.8859 2.95829 3.82031 2.79427 3.82031C2.46802 3.82031 2.21429 4.07906 2.21429 4.40711C2.21429 4.56522 2.27446 4.70102 2.38244 4.81583L6.20825 8.72931C6.34345 8.86453 6.4906 8.9292 6.66458 8.9292Z" fill="currentColor" />
                    </svg>
                  )}
                </button>
                {openDropdown === item.name && item.items && (
                  <div className="pl-4 space-y-2">
                    {item.items.map((subItem) => (
                      <a
                        key={subItem}
                        href="#"
                        className="block px-4 py-2 text-zinc-600 hover:text-zinc-800"
                      >
                        {subItem}
                      </a>
                    ))}
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
