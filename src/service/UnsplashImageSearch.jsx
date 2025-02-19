import { useState } from "react";

const UnsplashImageSearch = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    const accessKey = "iXKyyNaa4NgvCUOXOVS2hZgcdt0Qvb5zg2xNnxzh8eY"; // Replace with your key
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${accessKey}`
      );
      const data = await response.json();
      setImages(data.results);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Search for a Place</h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a place (e.g., Paris)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchImages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>
      {loading && <p>Loading...</p>}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.urls.small}
            alt={img.alt_description}
            className="rounded shadow-md"
          />
        ))}
      </div>
    </div>
  );
};

export default UnsplashImageSearch;
