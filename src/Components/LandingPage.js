import React, { useState } from "react";

const LandingPage = () => {
  // State hooks for login and sign up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [email, setEmail] = useState("");

  const [signUpArea, setSignUpAre] = useState(false);

  // !!! Write code for 'if sign up then display none on login and display  Sign up form
  const signUpDisplay = React.createRef();

  // todo - Current User Object
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    // todo - Placeholders for future state to store..
    score: "",
    rank: "",
  });

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
      case "signUp":
        signUpArea(event.target.value);
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
    const loginData = {
      username: username,
      password: password,
    };

    //  For testing...
    console.log(loginData.username);
    console.log(loginData.password);

    // todo - uncomment once set up with db
    const jsonLoginData = JSON.stringify(loginData);

    const settings = {
      method: "POST",
      body: jsonLoginData,
      header: {
        "Content-Type": "application/json",
      },
    };

    // todo - set path
    fetch("https://localhost:3001/login", settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Incorrect username or password");
        }
      })
      .then((data) => {
        setCurrentUser(loginData);
        // if (data.token) {
        //  navigate('/dashboard')
        // }
      })
      .catch((err) => {
        alert(err.message);
        setUsername("");
        setPassword("");
      });
  };

  // !!! Write code for 'if sign up then display none on login and display  Sign up form
  //   const displaySignIn = (event) => {
  //     event.preventDefault();

  // if(signUpArea){

  //     return (
  //       <>
  //         <div className="sign-in-div" ref={signUpDisplay}>
  //           <form className="sign-up-form" onSubmit={submitLoginData}>
  //             <label>Username</label>
  //             <input
  //               name="username"
  //               onChange={updateData}
  //               value={username}
  //             ></input>

  //             <label>Email</label>
  //             <input name="email" onChange={updateData} value={email}></input>

  //             <label>Password</label>
  //             <input
  //               name="password"
  //               onChange={updateData}
  //               value={password}
  //             ></input>

  //             <button>Sign me up!</button>
  //           </form>
  //         </div>
  //       </>
  //     );
  //     }
  //   };

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

        {/* // !! Will navigate to sign up section */}
        <div>Or are you new here?</div>
        <button
          // onClick={displaySignIn}
          name="signUp"
          className="go-to-sign-up-button"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
