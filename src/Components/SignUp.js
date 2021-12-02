<<<<<<< HEAD
import React from "react";
import { Link } from "react-router-dom";
=======
import React, { useEffect } from "react";

// AOS
import Aos from "aos";
import "aos/dist/aos.css";
>>>>>>> 0be96d27ea96a488bf901257f7ed74e655ed4380

const SignUp = (props) => {
  // AOS functionality
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
<<<<<<< HEAD
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
        {/* <Link to="/"> */}
          <button>Sign me up!</button>
        {/* </Link> */}
      </form>
=======
    <div
      className="sign-in-page-container" // AOS
      data-aos="fade-down"
    >
      <h3 className="signup-h3">Sign up now to join the greatest game ever!</h3>{" "}
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
          {/* // ! */}
          {/* // todo waiting on Routing */}
          <button>Sign me up!</button>
        </form>
      </div>
>>>>>>> 0be96d27ea96a488bf901257f7ed74e655ed4380
    </div>
  );
};

export default SignUp;
