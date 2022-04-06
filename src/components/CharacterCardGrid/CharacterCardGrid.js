import "./CharacterCardGrid.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CharacterCardGrid = ({
  charData,
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
}) => {
  // This component appear in components => CharactersGridCatalog

  const [addedToFav, setAddedToFav] = useState(false);

  useEffect(() => {
    if (favCharacters?.includes(charData?._id)) {
      setAddedToFav(true);
    }
  }, [favCharacters, addedToFav, charData?._id]);

  const addFavCharacter = () => {
    const newFilteredFavCharacters = [...filteredFavCharacters];

    const addedFavCharacter = window.localStorage.characters
      ? window.localStorage.characters.split(",")
      : [];

    if (!filteredFavCharacters?.includes(charData?.id)) {
      newFilteredFavCharacters?.push(charData);
      setFilteredFavCharacters(newFilteredFavCharacters);
    }

    if (!addedFavCharacter.includes(charData?._id)) {
      addedFavCharacter.push(charData?._id);
      window.localStorage.characters = addedFavCharacter;
    }
    setAddedToFav(true);
  };

  const deleteCharacter = () => {
    const newFilteredFavCharacters = [...filteredFavCharacters];

    // Remove from the localStorage
    const removeFavChar = window.localStorage.characters.split(",");
    const newFavCharData = removeFavChar.filter((id) => id !== charData?._id);
    window.localStorage.characters = newFavCharData;

    // Remove from the filtered Array
    if (favCharacters?.includes(charData?._id)) {
      const index = newFilteredFavCharacters.indexOf(charData);
      newFilteredFavCharacters.splice(index, 1);
      setFilteredFavCharacters(newFilteredFavCharacters);
    }

    setAddedToFav(false);
  };

  return (
    <div className="container">
      <div className="front">
        <div className="img-container">
          <img
            src={`${charData?.thumbnail?.path}.${charData?.thumbnail?.extension}`}
            alt=""
          />
        </div>
        <div className="inner">
          <h3>{charData?.name}</h3>
        </div>
      </div>

      <div className="back">
        <Link to={`/comics/${charData?._id}`}>
          <div className="inner">
            {charData?.description?.length > 100 ? (
              <p>
                {`${charData?.description.slice(0, 100)}...`}
                <button>See more</button>
              </p>
            ) : charData?.description?.length < 50 &&
              charData?.description?.length !== 0 ? (
              <p>{charData?.description}</p>
            ) : (
              <p>
                There's no information for the moment. Please click to check
                more infos about {charData?.name}
              </p>
            )}
          </div>
        </Link>
        <div className="fav-button-container">
          {!addedToFav ? (
            <button
              className="fav-btn"
              onClick={(event) => {
                addFavCharacter();
                event.stopPropagation();
              }}
            >
              Add to favorites
            </button>
          ) : (
            <button
              className="fav-btn"
              onClick={(event) => {
                deleteCharacter();
                event.stopPropagation();
              }}
            >
              Remove from Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCardGrid;
