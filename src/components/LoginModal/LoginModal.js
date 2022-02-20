import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/img/marvel-logo.png";
import axios from "axios";

const LoginModal = ({
  setUser,
  closeAndClose,
  openOrClose,
  setIsOpen,
  createOpenOrClose,
  setWantToCreate,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleEmailTyping = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordTyping = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://hnvn-marvel-backend.herokuapp.com/user/login",
        { email, password }
        // email: email, password: password
      );
      if (response.data.token) {
        setUser(response.data.token);
        closeAndClose();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message);
      console.log(error.response);
      if (error.response.status === 400 || error.response.status === 401) {
        setErrorMessage("Identifiant ou mot de passe incorrect");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        className="login-form-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="logo-modal-container">
          <img src={logo} alt="" />
        </div>

        <span className="error-message">{errorMessage}</span>

        <input
          className="login-email-input"
          type="email"
          placeholder="Email address"
          onChange={handleEmailTyping}
        />

        <input
          className="login-password-input"
          type="password"
          placeholder="Password"
          onChange={handlePasswordTyping}
        />

        <input className="login-submit-input" value="Sign in" type="submit" />

        <div className="lost-account-username">
          <div>Need help signing in ?</div>
        </div>

        <div className="btn-modal-container">
          <button
            type="button"
            className="create-account"
            onClick={() => {
              setWantToCreate(true);
            }}
          >
            CREATE AN ACCOUNT
          </button>
        </div>

        <button
          className="login-close-btn"
          type="button"
          onClick={closeAndClose}
        >
          X
        </button>
      </div>
    </form>
  );
};

export default LoginModal;
