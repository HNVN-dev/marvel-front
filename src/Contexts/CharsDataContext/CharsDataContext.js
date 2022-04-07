import { createContext, useState, useEffect } from "react";
import axios from "axios";

const CharsDataContext = createContext();

const CharsDataContextProvider = ({ children }) => {
  const [charsData, setCharsData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [name, setName] = useState("");

  const handlePageClick = (event) => {
    setPage(event.selected + 1);
  };

  useEffect(() => {
    const fetchCharData = async () => {
      try {
        const response = await axios.get(
          `https://hnvn-marvel-backend.herokuapp.com/characters?page=${page}&name=${name}`
        );

        setPageCount(Math.ceil(response.data.count / response.data.limit));
        setCharsData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchCharData();
  }, [page, name]);

  return (
    <CharsDataContext.Provider
      value={{
        charsData,
        isLoading,
        page,
        pageCount,
        name,
        setPage,
        setPageCount,
        handlePageClick,
        setName,
      }}
    >
      {children}
    </CharsDataContext.Provider>
  );
};

export { CharsDataContext, CharsDataContextProvider };
