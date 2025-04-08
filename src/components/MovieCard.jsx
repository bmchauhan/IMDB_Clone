import React from "react";
import Movies from "./Movies";
function MovieCard({ poster_path, name, handleAddToWatchlist, movieObj,handleRemoveToWatchlist,watchlist }) {

  const isInWatchlist = watchlist.some((movie) => movie.id === movieObj.id);
  // Toggle logic
  const toggleWatchlist = (e) => {
    e.stopPropagation();
    if (isInWatchlist) {
      handleRemoveToWatchlist(movieObj);
    } else {
      handleAddToWatchlist(movieObj);
    }
  };
  return (
    <div
      className="relative h-[40vh] w-[200px] bg-center bg-cover rounded-xl 
             hover:scale-110 transition-transform duration-300 cursor-pointer 
             shadow-lg overflow-hidden"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${poster_path})`,
      }}
    >
      {/* Heart Icon */}
      <div className="absolute top-2 right-2 z-10">
        <div
          className={`h-10 w-10 flex items-center justify-center rounded-lg
                      bg-gray-900 bg-opacity-50 backdrop-blur-md
                      text-2xl font-bold shadow-md
                      hover:scale-110 transition-transform duration-200 cursor-pointer
                      ${isInWatchlist ? 'text-red-500' : 'text-white'}`}
          onClick={toggleWatchlist}
        >
          {isInWatchlist ? '❤️' : '🤍'}
        </div>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-70 pointer-events-none"></div>

      {/* Movie Title */}
      <div
        className="absolute bottom-2 left-2 right-2 text-white text-sm font-semibold 
                bg-black bg-opacity-60 px-3 py-2 rounded-lg text-center backdrop-blur-md"
      >
        {name}
      </div>
    </div>
  );
}

export default MovieCard;
