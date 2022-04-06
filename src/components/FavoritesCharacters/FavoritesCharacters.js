import "../../pages/Favorites/Favorites.css";

import { useEffect } from "react";

import CharacterCardGrid from "../CharacterCardGrid/CharacterCardGrid";

const FavoritesCharacters = ({
  charData,
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
}) => {
  // This component appears in Favorites page

  useEffect(() => {
    const newFilteredFavCharacters = [...filteredFavCharacters];

    if (favCharacters.length > 0) {
      charData?.results.forEach((elem) => {
        const exist = newFilteredFavCharacters.find(
          (filteredElem) => filteredElem._id === elem._id
        );
        if (favCharacters.includes(elem._id) && exist === undefined) {
          newFilteredFavCharacters.push(elem);
          setFilteredFavCharacters(newFilteredFavCharacters);
        }
      });
    }
  }, [
    filteredFavCharacters,
    charData,
    favCharacters,
    setFilteredFavCharacters,
  ]);

  return filteredFavCharacters?.length > 0 ? (
    <div className="user-favorites-container">
      <h2>My Favorites Characters</h2>
      <div className="user-favorites">
        {filteredFavCharacters.map((charData) => {
          return (
            <CharacterCardGrid
              charData={charData}
              key={`fav ${charData._id}`}
              favCharacters={favCharacters}
              filteredFavCharacters={filteredFavCharacters}
              setFilteredFavCharacters={setFilteredFavCharacters}
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

export default FavoritesCharacters;
