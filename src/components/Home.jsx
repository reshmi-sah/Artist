


// import React, { useRef, useState } from "react";
// import { artists as artistsData } from "../data/artists";
// import Search from "./Search";
// import Mainimage from "./Mainimage";
// import Tab from "./Tabs/Tab";
// import Smallimage from "./Smallimage";

// const Home = () => {
//   const [filters, setFilters] = useState({
//     artist: "",
//     country: null,
//     type: ""
//   });

//   // original data (never filtered)
//   const [artists] = useState(artistsData);

//   // filtered list (used ONLY for Smallimage)
//   const [filteredArtists, setFilteredArtists] = useState(artistsData);

//   // main image artist (never affected by search)
//   const [activeArtist, setActiveArtist] = useState(artistsData[0] || null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [noData, setNoData] = useState(false);

//   const smallImageRef = useRef(null);
//   const mainImageRef = useRef(null);
//   const noDataRef = useRef(null);

//   // 🔍 SEARCH → affects ONLY filteredArtists
//   const handleSearch = () => {
//     setError("");
//     setNoData(false);
//     setLoading(true);

//     setTimeout(() => {
//       let result = artists;

//       // filter by artist name
//       if (filters.artist) {
//         result = result.filter((a) =>
//           a.name.toLowerCase().includes(filters.artist.toLowerCase())
//         );
//       }

//       // filter by country
//       if (filters.country) {
//         result = result.filter(
//           (a) =>
//             a.country.toLowerCase() ===
//             filters.country.name.common.toLowerCase()
//         );
//       }

//       // filter by art type
//       if (filters.type) {
//         result = result.filter(
//           (a) => a.type === filters.type
//         );
//       }

//       setLoading(false);

//       if (!result.length) {
//         setFilteredArtists([]);
//         setNoData(true);
//         noDataRef.current?.scrollIntoView({ behavior: "smooth" });
//         return;
//       }

//       // ✅ update ONLY list
//       setFilteredArtists(result);
//     }, 500);
//   };

//   return (
//     <>
//       {/* Loader */}
//       {loading && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="animate-spin h-12 w-12 border-4 border-teal-400 border-t-transparent rounded-full" />
//         </div>
//       )}

//       <div className="min-h-screen max-w-7xl mx-auto bg-[#1e232a] p-6 rounded-2xl flex flex-col gap-8">

//         {/* Search */}
//         <Search
//           filters={filters}
//           setFilters={setFilters}
//           onSearch={handleSearch}
//            artists={artists} 
//         />

//         {error && <p className="text-red-400">{error}</p>}

//         {/* Main image section (UNCHANGED by search) */}
//         {activeArtist && (
//           <div className="flex flex-col md:flex-row gap-6">
//             <div ref={mainImageRef} className="md:w-[360px]">
//               <Mainimage artist={activeArtist} />
//             </div>

//             <div className="flex-1">
//               <Tab artist={activeArtist} />
//             </div>
//           </div>
//         )}

//         {/* Small images (FILTERED) */}
//         {filteredArtists.length > 0 && (
//           <div ref={smallImageRef}>
//             <Smallimage
//               artists={filteredArtists}
//               activeId={activeArtist?.id}
//               onSelect={(artist) => {
//                 setActiveArtist(artist);
//                 setTimeout(() => {
//                   mainImageRef.current?.scrollIntoView({
//                     behavior: "smooth"
//                   });
//                 }, 300);
//               }}
//             />
//           </div>
//         )}

//         {/* No Data */}
//         {noData && (
//           <div ref={noDataRef} className="text-center text-gray-300 py-16">
//             <h2 className="text-xl">No data found</h2>
//             <p>Please try different filters</p>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Home;



import React, { useRef, useState } from "react";
import { artists as artistsData } from "../data/artists";
import Search from "./Search";
import Mainimage from "./Mainimage";
import Tab from "./Tabs/Tab";
import Smallimage from "./Smallimage";

const Home = () => {
  const [filters, setFilters] = useState({
    artist: "",
    country: null,
    type: ""
  });

  const [artists] = useState(artistsData);
  const [filteredArtists, setFilteredArtists] = useState(artistsData);
  const [activeArtist, setActiveArtist] = useState(artistsData[0]);
  const [loading, setLoading] = useState(false);
  const [noData, setNoData] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const smallRef = useRef(null);
  const mainRef = useRef(null);

const handleSearch = () => {
  // ⛔ strict condition
  if (!filters.artist || !filters.country) return;

  setHasSearched(true);
  setLoading(true);
  setNoData(false);

  setTimeout(() => {
    let result = artists;

    if (filters.artist) {
      result = result.filter((a) =>
        a.name.toLowerCase().includes(filters.artist.toLowerCase())
      );
    }

    if (filters.country) {
      result = result.filter(
        (a) =>
          a.country.toLowerCase() ===
          filters.country.name.common.toLowerCase()
      );
    }

    if (filters.type) {
      result = result.filter((a) => a.type === filters.type);
    }

    setLoading(false);

    if (!result.length) {
      setFilteredArtists([]);
      setNoData(true);
      return;
    }

    setFilteredArtists(result);

    // ✅ scroll ONLY now
    setTimeout(() => {
      smallRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 200);
  }, 600);
};


  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="animate-spin h-12 w-12 border-4 border-teal-400 border-t-transparent rounded-full" />
        </div>
      )}

      <div className="min-h-screen max-w-7xl mx-auto bg-[#1e232a] p-6 rounded-2xl flex flex-col gap-8">

        <Search
          filters={filters}
          setFilters={setFilters}
          onSearch={handleSearch}
          artists={artists}
        />

        {/* Main Image */}
        <div ref={mainRef} className="flex flex-col md:flex-row gap-6">
          <div className="md:w-[360px]">
            <Mainimage artist={activeArtist} />
          </div>
          <div className="flex-1">
            <Tab artist={activeArtist} />
          </div>
        </div>

        {/* Small Images */}
        {filteredArtists.length > 0 && (
          <div ref={smallRef}>
            <Smallimage
              artists={filteredArtists}
              activeId={activeArtist.id}
              onSelect={(artist) => {
                setActiveArtist(artist);
                setTimeout(() => {
                  mainRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 300);
              }}
            />
          </div>
        )}

        {noData && (
          <div className="text-center text-gray-400 py-10">
            No data found
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
