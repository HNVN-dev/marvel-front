import "./CharactersGridCatalog.css";

import CharacterCardGrid from "../CharacterCardGrid/CharacterCardGrid";

const CharactersGridCatalog = ({
  data,
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
}) => {
  // This component appear in pages => Characters
  return (
    <div className="grid-catalog-container">
      {data.results.map((data, index) => {
        return (
          <CharacterCardGrid
            data={data}
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
