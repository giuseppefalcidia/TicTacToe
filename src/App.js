import React, { useState } from "react";
import LandingPage from "./Components/LandingPage";
import GamePage from "./Components/GamePage";
import SignUp from "./Components/SignUp";
import Dashboard from "./Components/Dashboard";
import { SocketProvider } from "./contexts/SocketProvider";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Routes,
  Link,
  Navigate,
  useNavigate,
  useHistory, 
  Switch
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
  const [newPassword, setNewPassword] = useState("");
  // const history = useHistory();
  // TODO Marc create a useState or similar with the ID to pass to the SocketProvider
  const id = "test";

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
      case "newpassword":
        setNewPassword(event.target.value);
        break;

      default:
        break;
    }
  };

  // ! LOGIN functionality
  // todo - POST and FETCH request for login - connect to database and setup correct path
  // Submit login data function - updated onChange..
  const submitLoginData = (event) => {
    // event.preventDefault();

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
    fetch("http://localhost:3001/login", settings)
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
        console.log("Successful login!");
        // ? Successful tost message
        const loginSuccessful = () => {
          toast("Login successful!! Taking you to the game! 👾  🎲 ", {
            position: "top-center",
            autoClose: 2000,
            draggable: false,
            // onClose: () =>
            //   window.location.replace("http://localhost:3000/dashboard"),
          });
        };

        setCurrentUser(data);
        setUsername("");
        setPassword("");
        // history.push("/dashboard");
        loginSuccessful();
        
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

        console.log(err.message)
        loginFailed();
        // alert(err.message);
        setUsername("");
        setPassword("");
      });
  };
  console.log("!", currentUser)

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
    fetch("http://localhost:3001/user", settings)
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
              onClose: () => window.location.replace("http://localhost:3000/"),
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
        // userId: currentUser._id,
        newPassword: newPassword
      }

      const jsonPasswordData = JSON.stringify(changePassword);
    
      const settings = {
        method: "PATCH",
        body: jsonPasswordData,
        headers: {
          "Content-Type": "application/json"
        }
      }

      fetch(`http://localhost:3001/user/${currentUser._id}`, settings)
      .then(response => {
        if (response.ok) {
          return response.json()
        } else {
          switch(response.status) {
            case 404: 
              return response.json().then((err) => {
                throw new Error(err.message);
              });
            default:
              throw new Error("unknown");
          }
        }
      })
      .then(data => {
        console.log("Updated:", data);
        setNewPassword("");
      })
      .catch(err => {
        alert(err.message);
      })
  };

  return (
    <SocketProvider id={id}>
      <Router>
        <div className="app-container">
          <main className="main-container">
            <Switch>
              {/* <LandingPage /> */}
              <Route exact path="/">
              {currentUser.username.length > 0 ? 
              <Redirect to="/dashboard" /> 
              : <LandingPage
                    submitLoginData={submitLoginData}
                    updateData={updateData}
                    username={username}
                    password={password}
                    currentUser={currentUser}
                />}
              </Route>
              {/* SignUp page */}
              <Route
                path="/signup"
                exact
                render={() =>
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
                render={() =>
                  <Dashboard 
                    username={currentUser.username}
                    changePassword={changePassword}
                    newPassword={newPassword} 
                    update={updateData}
                  />
                }
              />

              {/* Game page */}
              <Route path="/gamepage" exact render={() => <GamePage />} />

              {/*  Fallback path - directs user back to login page */}
              <Route
                path="*"
                exact
                render={() => 
                  <LandingPage
                    submitLoginData={submitLoginData}
                    updateData={updateData}
                    username={username}
                    password={password}
                    currentUser={currentUser}
                  />
                }
              />
            </Switch>
          </main>
        </div>
      </Router>
    </SocketProvider>
  );
};

export default App;
