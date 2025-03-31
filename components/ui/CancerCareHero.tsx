import * as React from "react";
import { useState } from "react";
import Image from "next/image";

const QuickActionButton = ({ children }: { children: React.ReactNode }) => {
  return (
    <button
      className="text-green-900 bg-green-100 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-green-900 px-4 py-2 rounded-full m-1"
      aria-label={children?.toString()}
    >
      {children}
    </button>
  );
};

const LinkWithArrow = ({ children }: { children: React.ReactNode }) => {
  return (
    <a
      href="#"
      className="flex gap-2 items-center text-green-900 hover:underline focus:outline-none focus:ring-2 focus:ring-green-900 rounded-sm"
      aria-label={children?.toString()}
    >
      <span>{children}</span>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/c8d9f2d6dd17427f0ef5b632aab33452129f51e9?placeholderIfAbsent=true"
        className="w-4 h-4"
        alt="Arrow right"
      />
    </a>
  );
};

interface CancerCareHeroProps {
  tagline?: string;
  title: string;
  searchTitle?: string;
  heroImage: string;
  heroImageAlt?: string;
}

function CancerCareHero({
  tagline = "Stronger together:",
  title = "Your trusted path to cancer care in Georgia.",
  searchTitle = "Find the care & support you need",
  heroImage = "https://cdn.builder.io/api/v1/image/assets/7bf199de15724d268c1417f75ca31ce1/1100317535e68237decbddcd2d241bfa1e1d98c9",
  heroImageAlt = "Healthcare professionals providing cancer care",
}: CancerCareHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [location, setLocation] = useState("Atlanta, GA");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery, "in", location);
  };

  return (
    <section
      className="bg-secondaryLight relative w-full overflow-hidden"
      aria-labelledby="hero-title"
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-16 min-h-[500px] lg:min-h-[600px] relative">
        <div className="flex flex-col lg:flex-row relative h-full">
          <div className="w-full lg:w-[45%] z-20">
            <div className="pr-4 lg:pr-8">
              <p className="text-xl text-[#302F2E]">{tagline}</p>
              <h1
                id="hero-title"
                className="mt-4 text-[32px] lg:text-[44px] leading-[1.2] text-[#302F2E] font-serif"
              >
                {title}
              </h1>
            </div>

            {/* Mobile Image */}
            <div className="lg:hidden relative w-full h-[300px] mt-8 rounded-lg overflow-hidden">
              <Image
                src={heroImage}
                className="object-cover"
                alt={heroImageAlt}
                fill
                sizes="100vw"
                priority
                style={{ objectPosition: "center center" }}
              />
            </div>

            <div className="mt-8 lg:mt-12 bg-white rounded-3xl p-6 lg:p-8 shadow-lg w-full lg:w-[140%] relative">
              <h2 className="text-xl text-[#302F2E]">{searchTitle}</h2>

              <form onSubmit={handleSearch} className="mt-4">
                <div className="flex flex-col gap-4">
                  <select
                    aria-label="How can we help you today?"
                    className="w-full p-4 border border-zinc-300 rounded text-[#302F2E] focus:outline-none focus:ring-2 focus:ring-green-900"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  >
                    <option value="">How can we help you today?</option>
                    <option value="find-doctor">Find a doctor</option>
                    <option value="clinical-trials">
                      Search clinical trials
                    </option>
                    <option value="financial-assistance">
                      Get financial assistance
                    </option>
                    <option value="support-group">Find a support group</option>
                  </select>

                  <div className="relative w-full">
                    <label
                      id="location-label"
                      className="absolute -top-2.5 left-4 px-1 text-xs bg-white text-zinc-600"
                    >
                      Your location
                    </label>
                    <input
                      type="text"
                      id="location"
                      className="w-full p-4 border border-zinc-300 rounded text-[#302F2E] focus:outline-none focus:ring-2 focus:ring-green-900"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      aria-labelledby="location-label"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-12 py-3 text-white bg-[#1B4332] rounded-full hover:bg-[#143728] focus:outline-none focus:ring-2 focus:ring-green-700"
                  >
                    Search
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  <QuickActionButton>Find a doctor</QuickActionButton>
                  <QuickActionButton>Search clinical trials</QuickActionButton>
                  <QuickActionButton>
                    Get financial assistance
                  </QuickActionButton>
                  <QuickActionButton>Find a support group</QuickActionButton>
                </div>
              </form>
            </div>

            <div className="mt-8 flex gap-12">
              <LinkWithArrow>For caregivers</LinkWithArrow>
              <LinkWithArrow>For providers</LinkWithArrow>
            </div>
          </div>

          {/* Desktop Image */}
          <div className="hidden lg:block absolute right-0 top-0 bottom-0 w-[55%] z-10">
            <div className="relative h-full">
              <Image
                src={heroImage}
                className="object-cover rounded-lg"
                alt={heroImageAlt}
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                priority
                style={{ objectPosition: "center center" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CancerCareHero;
