import React from "react";

function Banner() {
  return (
    <div
      className="h-[30vh] md:h-[80vh] bg-cover bg-center flex items-end relative"
      style={{
        backgroundImage: `url(https://cdn.wallpapersafari.com/13/55/F6bVx8.jpg)`,
      }}
    >
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>

      {/* Movie Title */}
      <div
        className="text-white text-3xl md:text-5xl font-bold w-full text-center 
                   bg-black/50 p-4 backdrop-blur-md relative z-10 animate-fadeIn"
      >
        Avengers EndGame
      </div>
    </div>
  );
}

export default Banner;
