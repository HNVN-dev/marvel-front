import "./ComicsGridCatalog.css";
import ComicsCardGrid from "../ComicsCardGrid/ComicsCardGrid";

const ComicsGridCatalog = ({
  data,
  filteredFavComics,
  setFilteredFavComics,
  favComics,
}) => {
  // This component appear in Comics page
  return (
    <div className="comics-grid-catalog-container">
      {data.results.map((comic, index) => {
        return (
          <ComicsCardGrid
            comic={comic}
            key={index}
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
