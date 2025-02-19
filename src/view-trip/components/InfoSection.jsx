import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

function InfoSection({ trip }) {
  const [mediaUrl, setMediaUrl] = useState(null); // Store image or video URL
  const [loading, setLoading] = useState(true); // Loading state
  const videoUrl = "/loading.mp4"; // Set default video path
  const UNSPLASH_ACCESS_KEY = "iXKyyNaa4NgvCUOXOVS2hZgcdt0Qvb5zg2xNnxzh8eY"; // Replace with your key

  useEffect(() => {
    if (trip?.userSelection?.location?.name) {
      GetPlacePhoto();
      GetUnsplashImage();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      if (!trip?.userSelection?.location?.name) {
        console.error("Location name is missing!");
        return;
      }

      const data = { textQuery: trip?.userSelection?.location?.name };

      await GetPlaceDetails(data).then((resp) => {
        console.log(resp.data);
      });
    } catch (error) {
      console.error(
        "Error fetching place details:",
        error.response?.data || error.message
      );
    }
  };

  const GetUnsplashImage = async () => {
    try {
      const locationName = trip?.userSelection?.location?.name;
      const query = locationName ? locationName.split(" ")[0] : "city"; // Get first word

      if (!locationName) return;

      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=1`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        setMediaUrl(data.results[0].urls.regular); // Set first image result
      } else {
        console.warn("No images found for this location.");
        setMediaUrl(videoUrl); // Set default video if no image is found
      }
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
      setMediaUrl(videoUrl); // Set default video on error
    } finally {
      setLoading(false); // Set loading to false once data is fetched or fails
    }
  };

  return (
    <div className="bg-transparent">
      {/* Skeleton Loader for Image */}
      {loading ? (
        <div className="h-64 sm:h-80 md:h-[500px] w-full bg-gray-300 animate-pulse rounded-xl" />
      ) : mediaUrl?.includes("https://images.unsplash.com") ? (
        <img
          src={mediaUrl}
          className="bg-transparent h-64 sm:h-80 md:h-[500px] w-full object-cover rounded-xl"
          alt="Location"
        />
      ) : (
        <video
          src={videoUrl}
          className="h-64 sm:h-80 md:h-[500px] w-full object-cover rounded-xl"
          autoPlay
          loop
          muted
        />
      )}

      <div className="flex flex-wrap justify-between items-center mt-5 gap-4">
        <div className="flex-1 min-w-[250px]">
          {/* Skeleton Loader for Title */}
          {loading ? (
            <div className="h-6 w-3/4 bg-gray-300 animate-pulse rounded-md mb-4" />
          ) : (
            <h2 className="font-bold text-2xl sm:text-3xl font-sarala text-[#0f2433]">
              {trip?.userSelection?.location?.name}
            </h2>
          )}

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 mt-3">
            {/* Skeleton Loaders for Trip Details */}
            {loading ? (
              <>
                <div className="w-24 h-8 bg-gray-300 animate-pulse rounded-full" />
                <div className="w-24 h-8 bg-gray-300 animate-pulse rounded-full" />
                <div className="w-24 h-8 bg-gray-300 animate-pulse rounded-full" />
                <div className="w-24 h-8 bg-gray-300 animate-pulse rounded-full" />
              </>
            ) : (
              <>
                <h2 className="shadow-md p-2 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-lg cursor-pointer">
                  📅 {trip.userSelection?.noOfDays} Day's
                </h2>
                <h2 className="shadow-md p-2 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-lg cursor-pointer">
                  💰 {trip.userSelection?.budget} Budget
                </h2>
                <h2 className="shadow-md p-2 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-lg cursor-pointer">
                  🥂 No. of Travelers : {trip.userSelection?.traveler}
                </h2>
                <h2 className="shadow-md p-2 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-lg cursor-pointer">
                  📅 {trip.userSelection?.date}
                </h2>
              </>
            )}
          </div>
        </div>
        <Button className="mt-2 hidden sm:mt-0">
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;
