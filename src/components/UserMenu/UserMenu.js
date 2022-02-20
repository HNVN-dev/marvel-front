import "./UserMenu.css";
import Cookies from "js-cookie";

const UserMenu = ({ setToken, loggedOpen, setLoggedOpen }) => {
  return (
    <div className="user-menu-container">
      <div className="user-menu">
        <ul>
          <li>My Account</li>
          <li
            className="disconnect-btn"
            onClick={() => {
              setToken(Cookies.remove("userToken"));
              setLoggedOpen(false);
            }}
          >
            Disconnect
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserMenu;
