import "../../pages/Favorites/Favorites.css";

import { useState, useEffect } from "react";

import axios from "axios";

import ComicsCardGrid from "../ComicsCardGrid/ComicsCardGrid";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FavoritesComics = (
  favComics,
  filteredFavComics,
  setFilteredFavComics
) => {
  // This component appears in Favorites page

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/comics`
        );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const newFilteredFavComics = [...filteredFavComics];

    if (favComics.length > 0) {
      data?.results.forEach((elem) => {
        const exist = newFilteredFavComics.find(
          (filteredElem) => filteredElem._id === elem._id
        );
        if (favComics.includes(elem._id) && exist === undefined) {
          newFilteredFavComics.push(elem);
          setFilteredFavComics(newFilteredFavComics);
        }
      });
    }
  }, [filteredFavComics, data]);

  return isLoading ? (
    <LoadingSpinner />
  ) : filteredFavComics?.length > 0 ? (
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
