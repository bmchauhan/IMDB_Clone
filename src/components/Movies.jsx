import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import axios from "axios";

function Movies({ handleAddToWatchlist, handleRemoveToWatchlist, watchlist }) {
  const [movies, setMovies] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  const options = {
    method: "GET",
    url: `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${pageNo}`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  };

  useEffect(() => {
    axios
      .request(options)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [pageNo]);

  return (
    <div className="p-10 bg-gray-900 min-h-screen">
      <h2 className="text-3xl font-bold text-white text-center mb-8">
        🎬 Trending Movies
      </h2>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 justify-center">
        {movies.map((movieObj) => (
          <MovieCard
            key={movieObj.id}
            poster_path={movieObj.poster_path}
            name={movieObj.original_title}
            handleAddToWatchlist={handleAddToWatchlist}
            handleRemoveToWatchlist={handleRemoveToWatchlist}
            movieObj={movieObj}
            watchlist={watchlist}
          />
        ))}
      </div>

      {/* Pagination Controls */}

      <div className="flex justify-center items-center mt-12 space-x-4">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          disabled={pageNo === 1}
          onClick={() => setPageNo((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>

        <span className="bg-gray-800 text-white px-4 py-2 rounded-xl font-semibold shadow-inner border border-gray-700">
          {pageNo}
        </span>

        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-xl shadow-md transition-all duration-200"
          onClick={() => setPageNo((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Movies;
