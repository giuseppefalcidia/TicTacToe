import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// AOS
import Aos from "aos";
import "aos/dist/aos.css";

const LandingPage = (props) => {
  // AOS functionality
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="landing-page-container"
      // AOS
      data-aos="fade-down"
    >
      {/* Welcome container containing login and sign up options */}
      <header className="app-header">
        <h1 className="app-heading">
          Welcome to <br /> Tic Tac Toe
        </h1>
      </header>
      <div className="welcome-container">
        {/* // ? Login container */}
        <div className="login-container">
          <h2 className="user-heading">Already a User?</h2>

          <form
            className="login-form"
            username={props.currentUser}
            // onSubmit={RedirectToDashboard}
            onSubmit={props.submitLoginData}
          >
            <h3 className="login-heading">Login Here</h3>

            <label>Username</label>
            <input
              name="username"
              onChange={props.updateData}
              value={props.username}
            ></input>

            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={props.updateData}
              value={props.password}
            ></input>

            <button>Login to play!</button>
          </form>
        </div>

        {/* //  Will navigate to sign up section */}
        <div className="new-user-container">
          <div className="signup-heading">Or are you new here?</div>

          <Link to="/signup" alt="Link to signup page">
            <button name="signUp" className="go-to-sign-up-button">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
