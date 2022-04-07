import logo from "../../assets/img/marvel-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Modal from "../Modal/Modal";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignupModal/SignUpModal";
import LoggedModal from "../LoggedModal/LoggedModal";
import UserMenu from "../UserMenu/UserMenu";
import AltSearch from "../AltSearch/AltSearch";

import "./Header.css";
const Header = ({
  isActive,
  setIsActive,
  altSearchIsActive,
  setAltSearchIsActive,
  setEasySearch,
  setUser,
  token,
  setToken,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // State for the login modal
  const [wantToCreate, setWantToCreate] = useState(false);
  // State for the "Already registered" step on the login modal

  const [loggedOpen, setLoggedOpen] = useState(false);

  const location = useLocation();

  const createOpenOrClose = () => {
    if (wantToCreate) {
      setWantToCreate(false);
    } else {
      setWantToCreate(true);
    }
  };

  const openOrClose = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  };

  const closeAndClose = () => {
    // Close the modal if clicked outside
    // Reset the modal's state
    openOrClose();
    setWantToCreate(false);
  };

  useEffect(() => {
    setAltSearchIsActive(false);
    setIsActive(false);
  }, [location, setAltSearchIsActive, setIsActive]);

  return (
    <>
      <header>
        <nav className="top-nav">
          <div
            className="sign-in-join-container"
            onClick={(event) => event.stopPropagation()}
          >
            {token ? (
              <FontAwesomeIcon
                icon="user"
                size="lg"
                focusable="false"
                onClick={() => {
                  setLoggedOpen(!loggedOpen);
                }}
              />
            ) : (
              <div className="sign-in-join" onClick={openOrClose}>
                Sign in | Join
              </div>
            )}
            <LoggedModal loggedOpen={loggedOpen}>
              <div
                className="logged-overlay"
                onClick={() => setLoggedOpen(false)}
              >
                <UserMenu
                  loggedOpen={loggedOpen}
                  setLoggedOpen={setLoggedOpen}
                  setToken={setToken}
                />
              </div>
            </LoggedModal>
          </div>
          <Modal open={isOpen} setIsOpen={setIsOpen}>
            <div className="modal-overlay" onClick={closeAndClose}>
              {!wantToCreate ? (
                <LoginModal
                  autofocus="true"
                  openOrClose={openOrClose}
                  closeAndClose={closeAndClose}
                  setIsOpen={setIsOpen}
                  createOpenOrClose={createOpenOrClose}
                  setWantToCreate={setWantToCreate}
                  setUser={setUser}
                />
              ) : (
                <SignUpModal
                  openOrClose={openOrClose}
                  closeAndClose={closeAndClose}
                  setIsOpen={setIsOpen}
                  setWantToCreate={setWantToCreate}
                  setUser={setUser}
                />
              )}
            </div>
          </Modal>

          <div className="logo-container">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          {location.pathname === "/characters" ||
          location.pathname === "/comics" ? (
            <div
              className="search"
              onClick={() => {
                setIsActive(!isActive);
              }}
            >
              <FontAwesomeIcon className="icon" icon="search" size="lg" />
            </div>
          ) : (
            <div
              className="search"
              onClick={() => {
                setAltSearchIsActive(!altSearchIsActive);
              }}
            >
              <FontAwesomeIcon className="icon" icon="search" size="lg" />
            </div>
          )}
        </nav>

        <nav className="primary-nav">
          <ul>
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/characters">
              <li>Characters</li>
            </Link>
            <Link to="/comics">
              <li>Comics</li>
            </Link>
            <Link to="/favorites">
              <li>Favorites</li>
            </Link>
          </ul>
        </nav>
      </header>
      <AltSearch
        altSearchIsActive={altSearchIsActive}
        setAltSearchIsActive={setAltSearchIsActive}
        setIsActive={setIsActive}
        setEasySearch={setEasySearch}
      />
    </>
  );
};

export default Header;
