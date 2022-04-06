import "../../pages/Favorites/Favorites.css";

import { useState, useEffect } from "react";

import axios from "axios";

import CharacterCardGrid from "../CharacterCardGrid/CharacterCardGrid";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FavoritesCharacters = ({
  favCharacters,
  filteredFavCharacters,
  setFilteredFavCharacters,
}) => {
  // This component appears in Favorites page

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/characters`
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
    const newFilteredFavCharacters = [...filteredFavCharacters];

    if (favCharacters.length > 0) {
      data?.results.forEach((elem) => {
        const exist = newFilteredFavCharacters.find(
          (filteredElem) => filteredElem._id === elem._id
        );
        if (favCharacters.includes(elem._id) && exist === undefined) {
          newFilteredFavCharacters.push(elem);
          setFilteredFavCharacters(newFilteredFavCharacters);
        }
      });
    }
  }, [filteredFavCharacters, data, favCharacters, setFilteredFavCharacters]);

  return isLoading ? (
    <LoadingSpinner />
  ) : filteredFavCharacters?.length > 0 ? (
    <div className="user-favorites-container">
      <h2>My Favorites Characters</h2>
      <div className="user-favorites">
        {filteredFavCharacters.map((data) => {
          return (
            <CharacterCardGrid
              data={data}
              key={`fav ${data._id}`}
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
