"use client";

import * as React from "react";
import { useState } from "react";

/**
 * NavigationHeader component with dropdown menus and responsive design
 * Includes keyboard accessibility and semantic HTML structure
 */
const Header: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

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
    } else if (event.key === "Escape" && openDropdown) {
      setOpenDropdown(null);
    }
  }

  return (
    <header className="w-full">
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="box-border flex items-center px-12 py-3 w-full bg-white h-[72px] max-md:px-6 max-md:py-3 max-sm:px-4 max-sm:py-3">
        <div className="mr-28">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ce3fe73af90324710198629b7dbf8f28d7cb4f6f"
            className="h-12 w-[87.6px]"
            alt="GA Core Logo"
          />
        </div>
        <nav className="flex gap-8 items-center px-4 py-2 bg-white rounded-lg shadow-[0_4px_16px_rgba(0,0,0,0.05)] max-md:gap-6 max-sm:hidden" aria-label="Main Navigation">
          {/* Care & Treatment Dropdown */}
          <div
            className="flex relative gap-1 items-center cursor-pointer whitespace-nowrap"
            role="button"
            aria-haspopup="true"
            tabIndex={0}
            aria-expanded={openDropdown === "care"}
            onClick={() => toggleDropdown("care")}
            onKeyDown={(event) => handleKeyDown(event, "care")}
          >
            <span className="text-sm font-semibold leading-6 text-zinc-800 whitespace-nowrap">
              Care &amp; Treatment
            </span>
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
                  transform: `rotate(${openDropdown === "care" ? "180" : "0"}deg)`,
                  transition: "transform 0.2s"
                }}
                aria-hidden="true"
              >
                <path d="M6.66458 8.9292C6.83532 8.9283 6.98982 8.86273 7.11677 8.72931L10.9408 4.81171C11.0506 4.70192 11.1098 4.56612 11.1098 4.40711C11.1098 4.07906 10.8552 3.82031 10.5299 3.82031C10.3709 3.82031 10.2228 3.88409 10.1094 3.99609L6.41867 7.78123H6.90998L3.21563 3.99609C3.10545 3.8859 2.95829 3.82031 2.79427 3.82031C2.46802 3.82031 2.21429 4.07906 2.21429 4.40711C2.21429 4.56522 2.27446 4.70102 2.38244 4.81583L6.20825 8.72931C6.34345 8.86453 6.4906 8.9292 6.66458 8.9292Z" fill="currentColor" />
              </svg>
            </div>
            {openDropdown === "care" && (
              <div
                className="absolute left-0 top-full px-0 py-2 mt-2 bg-white rounded-lg min-w-[200px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-[100]"
                role="menu"
                aria-orientation="vertical"
              >
                <a
                  className="block px-4 py-2 no-underline text-zinc-800 hover:bg-gray-100"
                  href="#"
                  role="menuitem"
                >
                  Find Treatment
                </a>
                <a
                  className="block px-4 py-2 no-underline text-zinc-800 hover:bg-gray-100"
                  href="#"
                  role="menuitem"
                >
                  Treatment Options
                </a>
                <a
                  className="block px-4 py-2 no-underline text-zinc-800 hover:bg-gray-100"
                  href="#"
                  role="menuitem"
                >
                  Side Effects
                </a>
              </div>
            )}
          </div>

          {/* Support Resources Dropdown */}
          <div
            className="flex relative gap-1 items-center cursor-pointer whitespace-nowrap"
            role="button"
            aria-haspopup="true"
            tabIndex={0}
            aria-expanded={openDropdown === "support"}
            onClick={() => toggleDropdown("support")}
            onKeyDown={(event) => handleKeyDown(event, "support")}
          >
            <span className="text-sm font-semibold leading-6 text-zinc-800 whitespace-nowrap">
              Support Resources
            </span>
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
                  transform: `rotate(${openDropdown === "support" ? "180" : "0"}deg)`,
                  transition: "transform 0.2s"
                }}
                aria-hidden="true"
              >
                <path d="M6.66458 8.9292C6.83532 8.9283 6.98982 8.86273 7.11677 8.72931L10.9408 4.81171C11.0506 4.70192 11.1098 4.56612 11.1098 4.40711C11.1098 4.07906 10.8552 3.82031 10.5299 3.82031C10.3709 3.82031 10.2228 3.88409 10.1094 3.99609L6.41867 7.78123H6.90998L3.21563 3.99609C3.10545 3.8859 2.95829 3.82031 2.79427 3.82031C2.46802 3.82031 2.21429 4.07906 2.21429 4.40711C2.21429 4.56522 2.27446 4.70102 2.38244 4.81583L6.20825 8.72931C6.34345 8.86453 6.4906 8.9292 6.66458 8.9292Z" fill="currentColor" />
              </svg>
            </div>
            {openDropdown === "support" && (
              <div
                className="absolute left-0 top-full px-0 py-2 mt-2 bg-white rounded-lg min-w-[200px] shadow-[0_4px_16px_rgba(0,0,0,0.1)] z-[100]"
                role="menu"
                aria-orientation="vertical"
              >
                <a
                  className="block px-4 py-2 no-underline text-zinc-800 hover:bg-gray-100"
                  href="#"
                  role="menuitem"
                >
                  Support Groups
                </a>
                <a
                  className="block px-4 py-2 no-underline text-zinc-800 hover:bg-gray-100"
                  href="#"
                  role="menuitem"
                >
                  Financial Resources
                </a>
                <a
                  className="block px-4 py-2 no-underline text-zinc-800 hover:bg-gray-100"
                  href="#"
                  role="menuitem"
                >
                  Patient Services
                </a>
              </div>
            )}
          </div>

          {/* Learn About Cancer */}
          <div
            className="flex gap-1 items-center cursor-pointer whitespace-nowrap"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = "#learn";
              }
            }}
          >
            <span className="text-sm font-semibold leading-6 text-zinc-800 whitespace-nowrap">
              Learn About Cancer
            </span>
            <div>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="dropdown-icon"
                style={{ width: "12px", height: "12px" }}
                aria-hidden="true"
              >
                <path d="M6.66458 8.9292C6.83532 8.9283 6.98982 8.86273 7.11677 8.72931L10.9408 4.81171C11.0506 4.70192 11.1098 4.56612 11.1098 4.40711C11.1098 4.07906 10.8552 3.82031 10.5299 3.82031C10.3709 3.82031 10.2228 3.88409 10.1094 3.99609L6.41867 7.78123H6.90998L3.21563 3.99609C3.10545 3.8859 2.95829 3.82031 2.79427 3.82031C2.46802 3.82031 2.21429 4.07906 2.21429 4.40711C2.21429 4.56522 2.27446 4.70102 2.38244 4.81583L6.20825 8.72931C6.34345 8.86453 6.4906 8.9292 6.66458 8.9292Z" fill="#302F2E" />
              </svg>
            </div>
          </div>

          {/* Get Involved */}
          <div
            className="flex gap-1 items-center cursor-pointer whitespace-nowrap"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                window.location.href = "#involved";
              }
            }}
          >
            <span className="text-sm font-semibold leading-6 text-zinc-800 whitespace-nowrap">
              Get Involved
            </span>
            <div>
              <svg
                width="13"
                height="12"
                viewBox="0 0 13 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="dropdown-icon"
                style={{ width: "12px", height: "12px" }}
                aria-hidden="true"
              >
                <path d="M6.66452 8.9292C6.83526 8.9283 6.98976 8.86273 7.11671 8.72931L10.9407 4.81171C11.0505 4.70192 11.1097 4.56612 11.1097 4.40711C11.1097 4.07906 10.8551 3.82031 10.5298 3.82031C10.3708 3.82031 10.2227 3.88409 10.1093 3.99609L6.41861 7.78123H6.90992L3.21557 3.99609C3.10539 3.8859 2.95823 3.82031 2.79421 3.82031C2.46796 3.82031 2.21423 4.07906 2.21423 4.40711C2.21423 4.56522 2.2744 4.70102 2.38238 4.81583L6.20818 8.72931C6.34339 8.86453 6.49054 8.9292 6.66452 8.9292Z" fill="#302F2E" />
              </svg>
            </div>
          </div>

          {/* Search Icon */}
          <button
            className="flex items-center justify-center"
            aria-label="Search"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="search-icon"
              style={{ width: "20px", height: "20px" }}
            >
              <path d="M1.92859 8.24084C1.92859 12.0007 4.984 15.0546 8.74237 15.0546C10.1401 15.0546 11.4228 14.6251 12.4922 13.9L16.3378 17.7524C16.5785 17.9932 16.8974 18.1079 17.2331 18.1079C17.9454 18.1079 18.4549 17.5695 18.4549 16.8655C18.4549 16.5344 18.3333 16.2254 18.1033 15.9954L14.2873 12.1573C15.0862 11.0582 15.5562 9.707 15.5562 8.24084C15.5562 4.48248 12.5007 1.42857 8.74237 1.42857C4.984 1.42857 1.92859 4.48248 1.92859 8.24084ZM3.70346 8.24084C3.70346 5.46065 5.96217 3.20344 8.74237 3.20344C11.5226 3.20344 13.7797 5.46065 13.7797 8.24084C13.7797 11.0226 11.5226 13.2797 8.74237 13.2797C5.96217 13.2797 3.70346 11.0226 3.70346 8.24084Z" fill="#302F2E" />
            </svg>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="hidden max-sm:flex items-center ml-auto">
          <button
            className="p-2"
            aria-label="Toggle mobile menu"
            aria-expanded="false"
          >
            <div className="space-y-2">
              <div className="w-8 h-0.5 bg-zinc-600"></div>
              <div className="w-8 h-0.5 bg-zinc-600"></div>
              <div className="w-8 h-0.5 bg-zinc-600"></div>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
