import React, { useState } from "react";
import LandingPage from "./Components/LandingPage";
import GamePage from "./Components/GamePage";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";

import "./Styling/App.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

const App = () => {
  // State hooks for login and sign up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // ! Adding manually as I could not get it to merge
  // let history = useNavigate();
  // ! - How to implement?
  // const redirectToDashboard = () => {
  //   history.push("/dashboard");
  // };

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
        // ? Successful tost message
        const loginSuccessful = () => {
          toast("Login successful!! Time to start playing! 👾  🎲", {
            position: "top-center",
            draggable: false,
          });
        };

        loginSuccessful();
        setCurrentUser(data);
        setUsername("");
        setPassword("");
        // if (data.token) {
        //  navigate('/dashboard')
        // }
      })
      .catch((err) => {
        // ? Error toast message
        const loginFailed = () => {
          toast.error(`Error: ${err.message}`, {
            position: "top-center",
            draggable: false,
          });
        };

        loginFailed();
        // alert(err.message);
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
        // ? Successful toast message
        const signupSuccessful = () => {
          toast("Sign up successful!! Time to start playing! 👾  🎲", {
            position: "top-center",
            draggable: false,
          });
        };

        // todo Check back with currentUser
        console.log(data);
        // setCurrentUser(data);
        signupSuccessful();
        setUsername("");
        setPassword("");
        setEmail("");

        // if (data.token) {
        //  navigate('/dashboard')
        // }
      })
      .catch((err) => {
        // ? Error toast message
        const signUpFailed = () => {
          toast.error(`Error: ${err.message}`, {
            position: "top-center",
            draggable: false,
          });
        };

        signUpFailed();
        // alert(err.message);
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

            <Route
              path="/dashboard"
              exact
              element={<Dashboard username={currentUser.username} />}
            />

            <Route path="/gamepage" exact element={<GamePage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
