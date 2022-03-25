import "./Comics.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";

import Searchbar from "../../components/Searchbar/Searchbar";
import ComicsGridCatalog from "../../components/ComicsGridCatalog/ComicsGridCatalog";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const Comics = ({ isActive, setIsActive, easySearch, setEasySearch }) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [title, setTitle] = useState("");

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  console.log("toi");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/comics?page=${page}&title=${title}`
        );
        const limit = response.data.limit;
        setPageCount(Math.ceil(response.data.count / limit));
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    console.log("booka");
    fetchData();
  }, [page, title]);

  if (easySearch) {
    setIsActive(true);
  }

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <main onMouseEnter={() => setEasySearch(false)}>
      <Searchbar
        searched={title}
        setter={setTitle}
        isActive={isActive}
        setIsActive={setIsActive}
        setEasySearch={setEasySearch}
      />
      <div className="comics-container">
        <ComicsGridCatalog data={data} />
      </div>
      <ReactPaginate
        containerClassName={"page-navigation"}
        activeClassName={"active"}
        nextLabel={<FontAwesomeIcon icon="arrow-right" />}
        previousLabel={<FontAwesomeIcon icon="arrow-left" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
      />
    </main>
  );
};

export default Comics;
