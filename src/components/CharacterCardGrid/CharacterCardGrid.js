import "./CharacterCardGrid.css";
import { Link } from "react-router-dom";
const CharacterCardGrid = ({ data, index }) => {
  // This component appear in components => CharactersGridCatalog
  const favCharactersData = window.localStorage.characters;
  console.log(favCharactersData);

  const addFavCharacter = () => {
    const addFavCharacterData = window.localStorage.characters
      ? window.localStorage.characters.split(",")
      : [];

    if (!addFavCharacterData.includes(data._id.toString())) {
      addFavCharacterData.push(data._id);
      window.localStorage.characters = addFavCharacterData;
      window.location.reload();
    } else {
      console.log("Character already added");
    }
  };

  const deleteCharacter = () => {
    const RemoveFavCharData = window.localStorage.characters.split(",");
    const newCharData = RemoveFavCharData.filter((id) => id !== data._id);
    window.localStorage.characters = newCharData;
    window.location.reload();
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
                {`${data?.description.slice(0, 100)}...`}{" "}
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
          {!favCharactersData?.includes(data._id) ? (
            <button className="fav-btn" onClick={() => addFavCharacter()}>
              Add to favorites
            </button>
          ) : (
            <button className="fav-btn" onClick={() => deleteCharacter()}>
              Remove from Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterCardGrid;
