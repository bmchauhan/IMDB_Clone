import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";

function App() {
  const [watchlist, setwatchlist] = useState([]);

  let handleAddToWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setwatchlist(newWatchList);
  };
  let handleRemoveToWatchlist = (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => {
      return movieObj.id != movie.id;
    });
    setwatchlist(filteredWatchList);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setwatchlist(JSON.parse(moviesFromLocalStorage));
  },[]);
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Banner />
                <Movies
                  handleAddToWatchlist={handleAddToWatchlist}
                  handleRemoveToWatchlist={handleRemoveToWatchlist}
                  watchlist={watchlist}
                />
              </>
            }
          />
          <Route
            path="/watchlist"
            element={<WatchList watchlist={watchlist} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
