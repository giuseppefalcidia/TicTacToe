import React, { useState } from "react";

const LandingPage = () => {
  // State hooks for login and sign up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // todo - Current User Object
  //   const [currentUser, setCurrentUser] = useState({
  //     _id: "",
  //     username: "",
  //     // todo - Placeholders for future state to store..
  //     score: "",
  //     rank: "",
  //   });

  // Function to change the state variable corresponding to a form input the user tried to change
  const updateData = (event) => {
    // Switch
    switch (event.target.name) {
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      default:
        break;
    }
  };

  // ! LOGIN functionality
  // todo - POST and FETCH request for login - connect to database and setup correct path
  // Submit login data function - updated onChange..
  const submitLoginData = (event) => {
    event.preventDefault();

    // Collected Data from update data...
    const loginData = {
      username: username,
      password: password,
    };

    //  For testing...
    console.log(loginData.username);
    console.log(loginData.password);

    // todo - uncomment once set up with db
    // const jsonLoginData = JSON.stringify(loginData);

    // const settings = {
    //   method: "POST",
    //   body: jsonLoginData,
    //   header: {
    //     "Content-Type": "application/json",
    //   },
    // };

    // todo - set path
    // fetch("https://localhost:3001/login", settings)
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error("Incorrect username or password");
    //     }
    //   })
    //   .then((data) => {
    //     setCurrentUser(loginData);
    //   })
    //   .catch((err) => {
    //     alert(err.message);
    //     setUsername("");
    //     setPassword("");
    //   });
  };

  // ! Set same functionality for sign up as login

  return (
    <div className="landing-page-conatainer">
      {/* Welcome conatainer containing login and sign up options */}

      <div className="welcome-container">
        {/* // ? Login container */}
        <div className="login-container">
          <h2>Already a User?</h2>
          <h3>Login</h3>
          <form className="login-form" onSubmit={submitLoginData}>
            <label>Username</label>
            <input
              name="username"
              onChange={updateData}
              value={username}
            ></input>

            <label>Password</label>
            <input
              name="password"
              onChange={updateData}
              value={password}
            ></input>

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

            {/*  // ! Do we want a confirm password? */}
            {/* <label>Confirm Password</label>
            <input name="" onChange="" value=""></input> */}
            <button>Sign me up!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
