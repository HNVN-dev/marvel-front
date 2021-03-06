import "./ComicsGridCatalog.css";
import ComicsCardGrid from "../ComicsCardGrid/ComicsCardGrid";

const ComicsGridCatalog = ({
  comicsData,
  filteredFavComics,
  setFilteredFavComics,
  favComics,
}) => {
  // This component appear in Comics page
  return (
    <div className="comics-grid-catalog-container">
      {comicsData.results.map((comic, index) => {
        return (
          <ComicsCardGrid
            comic={comic}
            key={comic._id}
            index={index}
            filteredFavComics={filteredFavComics}
            setFilteredFavComics={setFilteredFavComics}
            favComics={favComics}
          />
        );
      })}
    </div>
  );
};

export default ComicsGridCatalog;
