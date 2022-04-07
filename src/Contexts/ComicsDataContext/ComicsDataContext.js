import { createContext, useState, useEffect } from "react";
import axios from "axios";

const ComicsDataContext = createContext();

const ComicsDataContextProvider = ({ children }) => {
  const [comicsData, setComicsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [title, setTitle] = useState("");

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const fetchComicsData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/comics?page=${page}&title=${title}`
        );

        setPageCount(Math.ceil(response.data.count / response.data.limit));
        setComicsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchComicsData();
  }, [page, title]);

  return (
    <ComicsDataContext.Provider
      value={{
        comicsData,
        isLoading,
        page,
        pageCount,
        title,
        setPageCount,
        handlePageClick,
        setTitle,
      }}
    >
      {children}
    </ComicsDataContext.Provider>
  );
};

export { ComicsDataContext, ComicsDataContextProvider };
