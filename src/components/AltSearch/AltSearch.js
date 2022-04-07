import "./AltSearch.css";

import { Link } from "react-router-dom";

const AltSearch = ({ altSearchIsActive, setEasySearch }) => {
  // This component appears in Header component

  return (
    <div
      className={
        altSearchIsActive
          ? "alt-search-container active"
          : "alt-search-container"
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

export default AltSearch;
