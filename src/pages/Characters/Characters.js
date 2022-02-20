import CharactersGridCatalog from "../../components/CharactersGridCatalog/CharactersGridCatalog";
import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
import "./Characters.css";
import Searchbar from "../../components/Searchbar/Searchbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Characters = ({ isActive, setIsActive, easySearch, setEasySearch }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [name, setName] = useState("");

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/characters?page=${page}&name=${name}`
        );

        const limit = response.data.limit;
        setPageCount(Math.ceil(response.data.count / limit));
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, name]);
  console.log(easySearch);
  if (easySearch) {
    setIsActive(true);
  }

  return isLoading ? (
    <div className="loading"></div>
  ) : (
    <main onMouseEnter={() => setEasySearch(false)}>
      <Searchbar
        searched={name}
        setter={setName}
        isActive={isActive}
        setIsActive={setIsActive}
        setEasySearch={setEasySearch}
      />
      <div className="characters-container">
        <CharactersGridCatalog data={data} />
      </div>
      <div className="navigation-container">
        <div className="page-navigation">
          <ReactPaginate
            containerClassName={"page-navigation"}
            activeClassName={"active"}
            nextLabel={<FontAwesomeIcon icon="arrow-right" />}
            previousLabel={<FontAwesomeIcon icon="arrow-left" />}
            renderOnZeroPageCount={null}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
          />
        </div>
      </div>
    </main>
  );
};

export default Characters;
