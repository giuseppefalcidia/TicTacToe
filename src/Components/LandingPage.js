import React from "react";
import { Link } from "react-router-dom";

const LandingPage = (props) => {
  return (
    <div className="landing-page-container">
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

          <form className="login-form" onSubmit={props.submitLoginData}>
            <h3 className="login-heading">Login Here</h3>

            <label>Username</label>
            <input
              name="username"
              onChange={props.updateData}
              value={props.username}
            ></input>

            <label>Password</label>
            <input
              name="password"
              onChange={props.updateData}
              value={props.password}
            ></input>

            <button>Login to play!</button>
          </form>
        </div>

        {/* // !! Will navigate to sign up section */}

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
