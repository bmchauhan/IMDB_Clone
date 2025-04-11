import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Movies from "./components/Movies";
import WatchList from "./components/WatchList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import axios from "axios";

function App() {
  const [watchlist, setwatchlist] = useState([]);

  const [genrelist,setGenreList] = useState({});

  let handleAddToWatchlist = (movieObj) => {
    let newWatchList = [...watchlist, movieObj];
    localStorage.setItem("moviesApp", JSON.stringify(newWatchList));
    setwatchlist(newWatchList);
  };
  let handleRemoveToWatchlist = (movieObj) => {
    let filteredWatchList = watchlist.filter((movie) => {
      return movieObj.id != movie.id;
    });
    localStorage.setItem("moviesApp", JSON.stringify(filteredWatchList));
    setwatchlist(filteredWatchList);
  };

  useEffect(() => {
    let moviesFromLocalStorage = localStorage.getItem("moviesApp");
    if (!moviesFromLocalStorage) {
      return;
    }
    setwatchlist(JSON.parse(moviesFromLocalStorage));
  },[]);

  const optionsGenere = {
    method: "GET",
    url: `https://api.themoviedb.org/3/genre/movie/list?language=en`,
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_BEARER_TOKEN}`,
    },
  };

  useEffect(() => {
    axios
      .request(optionsGenere)
      .then((res) => {
        const genresArray = res.data.genres;
        const genresMap = {};
        genresArray.forEach((genre) => {
          genresMap[genre.id] = genre.name;
        });
        setGenreList(genresMap);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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
            element={<WatchList watchlist={watchlist} setwatchlist={setwatchlist} genrelist={genrelist} handleRemoveToWatchlist={handleRemoveToWatchlist}/>}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
