import React, { useState, useEffect } from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  const [loading, setLoading] = useState(true);
  const itinerary = trip.tripData?.itinerary || {};

  useEffect(() => {
    // Simulate loading
    if (Object.keys(itinerary).length > 0) {
      setLoading(false); // Set loading to false once the itinerary data is loaded
    }
  }, [itinerary]);

  return (
    <div className="">
      <div className="flex items-center justify-center w-full mt-9">
        {/* Skeleton Loader for Heading */}
        {loading ? (
          <div className="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md" />
        ) : (
          <img src="/visit.png" alt="Travel Icon" className="h-14 w-14 mr-2" />
        )}
        <span className="font-sarala text-3xl">
          {loading ? "Loading..." : "Places to Visit"}
        </span>
        <div className="ml-3 flex-1 border-t border-blue-700 rounded-full"></div>
      </div>

      <div className="font-passion">
        {loading ? (
          // Skeleton Loader for the whole itinerary section
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-4">
                <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md" />
                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5">
                  {Array.from({ length: 2 }).map((_, index) => (
                    <div
                      key={index}
                      className="bg-gray-300 animate-pulse h-40 w-full rounded-md"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          Object.entries(itinerary)
            .sort(
              ([dayA], [dayB]) =>
                Number(dayA.replace("day", "")) -
                Number(dayB.replace("day", ""))
            )
            .map(([day, data], index) => (
              <div key={index} className="mt-5 backdrop-blur-sm bg-transparent">
                <div className="flex items-center justify-center w-full mt-9">
                  {/* Skeleton Loader for Day Label */}
                  {loading ? (
                    <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md" />
                  ) : (
                    <span className="font-sarala text-lg">
                      {day.toUpperCase()}
                    </span>
                  )}
                  <div className="ml-3 flex-1 border-t border-gray-300 rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-5 mt-3">
                  {data.places?.map((place, i) => (
                    <div key={i}>
                      <div className="flex items-center gap-2">
                        {/* Skeleton Loader for Rating */}
                        {loading ? (
                          <div className="w-10 h-10 bg-gray-300 animate-pulse rounded-full" />
                        ) : (
                          <img
                            src="/rating.png"
                            alt="Rating"
                            className="h-10 w-10"
                          />
                        )}
                        <h2 className="text-md text-orange-500">
                          {loading ? "Loading..." : place.rating}
                        </h2>
                      </div>
                      {/* Skeleton Loader for PlaceCardItem */}
                      <PlaceCardItem place={place} trip={trip} />
                    </div>
                  ))}
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
