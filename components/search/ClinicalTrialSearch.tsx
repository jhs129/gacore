import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import {
  InstantSearch,
  SearchBox,
  Hits,
  RefinementList,
  Configure,
  useInstantSearch,
} from "react-instantsearch";
import { liteClient as algoliasearch } from "algoliasearch/lite";

const searchClient = algoliasearch(
  "YZ7LZ0IN9O",
  "46802a970198ba91e1f688bba6c5e117"
);

interface RefinementSection {
  title: string;
  attribute: string;
}

interface ClinicalTrialSearchProps {
  mainTitle?: string;
  subtitle?: string;
  searchPlaceholder?: string;
  searchButtonTitle?: string;
  clearSearchButtonTitle?: string;
  refinementSections?: RefinementSection[];
  backgroundImage?: string;
}

interface HitProps {
  hit: {
    objectID: string;
    protocolSection: {
      identificationModule: {
        briefTitle: string;
        nctId: string;
      };
      descriptionModule: {
        briefSummary: string;
      };
    };
  };
}

interface RefinementSectionProps {
  title: string;
  attribute: string;
}

const RefinementSection = ({ title, attribute }: RefinementSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 sm:mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-base sm:text-lg font-medium text-gray-900 mb-2 sm:mb-4 hover:text-gray-600"
      >
        <div className="flex items-center">
          {isOpen ? (
            <ChevronDownIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          ) : (
            <ChevronRightIcon className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          )}
          <span>{title}</span>
        </div>
      </button>
      <div className={isOpen ? "block" : "hidden"}>
        <div className="[&_.ais-RefinementList-list]:list-none [&_.ais-RefinementList-list]:p-0 [&_.ais-RefinementList-list]:m-0">
          <div className="[&_.ais-RefinementList-item]:py-0.5 sm:[&_.ais-RefinementList-item]:py-1 [&_.ais-RefinementList-item:nth-child(even)]:bg-gray-50">
            <div className="[&_.ais-RefinementList-label]:flex [&_.ais-RefinementList-label]:items-center [&_.ais-RefinementList-label]:px-2 sm:[&_.ais-RefinementList-label]:px-4 [&_.ais-RefinementList-label]:py-1.5 sm:[&_.ais-RefinementList-label]:py-2 [&_.ais-RefinementList-label]:text-gray-600 [&_.ais-RefinementList-label]:text-sm">
              <div className="[&_.ais-RefinementList-checkbox]:mr-2 sm:[&_.ais-RefinementList-checkbox]:mr-3 [&_.ais-RefinementList-checkbox]:rounded [&_.ais-RefinementList-checkbox]:w-3.5 sm:[&_.ais-RefinementList-checkbox]:w-4 [&_.ais-RefinementList-checkbox]:h-3.5 sm:[&_.ais-RefinementList-checkbox]:h-4">
                <div className="[&_.ais-RefinementList-count]:ml-auto [&_.ais-RefinementList-count]:bg-gray-100 [&_.ais-RefinementList-count]:px-1.5 sm:[&_.ais-RefinementList-count]:px-2 [&_.ais-RefinementList-count]:py-0.5 [&_.ais-RefinementList-count]:rounded-full [&_.ais-RefinementList-count]:text-xs [&_.ais-RefinementList-count]:text-gray-500 [&_.ais-RefinementList-count]:min-w-[1.25rem] sm:[&_.ais-RefinementList-count]:min-w-[1.5rem] [&_.ais-RefinementList-count]:text-center">
                  <RefinementList
                    attribute={attribute}
                    limit={5}
                    showMore={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Hit = ({ hit }: HitProps) => {
  const nctId = hit.protocolSection.identificationModule.nctId;
  const url = `https://clinicaltrials.gov/study/${nctId}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 mb-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer no-underline"
    >
      <h2 className="text-xl mb-3 text-gray-800 font-medium hover:text-blue-600">
        {hit.protocolSection.identificationModule.briefTitle}
      </h2>
      <p className="text-gray-600 leading-relaxed">
        {hit.protocolSection.descriptionModule.briefSummary}
      </p>
    </a>
  );
};

const ClinicalTrialSearch = ({
  mainTitle = "Your trusted path to clinical trials.",
  subtitle = "Find the care to support your need",
  searchPlaceholder = "How can we help you today?",
  searchButtonTitle = "Search clinical trials",
  clearSearchButtonTitle = "Clear search",
  refinementSections = [
    {
      title: "Conditions",
      attribute: "protocolSection.conditionsModule.conditions",
    },
    {
      title: "Country",
      attribute: "protocolSection.contactsLocationsModule.locations.country",
    },
    {
      title: "City",
      attribute: "protocolSection.contactsLocationsModule.locations.city",
    },
  ],
  backgroundImage,
}: ClinicalTrialSearchProps) => {
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  return (
    <div className="mx-auto">
      <InstantSearch searchClient={searchClient} indexName="nih-trials">
        <div
          className={`px-4 sm:px-8 py-8 sm:py-12 bg-secondaryLight relative ${
            backgroundImage
              ? "min-h-[300px] sm:min-h-[400px] flex items-center"
              : ""
          }`}
          style={
            backgroundImage
              ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }
              : undefined
          }
        >
          {backgroundImage && (
            <div className="absolute inset-0 bg-black bg-opacity-50" />
          )}
          <div className="max-w-3xl mx-auto relative z-10">
            <h1
              className={`text-3xl sm:text-4xl font-semibold mb-2 sm:mb-3 ${
                backgroundImage ? "text-white" : "text-gray-900"
              }`}
            >
              {mainTitle}
            </h1>
            <p
              className={`text-base sm:text-lg mb-6 sm:mb-8 ${
                backgroundImage ? "text-gray-200" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>

            <div className="relative [&_.ais-SearchBox-form]:flex [&_.ais-SearchBox-form]:items-center [&_.ais-SearchBox-form]:bg-white [&_.ais-SearchBox-form]:px-4 sm:[&_.ais-SearchBox-form]:px-6 [&_.ais-SearchBox-form]:py-2 sm:[&_.ais-SearchBox-form]:py-3 [&_.ais-SearchBox-form]:rounded-full [&_.ais-SearchBox-form]:shadow-sm [&_.ais-SearchBox-form]:border [&_.ais-SearchBox-form]:border-gray-200">
              <div className="[&_.ais-SearchBox-input]:w-full [&_.ais-SearchBox-input]:text-base sm:[&_.ais-SearchBox-input]:text-lg [&_.ais-SearchBox-input]:text-gray-700 [&_.ais-SearchBox-input]:border-0 [&_.ais-SearchBox-input]:outline-none [&_.ais-SearchBox-input]:bg-transparent [&_.ais-SearchBox-input]:placeholder-gray-400">
                <div className="[&_.ais-SearchBox-submit]:p-1.5 sm:[&_.ais-SearchBox-submit]:p-2 [&_.ais-SearchBox-submit]:bg-emerald-500 [&_.ais-SearchBox-submit]:hover:bg-emerald-600 [&_.ais-SearchBox-submit]:text-white [&_.ais-SearchBox-submit]:rounded-full [&_.ais-SearchBox-submit]:w-8 sm:[&_.ais-SearchBox-submit]:w-10 [&_.ais-SearchBox-submit]:h-8 sm:[&_.ais-SearchBox-submit]:h-10 [&_.ais-SearchBox-submit]:flex [&_.ais-SearchBox-submit]:items-center [&_.ais-SearchBox-submit]:justify-center [&_.ais-SearchBox-submit]:transition-colors">
                  <div className="[&_.ais-SearchBox-submitIcon]:w-4 sm:[&_.ais-SearchBox-submitIcon]:w-5 [&_.ais-SearchBox-submitIcon]:h-4 sm:[&_.ais-SearchBox-submitIcon]:h-5">
                    <div className="[&_.ais-SearchBox-reset]:hidden">
                      <SearchBox
                        placeholder={searchPlaceholder}
                        translations={{
                          submitButtonTitle: searchButtonTitle,
                          resetButtonTitle: clearSearchButtonTitle,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-4 sm:px-8 py-6 sm:py-8">
          <Configure hitsPerPage={10} />

          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50"
            >
              <div className="flex items-center">
                <FunnelIcon className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-sm font-medium text-gray-700">
                  Filter Results
                </span>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            <div
              className={`
              fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50 lg:hidden
              ${showMobileFilters ? "opacity-100" : "opacity-0 pointer-events-none"}
            `}
            >
              <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <div
                      className={`
                      pointer-events-auto w-screen max-w-md transform transition ease-in-out duration-500
                      ${showMobileFilters ? "translate-x-0" : "translate-x-full"}
                    `}
                    >
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                          <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-medium text-gray-900">
                              Filters
                            </h2>
                            <button
                              type="button"
                              className="text-gray-400 hover:text-gray-500"
                              onClick={() => setShowMobileFilters(false)}
                            >
                              <XMarkIcon className="h-6 w-6" />
                            </button>
                          </div>
                          {refinementSections?.map((section, index) => (
                            <RefinementSection
                              key={index}
                              title={section.title}
                              attribute={section.attribute}
                            />
                          ))}
                        </div>
                        <div className="border-t border-gray-200 px-4 py-6">
                          <button
                            type="button"
                            className="w-full rounded-md bg-emerald-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-emerald-600"
                            onClick={() => setShowMobileFilters(false)}
                          >
                            Apply Filters
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-3">
              <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm sticky top-4">
                {refinementSections?.map((section, index) => (
                  <RefinementSection
                    key={index}
                    title={section.title}
                    attribute={section.attribute}
                  />
                ))}
              </div>
            </div>

            <div className="lg:col-span-9">
              <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
                <Hits hitComponent={Hit} />
              </div>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

export default ClinicalTrialSearch;
