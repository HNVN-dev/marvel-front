import "./HomeSearch.css";

import { Link } from "react-router-dom";

const HomeSearch = ({ homeIsActive, setIsActive, setEasySearch }) => {
  return (
    <div
      className={
        homeIsActive ? "home-search-container active" : "home-search-container"
      }
    >
      <Link
        to="/characters"
        onClick={() => {
          setEasySearch(true);
        }}
      >
        <div className="to-characters">Characters</div>
      </Link>
      <span className="separator">|</span>
      <Link to="/comics" onClick={() => setEasySearch(true)}>
        <div className="to-comics">Comics</div>
      </Link>
    </div>
  );
};

export default HomeSearch;
