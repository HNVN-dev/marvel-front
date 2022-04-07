import "./Comics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext, useEffect } from "react";
import ReactPaginate from "react-paginate";

import Searchbar from "../../components/Searchbar/Searchbar";
import ComicsGridCatalog from "../../components/ComicsGridCatalog/ComicsGridCatalog";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import { ComicsDataContext } from "../../Contexts/ComicsDataContext/ComicsDataContext";

const Comics = ({
  isActive,
  setIsActive,
  easySearch,
  setEasySearch,
  filteredFavComics,
  setFilteredFavComics,
  favComics,
}) => {
  const comicsDataConsumer = useContext(ComicsDataContext);

  useEffect(() => {
    if (easySearch) {
      setIsActive(true);
    }
  });

  return comicsDataConsumer.isLoading ? (
    <LoadingSpinner />
  ) : (
    <main onMouseEnter={() => setEasySearch(false)}>
      <Searchbar
        searched={comicsDataConsumer.title}
        setter={comicsDataConsumer.setTitle}
        isActive={isActive}
        setIsActive={setIsActive}
        setEasySearch={setEasySearch}
      />
      <div className="comics-container">
        <ComicsGridCatalog
          comicsData={comicsDataConsumer.comicsData}
          filteredFavComics={filteredFavComics}
          setFilteredFavComics={setFilteredFavComics}
          favComics={favComics}
        />
      </div>
      <ReactPaginate
        containerClassName={"page-navigation"}
        activeClassName={"active"}
        nextLabel={<FontAwesomeIcon icon="arrow-right" />}
        previousLabel={<FontAwesomeIcon icon="arrow-left" />}
        onPageChange={comicsDataConsumer.handlePageClick}
        pageRangeDisplayed={5}
        pageCount={comicsDataConsumer.pageCount}
      />
    </main>
  );
};

export default Comics;
