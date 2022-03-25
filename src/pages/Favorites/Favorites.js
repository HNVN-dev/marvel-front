import "../Favorites/Favorites.css";

import { useState } from "react";

import FavoritesComics from "../../components/FavoritesComics/FavoritesComics";
import FavoritesCharacters from "../../components/FavoritesCharacters/FavoritesCharacters";

const Favorites = ({
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
}) => {
  const [favorite, setFavorite] = useState(false);

  return (
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
        <FavoritesComics />
      ) : (
        <FavoritesCharacters
          favCharacters={favCharacters}
          filteredFavCharacters={filteredFavCharacters}
          setFilteredFavCharacters={setFilteredFavCharacters}
        />
      )}
    </>
  );
};

export default Favorites;
