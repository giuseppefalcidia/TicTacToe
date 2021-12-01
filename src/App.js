import React, { useState } from "react";
import LandingPage from "./Components/LandingPage";
import GamePage from "./Components/GamePage";
import SignUp from "./Components/SignUp";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
} from "react-router-dom";

import "./Styling/App.scss";

const App = () => {
  // State hooks for login and sign up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // todo - Current User Object
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    // todo - Placeholders for future state to store..
    // score: "",
    // rank: "",
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
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // todo - set path
    fetch("http://localhost:5000/login", settings)
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          switch (response.status) {
            case 401:
              return response.json().then((err) => {
                throw new Error(err.message);
              });
            default:
              throw new Error("unknown");
          }
        }
      })
      .then((data) => {
        setCurrentUser(data);
        setUsername("");
        setPassword("");
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

  // !! ======

  const addLoginData = (event) => {
    event.preventDefault();

    // Collected Data from update data...
    const loginData = {
      username: username,
      password: password,
      email: email,
    };

    //  For testing...
    // console.log(loginData.username);
    // console.log(loginData.password);

    // todo - uncomment once set up with db
    const jsonLoginData = JSON.stringify(loginData);

    const settings = {
      method: "POST",
      body: jsonLoginData,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };

    // todo - set path
    fetch("http://localhost:5000/user", settings)
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        } else {
          switch (response.status) {
            case 401:
              return response.json().then((err) => {
                throw new Error(err.message);
              });
            default:
              throw new Error("unknown");
          }
        }
      })
      .then((data) => {
        // !! Check back with currentUser
        console.log(data);
        // setCurrentUser(data);
        setUsername("");
        setPassword("");
        setEmail("");
        // if (data.token) {
        //  navigate('/dashboard')
        // }
      })
      .catch((err) => {
        alert(err.message);
        setUsername("");
        setPassword("");
        setEmail("");
      });
  };

  return (
    <Router>
      <div className="app-container">
        <main className="main-container">
          <Routes>
            {/* <LandingPage /> */}
            <Route
              path="/"
              exact
              element={
                <LandingPage
                  submitLoginData={submitLoginData}
                  updateData={updateData}
                  username={username}
                  password={password}
                />
              }
            />
            {/* SignUp page */}
            <Route
              path="/signup"
              exact
              element={
                <SignUp
                  addLoginData={addLoginData}
                  updateData={updateData}
                  username={username}
                  password={password}
                  email={email}
                />
              }
            />

            {/* <GamePage /> */}
            <Route path="/gamepage" exact element={<GamePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
