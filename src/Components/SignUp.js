import React from "react";
import { Link } from "react-router-dom";

const SignUp = (props) => {
  // AOS functionality
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

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
        {/* <Link to="/"> */}
          <button>Sign me up!</button>
        {/* </Link> */}
      </form>
    </div>
  );
};

export default SignUp;
