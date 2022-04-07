import "./CharactersGridCatalog.css";

import CharacterCardGrid from "../CharacterCardGrid/CharacterCardGrid";

const CharactersGridCatalog = ({
  charsData,
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
}) => {
  return (
    <div className="grid-catalog-container">
      {charsData.results.map((charData, index) => {
        return (
          <CharacterCardGrid
            charData={charData}
            index={index}
            key={index}
            filteredFavCharacters={filteredFavCharacters}
            setFilteredFavCharacters={setFilteredFavCharacters}
            favCharacters={favCharacters}
          />
        );
      })}
    </div>
  );
};

export default CharactersGridCatalog;
