import { InstantSearch, SearchBox, Hits, RefinementList, Configure, useInstantSearch, useConnector } from 'react-instantsearch';
import { liteClient as algoliasearch } from "algoliasearch/lite";
import connectAutocomplete from 'instantsearch.js/es/connectors/autocomplete/connectAutocomplete';
import React, { useEffect } from 'react';

const searchClient = algoliasearch('YZ7LZ0IN9O', '46802a970198ba91e1f688bba6c5e117');

// Create a context for location data
const LocationContext = React.createContext<{
  userLocation: { lat: number; lng: number } | null;
  isLoadingLocation: boolean;
  locationError: string | null;
}>({
  userLocation: null,
  isLoadingLocation: true,
  locationError: null,
});

// Location Provider component
function LocationProvider({ children }: { children: React.ReactNode }) {
  const [userLocation, setUserLocation] = React.useState<{ lat: number; lng: number } | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = React.useState(true);
  const [locationError, setLocationError] = React.useState<string | null>(null);

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          setLocationError(error.message);
          setIsLoadingLocation(false);
        }
      );
    } else {
      setLocationError('Geolocation is not supported by your browser');
      setIsLoadingLocation(false);
    }
  }, []);

  return (
    <LocationContext.Provider value={{ userLocation, isLoadingLocation, locationError }}>
      {children}
    </LocationContext.Provider>
  );
}

