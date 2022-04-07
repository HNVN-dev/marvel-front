import "./Characters.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useContext, useEffect } from "react";

import ReactPaginate from "react-paginate";
import { CharsDataContext } from "../../Contexts/CharsDataContext/CharsDataContext";

import Searchbar from "../../components/Searchbar/Searchbar";
import CharactersGridCatalog from "../../components/CharactersGridCatalog/CharactersGridCatalog";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Characters = ({
  isActive,
  easySearch,
  setIsActive,
  setEasySearch,
  filteredFavCharacters,
  setFilteredFavCharacters,
  favCharacters,
}) => {
  const charsDataConsumer = useContext(CharsDataContext);

  // Open the searchbar auto when the user clicked on "Characters" in the searchbar at the homepage
  useEffect(() => {
    if (easySearch) {
      setIsActive(true);
    }
  });

  return charsDataConsumer.isLoading ? (
    <LoadingSpinner />
  ) : (
    <main onMouseEnter={() => setEasySearch(false)}>
      <Searchbar
        searched={charsDataConsumer.name}
        setter={charsDataConsumer.setName}
        isActive={isActive}
        setIsActive={setIsActive}
        setEasySearch={setEasySearch}
      />
      <div className="characters-container">
        <CharactersGridCatalog
          charsData={charsDataConsumer.charsData}
          favCharacters={favCharacters}
          filteredFavCharacters={filteredFavCharacters}
          setFilteredFavCharacters={setFilteredFavCharacters}
        />
      </div>
      <div className="navigation-container">
        <div className="page-navigation">
          <ReactPaginate
            containerClassName={"page-navigation"}
            activeClassName={"active"}
            nextLabel={<FontAwesomeIcon icon="arrow-right" />}
            previousLabel={<FontAwesomeIcon icon="arrow-left" />}
            renderOnZeroPageCount={null}
            onPageChange={charsDataConsumer.handlePageClick}
            pageRangeDisplayed={5}
            pageCount={charsDataConsumer.pageCount}
          />
        </div>
      </div>
    </main>
  );
};

export default Characters;
