import "../../pages/Favorites/Favorites.css";

import { useState, useEffect } from "react";

import axios from "axios";

import ComicsCardGrid from "../ComicsCardGrid/ComicsCardGrid";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FavoritesComics = () => {
  // This component appears in Favorites page

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const favComicsData = window.localStorage.comics;

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

  return isLoading ? (
    <LoadingSpinner />
  ) : favComicsData?.length > 0 ? (
    <div className="user-favorites-container">
      <h2>My Favorites Comics</h2>
      <div className="user-favorites">
        {data.results.map((comic) => {
          return (
            favComicsData?.includes(comic?._id) && (
              <ComicsCardGrid comic={comic} key={comic._id} />
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

export default FavoritesComics;
