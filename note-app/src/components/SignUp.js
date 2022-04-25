const SignUp = () => {
  const closeSignupModal = () => {
    document.getElementById("signup-background").style.display = "none";
  };
  const handleFormSubmit = (event) => {
    event.preventDefault();
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
              <div className="signup-name">Name</div>
              <input type="text" />
            </div>
            <div className="signup-input-wrap">
              <div className="signup-email">Email</div>
              <input type="email" />
            </div>
            <div className="signup-input-wrap">
              <div className="signup-password">Password</div>
              <input type="password" />
            </div>
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
