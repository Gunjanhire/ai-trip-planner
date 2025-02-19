import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  const [imageUrls, setImageUrls] = useState({});
  const [loading, setLoading] = useState(true); // Loading state
  const videoUrl = "/loading.mp4";
  const UNSPLASH_ACCESS_KEY = "iXKyyNaa4NgvCUOXOVS2hZgcdt0Qvb5zg2xNnxzh8eY";

  useEffect(() => {
    if (trip?.tripData?.hotelOptions?.length > 0) {
      trip.tripData.hotelOptions.forEach((hotel, index) => {
        GetUnsplashImage(hotel.description, index);
      });
    }
  }, [trip]);

  const GetUnsplashImage = async (description, index) => {
    try {
      if (!description) return;

      const query = `hotel of ${description}`;
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        setImageUrls((prevImages) => ({
          ...prevImages,
          [index]: data.results[0].urls.regular,
        }));
      } else {
        console.warn(`No images found for ${description}`);
      }
    } catch (error) {
      console.error(`Error fetching image for ${description}:`, error);
    } finally {
      setLoading(false); // Set loading to false once data is fetched or fails
    }
  };

  return (
    <div className="px-4 sm:px-4 lg:px-2">
      <div className="flex items-center justify-center w-full mt-9">
        {/* Skeleton Loader for Heading */}
        {loading ? (
          <div className="w-1/2 h-8 bg-gray-300 animate-pulse rounded-md" />
        ) : (
          <img src="/hotel.png" alt="Travel Icon" className="h-12 w-12 mr-2" />
        )}
        <span className="font-sarala text-xl sm:text-2xl md:text-3xl">
          {loading ? "Loading..." : "Hotels Recommendation"}
        </span>
        <div className="ml-3 flex-1 border-t border-blue-700 rounded-full"></div>
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {trip?.tripData?.hotelOptions?.map((hotel, index) => (
          <Link
            key={index}
            to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
            target="_blank"
          >
            <div className="shadow-md hover:scale-95 transition-transform cursor-pointer border border-gray-300 rounded-xl overflow-hidden">
              {/* Skeleton Loader for Image */}
              {loading || !imageUrls[index] ? (
                <div className="w-full h-48 sm:h-56 md:h-64 bg-gray-300 animate-pulse" />
              ) : (
                <img
                  src={imageUrls[index]}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  alt={hotel.description}
                />
              )}
              <div className="flex flex-col gap-2 backdrop-blur-sm bg-white/70 p-4 rounded-b-xl font-passion">
                {/* Skeleton Loader for Hotel Name */}
                {loading ? (
                  <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded-md" />
                ) : (
                  <h2 className="text-lg md:text-xl font-semibold">
                    {hotel?.hotelName}
                  </h2>
                )}

                {/* Skeleton Loader for Address */}
                {loading ? (
                  <div className="w-1/2 h-5 bg-gray-300 animate-pulse rounded-md" />
                ) : (
                  <h2 className="text-gray-500 text-sm md:text-md">
                    📍 {hotel?.hotelAddress}
                  </h2>
                )}

                {/* Skeleton Loader for Price */}
                {loading ? (
                  <div className="w-1/3 h-5 bg-gray-300 animate-pulse rounded-md" />
                ) : (
                  <h2 className="text-md md:text-lg">💵 {hotel?.price}</h2>
                )}

                {/* Skeleton Loader for Rating */}
                {loading ? (
                  <div className="w-1/4 h-5 bg-gray-300 animate-pulse rounded-md" />
                ) : (
                  <h2 className="font-medium">⭐ {hotel?.rating}</h2>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
