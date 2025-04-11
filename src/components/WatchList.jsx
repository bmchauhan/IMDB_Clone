import React, { useState, useMemo } from "react";

function WatchList({ watchlist, setwatchlist, genrelist,handleRemoveToWatchlist }) {
  const [search, setSearch] = useState("");
  const [genreFilterList, setgenreFilterList] = useState("All Genres");

  const filteredGenres = useMemo(() => {
    const genreIds = new Set();
    watchlist.forEach((movie) => {
      movie.genre_ids.forEach((id) => genreIds.add(id));
    });

    return ["All Genres", ...Array.from(genreIds).map((id) => genrelist[id])];
  }, [watchlist, genrelist]);

  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let sortIncreasing = () => {
    let sortedIncreasing = watchlist.sort((movieA, movieB) => {
      return movieA.vote_average - movieB.vote_average;
    });
    setwatchlist([...sortedIncreasing]);
  };
  let sortDecreasing = () => {
    let sortedDecreasing = watchlist.sort((movieA, movieB) => {
      return movieB.vote_average - movieA.vote_average;
    });
    setwatchlist([...sortedDecreasing]);
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 via-gray-900 to-indigo-900 min-h-screen text-white px-6 py-10">
      {/* Genre Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {filteredGenres.map((genreName, index) => (
          <div
            key={index}
            onClick={() => setgenreFilterList(genreName)}
            className={`px-6 py-2 rounded-full font-semibold cursor-pointer shadow-md transform transition duration-200 ease-in-out ${
              genreFilterList === genreName
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/40 scale-105"
                : "bg-gray-700 text-gray-200 hover:bg-purple-800 hover:text-white"
            }`}
          >
            {genreName}
          </div>
        ))}
      </div>

      {/* Search Box */}
      <div className="flex justify-center mb-10">
        <input
          onChange={handleSearch}
          value={search}
          type="text"
          placeholder="Search Movies"
          className="h-12 w-72 bg-gray-800 text-white border border-purple-500 rounded-full px-4 outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>

      {/* Movie Table */}
      <div className="overflow-hidden rounded-2xl shadow-xl border border-white/10 backdrop-blur-md bg-white/5 mx-4 lg:mx-20">
        <table className="w-full text-gray-300 text-sm md:text-base">
          <thead className="bg-gray-800/60 text-purple-300">
            <tr>
              <th className="p-4 text-left cursor-pointer hover:text-white transition">
                <div className="flex items-center gap-3">Name</div>
              </th>
              <th className="p-4 text-left cursor-pointer hover:text-white transition">
                <div className="flex items-center gap-3">
                  <span
                    className="text-green-400 text-sm"
                    onClick={sortIncreasing}
                  >
                    ↑
                  </span>
                  <span>Ratings</span>
                  <span
                    className="text-red-400 text-sm"
                    onClick={sortDecreasing}
                  >
                    ↓
                  </span>
                </div>
              </th>
              <th className="p-4 text-left">Popularity</th>
              <th className="p-4 text-left">Genre</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {watchlist
              .filter((movieObj) => {
                const matchesSearch = movieObj.title
                  .toLowerCase()
                  .includes(search.toLowerCase());

                const matchesGenre =
                  genreFilterList === "All Genres" ||
                  movieObj.genre_ids.some(
                    (id) => genrelist[id] === genreFilterList
                  );

                return matchesSearch && matchesGenre;
              })
              .map((movieObj) => {
                return (
                  <tr
                    key={movieObj.id}
                    className="hover:bg-gray-800/40 transition duration-200"
                  >
                    <td className="flex items-center gap-4 p-4">
                      <img
                        className="h-24 w-36 object-cover rounded-md shadow-md"
                        src={`https://image.tmdb.org/t/p/original/${movieObj.poster_path}`}
                        alt="Aladdin"
                      />
                      <span className="text-lg font-medium">
                        {movieObj.title}
                      </span>
                    </td>
                    <td className="p-4">{movieObj.vote_average}</td>
                    <td className="p-4">{movieObj.popularity}</td>
                    <td className="p-4">
                      {" "}
                      {movieObj.genre_ids
                        .map((genreId) => genrelist[genreId])
                        .join(", ")}
                    </td>
                    <td className="p-4">
                      <button className="text-red-400 hover:text-red-600 hover:underline transition" onClick={() => {
                        handleRemoveToWatchlist(movieObj)
                      }}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}

            {/* Add more movie rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WatchList;
