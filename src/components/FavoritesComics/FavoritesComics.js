import "../../pages/Favorites/Favorites.css";

import { useEffect } from "react";

import ComicsCardGrid from "../ComicsCardGrid/ComicsCardGrid";

const FavoritesComics = ({
  comicsData,
  favComics,
  filteredFavComics,
  setFilteredFavComics,
}) => {
  // This component appears in Favorites page

  useEffect(() => {
    const newFilteredFavComics = [...filteredFavComics];

    if (favComics.length > 0) {
      comicsData?.results.forEach((elem) => {
        const exist = newFilteredFavComics.find(
          (filteredElem) => filteredElem._id === elem._id
        );
        if (favComics.includes(elem._id) && exist === undefined) {
          newFilteredFavComics.push(elem);
          setFilteredFavComics(newFilteredFavComics);
        }
      });
    }
  }, [filteredFavComics, comicsData, favComics, setFilteredFavComics]);

  return filteredFavComics?.length > 0 ? (
    <div className="user-favorites-container">
      <h2>My Favorites Comics</h2>
      <div className="user-favorites">
        {filteredFavComics?.map((comic) => {
          return (
            <ComicsCardGrid
              comic={comic}
              key={`fav ${comic._id}`}
              favComics={favComics}
              filteredFavComics={filteredFavComics}
              setFilteredFavComics={setFilteredFavComics}
            />
          );
        })}
      </div>
    </div>
  ) : (
    <div className="nothing-container">
      <h2>
        Nothing here for the moment, please add favorites then u can check them
        here :D
      </h2>
    </div>
  );
};

export default FavoritesComics;
