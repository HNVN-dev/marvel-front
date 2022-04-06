import "./CharactersGridCatalog.css";

import CharacterCardGrid from "../CharacterCardGrid/CharacterCardGrid";

const CharactersGridCatalog = ({
  charData,
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
}) => {
  // This component appear in pages => Characters
  return (
    <div className="grid-catalog-container">
      {charData.results.map((charData, index) => {
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
