import "../Favorites/Favorites.css";

import { useState, useContext } from "react";

import { CharsDataContext } from "../../Contexts/CharsDataContext/CharsDataContext";
import { ComicsDataContext } from "../../Contexts/ComicsDataContext/ComicsDataContext";
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

  const charsDataConsumer = useContext(CharsDataContext);
  const comicsDataConsumer = useContext(ComicsDataContext);

  return charsDataConsumer.isLoading && comicsDataConsumer.isLoading ? (
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
          comicsData={comicsDataConsumer.comicsData}
          favComics={favComics}
          filteredFavComics={filteredFavComics}
          setFilteredFavComics={setFilteredFavComics}
        />
      ) : (
        <FavoritesCharacters
          charsData={charsDataConsumer.CharsData}
          favCharacters={favCharacters}
          filteredFavCharacters={filteredFavCharacters}
          setFilteredFavCharacters={setFilteredFavCharacters}
        />
      )}
    </>
  );
};

export default Favorites;
