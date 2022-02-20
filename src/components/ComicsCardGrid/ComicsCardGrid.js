import "../ComicsCardGrid/ComicsCardGrid.css";

const ComicsCardGrid = ({ comic, index }) => {
  // this component appear
  const favComicsData = window.localStorage.comics;
  console.log(favComicsData);

  const addFavComic = () => {
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
  };

  const deleteComic = () => {
    const RemoveFavComicData = window.localStorage.comics.split(",");
    const newComicData = RemoveFavComicData.filter((id) => id !== comic._id);
    window.localStorage.comics = newComicData;
    window.location.reload();
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
          {!favComicsData?.includes(comic._id) ? (
            <button className="fav-btn" onClick={() => addFavComic()}>
              Add to favorites
            </button>
          ) : (
            <button className="fav-btn" onClick={() => deleteComic()}>
              Remove from Favorites
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComicsCardGrid;
