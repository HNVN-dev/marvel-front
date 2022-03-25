import "../ComicsCardGrid/ComicsCardGrid.css";

import { useState, useEffect } from "react";

const ComicsCardGrid = ({
  comic,
  favComics,
  filteredFavComics,
  setFilteredFavComics,
}) => {
  // this component appear in Comics Grid Catalog component & FavoritesComics component

  const [addedToFav, setAddedToFav] = useState(false);

  useEffect(() => {
    if (favComics?.includes(comic._id)) {
      setAddedToFav(true);
    }
  }, [favComics, addedToFav]);

  /*  const addFavComic = () => {
    const addFavComicData = window.localStorage.comics
      ? window.localStorage.comics.split(",")
      : [];

    if (!addFavComicData.includes(comic._id.toString())) {
      addFavComicData.push(comic._id);
      window.localStorage.comics = addFavComicData;
      window.location.reload();
    } else {
      console.log("Comic already added");
    }
  }; */

  const addFavComic = () => {
    const newFilteredFavComics = [...filteredFavComics];

    const addedFavComic = window.localStorage.comics
      ? window.localStorage.comics.split(",")
      : [];

    if (!filteredFavComics?.includes(comic.id)) {
      newFilteredFavComics?.push(comic);
      setFilteredFavComics(newFilteredFavComics);
    }

    if (!addedFavComic.includes(comic._id)) {
      addedFavComic.push(comic._id);
      window.localStorage.comics = addedFavComic;
    }
    setAddedToFav(true);
  };

  /* const deleteComic = () => {
    const RemoveFavComicData = window.localStorage.comics.split(",");
    const newComicData = RemoveFavComicData.filter((id) => id !== comic._id);
    window.localStorage.comics = newComicData;
    window.location.reload();
  }; */

  const deleteComic = () => {
    const newFilteredFavComics = [...filteredFavComics];

    // Remove from the localStorage
    const removeFavComic = window.localStorage.comics.split(",");
    const newCharData = removeFavComic.filter((id) => id !== comic._id);
    window.localStorage.comics = newCharData;

    // Remove from the filtered Array
    if (favComics?.includes(comic._id)) {
      const index = newFilteredFavComics.indexOf(comic);
      newFilteredFavComics.splice(index, 1);
      setFilteredFavComics(newFilteredFavComics);
    }

    setAddedToFav(false);
  };

  return (
    <div className="comics-card-container">
      <div className="comics-card-front">
        <div className="comics-card-img-container">
          <img
            src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
            alt=""
          />
        </div>
        <div className="comics-card-inner">
          <h3>{comic.name}</h3>
        </div>
      </div>

      <div className="comics-card-back">
        <div className="comics-card-inner">
          {comic.description ? (
            <p>{comic.description}</p>
          ) : (
            <p>Resume will be updated sooner !</p>
          )}
        </div>
        <div className="fav-button-container">
          {!addedToFav ? (
            <button
              className="fav-btn"
              onClick={(event) => {
                addFavComic();
                event.stopPropagation();
              }}
            >
              Add to favorites
            </button>
          ) : (
            <button
              className="fav-btn"
              onClick={(event) => {
                deleteComic();
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

export default ComicsCardGrid;
