import { useRef, useState, useEffect } from "react";
const Login = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);
  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const openSignup = () => {
    // document.getElementById("login").style.display = "none";
    document.getElementById("signup-background").style.display = "block";
  };
  return (
    <div className="login" id="login">
      <div className="login-wrap">
        <div className="title">
          <div className="title-notes">Notes</div>
          <div className="title-descrition">
            Organize all your thoughts in one place.
          </div>
        </div>
        <div className="white-box">
          <div className="inputs">
            <div className="login-email-wrap">
              <div className="login-email">Email</div>
              <input
                type="email"
                id="userEmail"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
            </div>
            <div>
              <div className="login-password">Password</div>
              <input
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
          <button className="login-button">Log in</button>
          <hr />
          <div className="login-signup-button-wrap">
            <button className="login-signup-button" onClick={openSignup}>
              Create New Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
