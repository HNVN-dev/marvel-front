import "../../pages/Favorites/Favorites.css";

import { useState, useEffect } from "react";

import axios from "axios";

import CharacterCardGrid from "../CharacterCardGrid/CharacterCardGrid";

const FavoritesCharacters = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const favCharactersData = window.localStorage.characters;

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

  return isLoading ? (
    <div></div>
  ) : favCharactersData?.length > 0 ? (
    <div className="user-favorites-container">
      <h2>My Favorites Characters</h2>
      <div className="user-favorites">
        {data.results.map((data) => {
          console.log(data);
          return (
            favCharactersData?.includes(data?._id) && (
              <CharacterCardGrid data={data} key={data._id} />
            )
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
