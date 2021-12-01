import React from "react";

const SignUp = (props) => {
  return (
    <div className="sign-in-page-container">
      <h3 className="signup-h3">Sign up now to join the best game ever!</h3>{" "}
      <div className="sign-in-form-container">
        <form className="sign-up-form" onSubmit={props.addLoginData}>
          <label>Username</label>{" "}
          <input
            name="username"
            onChange={props.updateData}
            value={props.username}
          ></input>
          <label>Email</label>
          <input
            name="email"
            onChange={props.updateData}
            value={props.email}
          ></input>
          <label>Password</label>
          <input
            name="password"
            onChange={props.updateData}
            value={props.password}
          ></input>
          <button>Sign me up!</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
