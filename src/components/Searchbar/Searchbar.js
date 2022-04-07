import "./Searchbar.css";

import { useRef, useEffect } from "react";

const Searchbar = ({ searched, setter, isActive }) => {
  //Searchbar is called in : Characters & Comics pages
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div
      className={
        isActive ? "searchbar-container active" : "searchbar-container"
      }
    >
      <input
        ref={inputRef}
        type="text"
        placeholder="Search"
        className="searchbar-input"
        value={searched}
        onChange={(event) => {
          setter(event.target.value);
        }}
      />
    </div>
  );
};

export default Searchbar;
