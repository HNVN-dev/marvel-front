import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Dependencies

import Cookies from "js-cookie";
/* import { Helmet } from "react-helmet"; */

// Pages

import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Notfound from "./pages/Notfound";
import Characters from "./pages/Characters/Characters";
import Comics from "./pages/Comics/Comics";
import ComicsCharacter from "./pages/ComicsCharacter/ComicsCharacter";
import Favorites from "./pages/Favorites/Favorites";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faSearch,
  faArrowRight,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
library.add(faUser, faSearch, faArrowRight, faArrowLeft);

function App() {
  const [token, setToken] = useState(Cookies.get("userToken") || null);
  const [isActive, setIsActive] = useState(false);
  const [homeIsActive, setHomeIsActive] = useState(false);
  const [easySearch, setEasySearch] = useState(false);
  const [filteredFavCharacters, setFilteredFavCharacters] = useState([]);
  const [filteredFavComics, setFilteredFavComics] = useState([]);

  const favCharacters = window.localStorage.characters;
  const favComics = window.localStorage.comics;

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 30 });
    } else {
      Cookies.remove("userToken");
    }
    setToken(token);
  };
  return (
    <Router>
      <Header
        homeIsActive={homeIsActive}
        setHomeIsActive={setHomeIsActive}
        isActive={isActive}
        setIsActive={setIsActive}
        setUser={setUser}
        token={token}
        setToken={setToken}
      />
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route
          path="/"
          element={
            <Home
              homeIsActive={homeIsActive}
              setHomeIsActive={setHomeIsActive}
              setIsActive={setIsActive}
              setEasySearch={setEasySearch}
            />
          }
        />
        <Route
          path="/characters"
          element={
            <Characters
              isActive={isActive}
              setIsActive={setIsActive}
              easySearch={easySearch}
              setEasySearch={setEasySearch}
              filteredFavCharacters={filteredFavCharacters}
              setFilteredFavCharacters={setFilteredFavCharacters}
              favCharacters={favCharacters}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              filteredFavCharacters={filteredFavCharacters}
              setFilteredFavCharacters={setFilteredFavCharacters}
              favCharacters={favCharacters}
              filteredFavComics={filteredFavComics}
              setFilteredFavComics={setFilteredFavComics}
              favComics={favComics}
            />
          }
        />
        <Route
          path="/comics"
          element={
            <Comics
              isActive={isActive}
              setIsActive={setIsActive}
              easySearch={easySearch}
              setEasySearch={setEasySearch}
              filteredFavComics={filteredFavComics}
              setFilteredFavComics={setFilteredFavComics}
              favComics={favComics}
            />
          }
        />

        <Route path="/comics/:characterId" element={<ComicsCharacter />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
