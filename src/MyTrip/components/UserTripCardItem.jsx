import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [imageUrl, setImageUrl] = useState(null); // Default to null
  const videoUrl = "/loading.mp4"; // Set default video path
  const UNSPLASH_ACCESS_KEY = "iXKyyNaa4NgvCUOXOVS2hZgcdt0Qvb5zg2xNnxzh8eY"; // Replace with your key

  useEffect(() => {
    if (trip?.userSelection?.location?.name) {
      GetUnsplashImage();
    }
  }, [trip]);

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
        setImageUrl(data.results[0].urls.regular); // Set first image result
      } else {
        console.warn("No images found for this location.");
      }
    } catch (error) {
      console.error("Error fetching Unsplash image:", error);
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all bg-[#fffef5] rounded-xl overflow-hidden shadow-md">
        {imageUrl ? (
          <img
            src={imageUrl}
            className="object-cover rounded-xl w-full h-[200px] sm:h-[250px] md:h-[280px]"
            alt="Trip"
          />
        ) : (
          <video
            src={videoUrl}
            className="object-cover rounded-xl w-full h-[200px] sm:h-[250px] md:h-[280px]"
            autoPlay
            loop
            muted
          />
        )}
        <div className="p-4 text-center sm:text-left">
          <h2 className="font-bold text-lg sm:text-xl">
            {trip?.userSelection?.location.name}
          </h2>
          <h2 className="text-gray-500 font-semibold text-sm sm:text-base">
            {trip?.userSelection?.noOfDays} Days Trip with{" "}
            {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
