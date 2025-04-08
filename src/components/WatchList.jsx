import React, { useState } from "react";

function WatchList({ watchlist }) {
  const [search, setSearch] = useState("");
  let handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="bg-gradient-to-br from-purple-900 via-gray-900 to-indigo-900 min-h-screen text-white px-6 py-10">
      {/* Genre Buttons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        {["Action", "Comedy", "Drama", "Sci-Fi"].map((genre, index) => (
          <div
            key={index}
            className="px-6 py-2 bg-purple-700 hover:bg-purple-800 transition duration-200 rounded-full text-white font-semibold cursor-pointer shadow-md"
          >
            {genre}
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
                <div className="flex items-center gap-3">
                  Name
                </div>
              </th>
              <th className="p-4 text-left cursor-pointer hover:text-white transition">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-sm">↑</span>
                  <span>Ratings</span>
                  <span className="text-red-400 text-sm">↓</span>
                </div>
              </th>
              <th className="p-4 text-left cursor-pointer hover:text-white transition">
                <div className="flex items-center gap-3">
                  <span className="text-green-400 text-sm">↑</span>
                  <span>Popularity</span>
                  <span className="text-red-400 text-sm">↓</span>
                </div>
              </th>
              <th className="p-4 text-left">Genre</th>
              <th className="p-4 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {watchlist
              .filter((movieObj) => {
                return movieObj.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase());
              })
              .map((movieObj) => {
                return (
                  <tr className="hover:bg-gray-800/40 transition duration-200">
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
                    <td className="p-4">Fantasy</td>
                    <td className="p-4">
                      <button className="text-red-400 hover:text-red-600 hover:underline transition">
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