const DoctorHit = ({ hit }: any) => {
  const { userLocation } = React.useContext(LocationContext);
  
  // Format distance if available
  const formatDistance = (meters: number) => {
    const miles = meters * 0.000621371;
    return `${miles.toFixed(1)} miles`;
  };

  return (
    <div className="p-6 border border-neutral-80 rounded-lg hover:shadow-md transition-shadow bg-neutral-100">
      <div className="flex gap-6 items-start">
        <div className="flex-shrink-0">
          <img 
            src={hit.imageUrl} 
            alt={`Dr. ${hit.name}`}
            className="w-24 h-24 rounded-full object-cover border-2 border-neutral-80"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div className="space-y-3">
              <h2 className="text-2xl font-semibold text-neutral-20">{hit.name}</h2>
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="text-neutral-40">Specialties: </span>
                  <span className="text-neutral-20">{hit.specialties}</span>
                </div>
                <div className="text-sm">
                  <span className="text-neutral-40">Languages: </span>
                  <span className="text-neutral-20">{Array.isArray(hit.languages) ? hit.languages.join(', ') : hit.languages}</span>
                </div>
                <div className="text-sm">
                  <span className="text-neutral-40">Location: </span>
                  <span className="text-neutral-20">
                    {hit.locations[0].city}, {hit.locations[0].state}
                    {hit._geoDistance && ` (${formatDistance(hit._geoDistance)})`}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="cta-button bg-[#D84E0E] text-white px-6 py-2 text-sm rounded hover:bg-[#B33F09] transition-colors">
                View Profile
              </button>
              <button className="cta-button bg-[#D84E0E] text-white px-6 py-2 text-sm rounded hover:bg-[#B33F09] transition-colors">
                Request Call Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Debug component to see what's happening with the search state
const DebugComponent = () => {
  const { results } = useInstantSearch();
  console.log('Algolia Results:', results);
  return null;
};

// Create custom useAutocomplete hook
function useAutocomplete(props: any) {
  return useConnector(connectAutocomplete, props);
}

// Create Autocomplete component
function Autocomplete() {
  const { indices, currentRefinement, refine } = useAutocomplete({});
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const handleSelect = (hit: any) => {
    refine(hit.name);
    setShowSuggestions(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!indices.length || !currentRefinement) return;

    const totalHits = indices[0].hits.length;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => (prev < totalHits - 1 ? prev + 1 : prev));
        setShowSuggestions(true);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
        setShowSuggestions(true);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && indices[0].hits[selectedIndex]) {
          handleSelect(indices[0].hits[selectedIndex]);
        }
        setShowSuggestions(false);
        break;
      case 'Escape':
        e.preventDefault();
        refine('');
        setShowSuggestions(false);
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Small delay to allow for click events on suggestions to fire first
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="search"
          value={currentRefinement}
          onChange={(event) => {
            refine(event.currentTarget.value);
            setSelectedIndex(-1);
            setShowSuggestions(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => currentRefinement && setShowSuggestions(true)}
          onBlur={handleBlur}
          placeholder="Search for doctors..."
          className="w-full outline-none px-4 py-3 border border-neutral-60 rounded-lg shadow-sm focus:shadow-md focus:border-primary transition-all text-base"
        />
        {showSuggestions && indices.length > 0 && currentRefinement && (
          <div className="absolute w-full bg-white mt-1 border border-neutral-60 rounded-lg shadow-lg z-10">
            {indices.map(({ hits }) => (
              <ul className="py-2">
                {hits.map((hit: any, index: number) => (
                  <li
                    key={hit.objectID}
                    onClick={() => handleSelect(hit)}
                    className={`px-4 py-2 cursor-pointer ${
                      index === selectedIndex
                        ? 'bg-neutral-90'
                        : 'hover:bg-neutral-90'
                    }`}
                  >
                    <div className="font-semibold">{hit.name}</div>
                    <div className="text-sm text-neutral-40">
                      {Array.isArray(hit.specialties) ? hit.specialties[0] : hit.specialties} • {hit.locations[0].city}, {hit.locations[0].state}
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface ProviderSearchProps {
  title?: string;
  className?: string;
}

export default function ProviderSearch({ title, className = "" }: ProviderSearchProps) {
  const { userLocation, isLoadingLocation, locationError } = React.useContext(LocationContext);

  return (
    <LocationProvider>
      <div className={`min-h-screen bg-neutral-90 ${className}`}>
        <InstantSearch 
          searchClient={searchClient}
          indexName="providers"
          future={{
            preserveSharedStateOnUnmount: true
          }}
        >
          <DebugComponent />
          <div className="bg-neutral-100 border-b border-neutral-80 py-8">
            <div className="max-w-7xl mx-auto px-4">
              {title && <h1 className="text-4xl font-semibold text-neutral-20 mb-2">{title}</h1>}
              {locationError && (
                <div className="text-red-500 text-sm mb-4">
                  Unable to get your location: {locationError}
                </div>
              )}
              <Autocomplete />
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-4 gap-8">
              {/* Facets sidebar */}
              <div className="col-span-1">
                <div className="space-y-6">
                  <div className="bg-neutral-100 p-6 rounded-lg border border-neutral-80">
                    <h3 className="text-lg font-semibold text-neutral-20 mb-4">Specialty</h3>
                    <RefinementList 
                      attribute="specialties"
                      classNames={{
                        list: "space-y-3 list-none",
                        label: "flex items-center text-sm text-neutral-40 hover:text-neutral-20 cursor-pointer",
                        checkbox: "h-4 w-4 rounded border-neutral-60 text-primary focus:ring-primary mr-3",
                        count: "ml-2 text-xs text-neutral-50",
                      }}
                      limit={10}
                      operator="or"
                      sortBy={['count:desc']}
                    />
                  </div>

                  <div className="bg-neutral-100 p-6 rounded-lg border border-neutral-80">
                    <h3 className="text-lg font-semibold text-neutral-20 mb-4">Languages</h3>
                    <RefinementList 
                      attribute="languages"
                      classNames={{
                        list: "space-y-3 list-none",
                        label: "flex items-center text-sm text-neutral-40 hover:text-neutral-20 cursor-pointer",
                        checkbox: "h-4 w-4 rounded border-neutral-60 text-primary focus:ring-primary mr-3",
                        count: "ml-2 text-xs text-neutral-50",
                      }}
                      limit={10}
                      operator="or"
                      sortBy={['count:desc']}
                    />
                  </div>

                  <div className="bg-neutral-100 p-6 rounded-lg border border-neutral-80">
                    <h3 className="text-lg font-semibold text-neutral-20 mb-4">Location</h3>
                    <RefinementList 
                      attribute="locations.state"
                      classNames={{
                        list: "space-y-3 list-none",
                        label: "flex items-center text-sm text-neutral-40 hover:text-neutral-20 cursor-pointer",
                        checkbox: "h-4 w-4 rounded border-neutral-60 text-primary focus:ring-primary mr-3",
                        count: "ml-2 text-xs text-neutral-50",
                      }}
                      limit={10}
                      operator="or"
                      sortBy={['count:desc']}
                    />
                  </div>
                </div>
              </div>

              {/* Search results */}
              <div className="col-span-3">
                <Configure 
                  hitsPerPage={10}
                  distinct
                  aroundLatLng={userLocation ? `${userLocation.lat}, ${userLocation.lng}` : undefined}
                  aroundRadius={50000} // 50km radius
                />

                <Hits 
                  hitComponent={DoctorHit}
                  classNames={{
                    list: "space-y-4",
                  }}
                />
              </div>
            </div>
          </div>
        </InstantSearch>
      </div>
    </LocationProvider>
  );
}
