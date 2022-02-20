import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/img/marvel-logo.png";

const SignUpModal = ({ setUser, setWantToCreate, closeAndClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(
        "https://hnvn-marvel-backend.herokuapp.com/user/signup",
        { email: email, password: password }
        // email: email, password: password
      );
      if (response.data.token) {
        setUser(response.data.token);
        closeAndClose();
        navigate("/");
      }
    } catch (error) {
      if (error.response.status) {
        setErrorMessage("Email already registered.");
      }
    }
  };

  const handleEmailTyping = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordTyping = (event) => {
    setPassword(event.target.value);
  };

  return (
    <form className="signup-form" onSubmit={handleFormSubmit}>
      <div
        className="signup-form-container"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="logo-modal-container">
          <img src={logo} alt="" />
        </div>

        <h3>CREATE YOUR ACCOUNT</h3>

        <span>{errorMessage}</span>

        <input
          className="signup-email-input"
          type="email"
          value={email}
          placeholder="Email"
          onChange={handleEmailTyping}
        />

        <input
          className="signup-password-input"
          type="password"
          value={password}
          placeholder="Password"
          onChange={handlePasswordTyping}
        />

        <input className="signup-submit-input" type="submit" />

        <div className="already-registered">
          Already have an account ?
          <span
            className="back-sign-in"
            onClick={() => {
              console.log("clicked");
              setWantToCreate(false);
            }}
          >
            Sign in
          </span>
        </div>

        <button
          className="signup-close-btn"
          type="button"
          onClick={closeAndClose}
        >
          X
        </button>
      </div>
    </form>
  );
};

export default SignUpModal;
