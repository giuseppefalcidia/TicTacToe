import React, { useState } from "react";
import LandingPage from "./Components/LandingPage";
import GamePage from "./Components/GamePage";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import { SocketProvider } from "./contexts/SocketProvider";
import { GameProvider } from "./contexts/GameProvider";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";

import "./Styling/App.scss";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

// ? Environmental Variables
let backendPort = process.env.REACT_APP_BACKEND_PORT;
let frontendPort = process.env.REACT_APP_FRONTEND_PORT;

const App = () => {
  // State hooks for login and sign up
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // TODO Marc create a useState or similar with the ID to pass to the SocketProvider
  const id = "test";

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
      case "newpassword":
        setNewPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  // ? LOGIN functionality
  // Submit login data function - updated onChange..
  const submitLoginData = (event) => {
    event.preventDefault();

    // Collected Data from update data...
    const loginData = {
      username: username,
      password: password,
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
    fetch(`http://localhost:${backendPort}/login`, settings)
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
        // console.log("Successful login!");
        // console.log("!!!!!", data);

        // ? Successful tost message
        const loginSuccessful = () => {
          // !!! TESTING so we can pass currentUser state to dashboard
          setCurrentUser(data);
          console.log(username);
          console.log(currentUser.username);
          console.log("!!!!!!!!", currentUser);

          toast(
            ` ${username} Login successful!! Taking you to the game! 👾  🎲 `,
            {
              position: "top-center",
              autoClose: 2000,
              draggable: false,

              // !!! currentUser state is holding until dashboard renders
              onClose: () =>
                window.location.replace(
                  `http://localhost:${frontendPort}/dashboard`
                ),
            }
          );
          // console.log("!!!!!!!!", currentUser);
        };

        setCurrentUser(data);
        loginSuccessful();
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
            autoClose: 2000,
          });
        };

        loginFailed();
        // alert(err.message);
        setUsername("");
        setPassword("");
      });
  };

  console.log("???????????", currentUser);

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
    fetch(`http://localhost:${backendPort}/user`, settings)
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
          toast(
            "Sign up successful!! Time to login and to start playing! 👾  🎲 ",
            {
              position: "top-center",
              autoClose: 2000,
              draggable: false,
              onClose: () =>
                window.location.replace(`http://localhost:${frontendPort}/`),
            }
          );
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
            autoClose: 2000,
          });
        };

        signUpFailed();
        // alert(err.message);
        setUsername("");
        setPassword("");
        setEmail("");
      });
  };

  const changePassword = (event) => {
    event.preventDefault();

    const changePassword = {
      // userId: props.currentUser._id,
      newPassword: newPassword,
    };

    const jsonPasswordData = JSON.stringify(changePassword);

    const settings = {
      method: "PATCH",
      body: jsonPasswordData,
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`http://localhost:${frontendPort}/user/${currentUser._id}`, settings)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          switch (response.status) {
            case 404:
              return response.json().then((err) => {
                throw new Error(err.message);
              });
            default:
              throw new Error("unknown");
          }
        }
      })
      .then((data) => {
        console.log(data);
        setNewPassword("");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <SocketProvider id={id}>
      <GameProvider id={id}>
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
                      currentUser={currentUser}
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
                  element={
                    <Dashboard
                      // username={currentUser.username}
                      changePassword={changePassword}
                      newPassword={newPassword}
                      update={updateData}
                      currentUser={currentUser}
                    />
                  }
                />

                {/* Game page */}
                <Route path="/gamepage" exact element={<GamePage />} />

                {/*  Fallback path - directs user back to login page */}
                <Route
                  path="*"
                  exact
                  element={
                    <LandingPage
                      submitLoginData={submitLoginData}
                      updateData={updateData}
                      username={username}
                      password={password}
                      currentUser={currentUser}
                    />
                  }
                />
              </Routes>
            </main>
          </div>
        </Router>
      </GameProvider>
    </SocketProvider>
  );
};

export default App;
