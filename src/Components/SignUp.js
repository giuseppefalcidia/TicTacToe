import React, { useState } from "react";

const SignUp = () => {
  // State hooks for login and sign up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

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
      case "email":
        setEmail(event.target.value);
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

    // ! Should I split into different variables for login and sign up
    // Collected Data from update data...
    const signUpData = {
      username: username,
      password: password,
      email: email,
    };

    //  For testing...
    console.log(signUpData.username);
    console.log(signUpData.password);
    console.log(signUpData.email);

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
    // fetch("https://localhost:3001/signup", settings)
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

  return (
    <div className="landing-page-conatainer">
      {/* Welcome container containing login and sign up options */}

      <div className="welcome-container">
        {/* // ? Sign up container */}

        <div className="sign-up-container">
          <h3>New here?</h3>
          <form className="sign-up-form" onSubmit={submitLoginData}>
            <label>Username</label>
            <input
              name="username"
              onChange={updateData}
              value={username}
            ></input>

            <label>Email</label>
            <input name="email" onChange={updateData} value={email}></input>

            <label>Password</label>
            <input
              name="password"
              onChange={updateData}
              value={password}
            ></input>

            <button>Sign me up!</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
