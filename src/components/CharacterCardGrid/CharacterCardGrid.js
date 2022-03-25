import "./CharacterCardGrid.css";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const CharacterCardGrid = ({
  data,
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
}) => {
  // This component appear in components => CharactersGridCatalog

  const [addedToFav, setAddedToFav] = useState(false);

  useEffect(() => {
    if (favCharacters?.includes(data._id)) {
      setAddedToFav(true);
    }
  }, [favCharacters, addedToFav]);

  /*  const addFavCharacter = () => {
    const addedFavCharacterData = window.localStorage.characters
      ? window.localStorage.characters.split(",")
      : [];

    if (!addedFavCharacterData.includes(data._id)) {
      addedFavCharacterData.push(data._id);
      window.localStorage.characters = addedFavCharacterData;
      setAddedToFav(true);
    } else {
      console.log("Character already added");
    }
  }; */
  const addFavCharacter = () => {
    const newFilteredFavCharacters = [...filteredFavCharacters];

    const addedFavCharacterData = window.localStorage.characters
      ? window.localStorage.characters.split(",")
      : [];

    if (!filteredFavCharacters?.includes(data.id)) {
      newFilteredFavCharacters?.push(data);
      setFilteredFavCharacters(newFilteredFavCharacters);
    }

    if (!addedFavCharacterData.includes(data._id)) {
      addedFavCharacterData.push(data._id);
      window.localStorage.characters = addedFavCharacterData;
    }

    setAddedToFav(true);
  };

  /*   const deleteCharacter = () => {
    const removeFavCharData = window.localStorage.characters.split(",");
    const newCharData = removeFavCharData.filter((id) => id !== data._id);
    window.localStorage.characters = newCharData;
    setAddedToFav(false);
  }; */

  const deleteCharacter = () => {
    const newFilteredFavCharacters = [...filteredFavCharacters];

    // Remove from the localStorage
    const removeFavCharData = window.localStorage.characters.split(",");
    const newCharData = removeFavCharData.filter((id) => id !== data._id);
    window.localStorage.characters = newCharData;

    // Remove from the filtered Array
    if (favCharacters?.includes(data._id)) {
      const index = newFilteredFavCharacters.indexOf(data);
      newFilteredFavCharacters.splice(index, 1);
      console.log(filteredFavCharacters);
      setFilteredFavCharacters(newFilteredFavCharacters);
    }

    setAddedToFav(false);
  };

  return (
    <div className="container">
      <div className="front">
        <div className="img-container">
          <img
            src={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
            alt=""
          />
        </div>
        <div className="inner">
          <h3>{data?.name}</h3>
        </div>
      </div>

      <div className="back">
        <Link to={`/comics/${data?._id}`}>
          <div className="inner">
            {data?.description?.length > 100 ? (
              <p>
                {`${data?.description.slice(0, 100)}...`}
                <button>See more</button>
              </p>
            ) : data.description?.length < 50 &&
              data?.description?.length !== 0 ? (
              <p>{data?.description}</p>
            ) : (
              <p>
                There's no information for the moment. Please click to check
                more infos about {data?.name}
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
