import { useState } from "react";
import axios from "axios";

const LocationSearch = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${value}`
        );
        setSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    if (onSelect) {
      onSelect(place);
    }
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search for a location..."
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border mt-1 rounded-lg shadow-lg z-10">
          {suggestions.map((place) => (
            <li
              key={place.place_id}
              onClick={() => handleSelect(place)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {place.display_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LocationSearch;
