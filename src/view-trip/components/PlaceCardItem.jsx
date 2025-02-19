import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function PlaceCardItem({ place, trip }) {
  const [imageUrl, setImageUrl] = useState("/solo.png");
  const fullCityName = trip?.userSelection?.location?.name || "Unknown City";
  const city = fullCityName.split(" ")[0]; // Extract first word (e.g., "Delhi" from "Delhi NCR")

  useEffect(() => {
    if (place?.placeName && city) {
      fetchWikipediaImage(place.placeName, city);
    }
  }, [place?.placeName, city]);

  const fetchWikipediaImage = async (placeName, city) => {
    try {
      let query = placeName;
      let response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${query}&prop=pageimages&pithumbsize=500`
      );
      let data = await response.json();
      let pages = data.query.pages;
      let page = Object.values(pages)[0];

      if (page && page.thumbnail) {
        setImageUrl(page.thumbnail.source);
        return;
      }
      query = `${placeName} ${city}`;
      response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${query}&prop=pageimages&pithumbsize=500`
      );
      data = await response.json();
      pages = data.query.pages;
      page = Object.values(pages)[0];

      if (page && page.thumbnail) {
        setImageUrl(page.thumbnail.source);
        return;
      }
      fetchCityImage(city);
    } catch (error) {
      console.error("Error fetching Wikipedia place image:", error);
    }
  };

  const fetchCityImage = async (city) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&titles=${city}&prop=pageimages&pithumbsize=500`
      );
      const data = await response.json();
      const pages = data.query.pages;
      const page = Object.values(pages)[0];
      if (page && page.thumbnail) {
        setImageUrl(page.thumbnail.source);
      }
    } catch (error) {
      console.error("Error fetching Wikipedia city image:", error);
    }
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place?.placeName}
      target="_blank"
    >
      <div className="shadow-md border rounded-xl p-3 mt-2 flex flex-col sm:flex-row gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src={imageUrl}
          className="w-full sm:w-[160px] h-[200px] sm:h-[140px] rounded-xl object-cover"
          alt={place.placeName}
        />

        <div className="flex flex-col justify-between">
          <h2 className="font-bold text-lg">{place.placeName}</h2>
          <p className="text-gray-500 text-sm sm:text-base">
            {place.placeDetails}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <img src="/location.png" alt="Travel Icon" className="h-6 w-6" />
            <h2 className="text-sm sm:text-base font-bold">
              {place.timeToTravel}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
