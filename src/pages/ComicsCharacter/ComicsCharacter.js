import "./ComicsCharacter.css";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import ComicsCardGrid from "../../components/ComicsCardGrid/ComicsCardGrid";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const ComicsCharacter = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const { characterId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/comics/${characterId}`
        );
        setData(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <main className="comics-character-container">
      <div className="character-introduction">
        <div className="character-img">
          <img
            src={`${data?.thumbnail?.path}.${data?.thumbnail?.extension}`}
            alt=""
          />
        </div>
        <div className="character-name-description">
          <h1>{data?.name}</h1>
          <p>{data?.description}</p>
        </div>
      </div>
      {data.comics.length > 0 ? (
        <section className="comics-appears">
          <h2>You can find {data.name} here </h2>
        </section>
      ) : (
        <section className="comics-appears">
          <h2>Sorry, we will update the informations soon !</h2>
        </section>
      )}
      {data?.comics &&
        data.comics.map((comic, index) => {
          return (
            <>
              <ComicsCardGrid comic={comic} key={comic._id} index={index} />
            </>
          );
        })}
    </main>
  );
};

export default ComicsCharacter;
