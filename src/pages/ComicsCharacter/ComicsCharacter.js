import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

import "./ComicsCharacter.css";
import ComicsCardGrid from "../../components/ComicsCardGrid/ComicsCardGrid";

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
        console.log(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [characterId]);

  return isLoading ? (
    <div></div>
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
      <section className="find-the-char">
        <h2>You can find {data.name} in these comics</h2>
      </section>
      {data.comics.map((comic, index) => {
        return <ComicsCardGrid comic={comic} key={comic._id} index={index} />;
      })}
    </main>
  );
};

export default ComicsCharacter;
