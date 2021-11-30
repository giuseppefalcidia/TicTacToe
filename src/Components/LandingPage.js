import React from "react";

const LandingPage = () => {
  return (
    <div className="landing-page-conatainer">
      {/* Welcome conatainer containing login and sign up options */}

      <div className="welcome-container">
        {/* // ? Login container */}
        <div className="login-container">
          <h2>Already a User?</h2>
          <h3>Login</h3>
          <form className="login-form" onSubmit="">
            <label>Username</label>
            <input name="" onChange="" value=""></input>

            <label>Password</label>
            <input name="" onChange="" value=""></input>

            <button>Login</button>
          </form>
        </div>

        {/* // ? Sign up container */}

        <div className="sign-up-container">
          <h3>Sign Up</h3>
          <form className="sign-up-form" onSubmit="">
            <label>Username</label>
            <input name="" onChange="" value=""></input>

            <label>Email</label>
            <input name="" onChange="" value=""></input>

            <label>Password</label>
            <input name="" onChange="" value=""></input>

            <label>Confirm Password</label>
            <input name="" onChange="" value=""></input>
            <button>Sign me up!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
