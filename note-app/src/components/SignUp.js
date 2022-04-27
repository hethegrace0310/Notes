import { useRef, useState, useEffect } from "react";
import { registerAPI, loginAPI } from "../api/userAPI";

const SignUp = () => {
  const errRef = useRef();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    setErrMsg("");
  }, [name, email, pwd]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const closeSignupModal = () => {
    document.getElementById("signup-background").style.display = "none";
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(name, email, pwd);
    if (validateEmail(email) && validatePassword(pwd)) {
      registerAPI(name, email, pwd).then((result) => {
        // loginAPI(email, pwd).then((result) => {
        window.location.reload();
        // });
      });
    }
  };
  return (
    <div className="signup-background" id="signup-background">
      <div className="signup">
        <div className="signup-white-box">
          <div className="signup-title">
            <div>Sign up</div>
            <div
              className="material-icons clickable"
              onClick={closeSignupModal}
            >
              lc_close
            </div>
          </div>
          <div className="signup-inputs">
            <div className="signup-input-wrap">
              <div>Name</div>
              <input
                className="signup-name"
                type="text"
                id="userName"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
            <div className="signup-input-wrap">
              <div>Email</div>
              <input
                className="signup-email"
                type="email"
                id="userEmail"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </div>
            <div className="signup-input-wrap">
              <div>Password</div>
              <input
                className="signup-password"
                type="password"
                id="userPassword"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
            </div>
          </div>
          <div
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </div>
          <div className="login-signup-button-wrap">
            <button className="login-signup-button" onClick={handleFormSubmit}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
