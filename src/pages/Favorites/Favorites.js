import "../Favorites/Favorites.css";

import { useState, useEffect } from "react";
import axios from "axios";

import FavoritesComics from "../../components/FavoritesComics/FavoritesComics";
import FavoritesCharacters from "../../components/FavoritesCharacters/FavoritesCharacters";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Favorites = ({
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
  favComics,
  filteredFavComics,
  setFilteredFavComics,
}) => {
  const [favorite, setFavorite] = useState(false);
  const [charData, setCharData] = useState();
  const [comicsData, setComicsData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCharData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/characters`
        );
        setCharData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchCharData();
  }, []);

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/comics`
        );

        setComicsData(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchComicsData();
  }, []);

  useEffect(() => {
    if (comicsData && charData) {
      setIsLoading(false);
    }
  }, [comicsData, charData]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <>
      <div className="characters-or-comics">
        <h2
          className={favorite ? "" : "selected"}
          onClick={() => setFavorite(false)}
        >
          Characters
        </h2>
        <span className="separator">|</span>
        <h2
          className={favorite ? "selected" : ""}
          onClick={() => setFavorite(true)}
        >
          Comics
        </h2>
      </div>
      {favorite ? (
        <FavoritesComics
          comicsData={comicsData}
          favComics={favComics}
          filteredFavComics={filteredFavComics}
          setFilteredFavComics={setFilteredFavComics}
        />
      ) : (
        <FavoritesCharacters
          charData={charData}
          favCharacters={favCharacters}
          filteredFavCharacters={filteredFavCharacters}
          setFilteredFavCharacters={setFilteredFavCharacters}
        />
      )}
    </>
  );
};

export default Favorites;
