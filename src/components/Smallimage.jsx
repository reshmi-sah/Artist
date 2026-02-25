


import React, { useState, useEffect } from "react";

const Smallimage = ({ artists, onSelect, activeId }) => {
  const ITEMS_PER_LOAD = 10; // 2 rows of 3 columns
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [loading, setLoading] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      visibleCount < artists.length &&
      !loading
    ) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, artists.length));
        setLoading(false);
      }, 2000); // 2 seconds loader
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [visibleCount, loading]);

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-15 lg:gap-5 mt-2 lg:mt-10 ">
        {artists.slice(0, visibleCount).map((artist) => (
          <div
            key={artist.id}
            onClick={() => onSelect(artist)}
            className={`cursor-pointer 
        rounded-xl 
        bg-transparent 
        shadow-md 
        hover:shadow-xl 
        transition-all duration-300
              ${artist.id === activeId ? "ring-2 ring-teal-400" : ""} 
              flex flex-col items-center`}
          >
            <div className="w-56 h-52 p-2">
              <img
              src={artist.thumbnail}
              alt={artist.name}
              className="w-full h-full object-cover rounded-lg"
            />
            </div>
            <p className="text-sm text-gray-400 font-medium mt-1 mb-2 text-center">
              {artist.name}
            </p>
          </div>
        ))}
      </div>

      {loading && (
        <div className="text-center py-4 text-teal-400 font-medium">
          Loading...
        </div>
      )}
    </div>
  );
};

export default Smallimage;







