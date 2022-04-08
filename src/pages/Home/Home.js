import "./Home.css";

import { Link } from "react-router-dom";
import heroImg from "../../assets/img/marvel-banner.jpeg";
import heroComicsImg from "../../assets/img/comics-banner.jpeg";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <div className="characters-hero">
          <div className="characters-img-container">
            <img src={heroImg} alt="a beautiful banner with marvel heroes" />
          </div>
          <div className="characters-intro-text">
            <h3>Check the characters here !</h3>
            <Link to="/characters">
              <button>Go to Characters page</button>
            </Link>
          </div>
        </div>
        <div className="comics-hero">
          <div className="comics-intro-text">
            <h3>Check the comics here !</h3>
            <Link to="/comics">
              <button>Go to Comics page</button>
            </Link>
          </div>
          <div className="comics-img-container">
            <img src={heroComicsImg} alt="a tons of Marvel Comics" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
