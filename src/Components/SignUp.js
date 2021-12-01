import React, { useState } from "react";

const SignUp = (props) => {
  return (
    <div>
      {" "}
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
  );
};

export default SignUp;
