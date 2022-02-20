import logo from "../../assets/img/marvel-m-logo.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-container">
          <img src={logo} alt="marvel letter logo" />
        </div>
        <div className="footer-credit">
          MADE WITH REACT/NODE.JS BY HNVN ©2022
        </div>
      </div>
    </footer>
  );
};

export default Footer;
