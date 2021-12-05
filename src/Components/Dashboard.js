import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// AOS
import Aos from "aos";
import "aos/dist/aos.css";

const Dashboard = (props) => {
  // Edit User hooks
  const [editUser, setEditUser] = useState(false);

  // Edit user functionality
  const handleEditUser = () => {
    setEditUser((p) => !p);
  };

  // AOS functionality
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="dashboard-container">
      <h1
        className="dashboard-header"
        // AOS
        data-aos="fade-right"
      >
        Welcome <span className="dashboard-header-user">{props.username}</span>!
      </h1>

      <button
        className="edit-user-button"
        onClick={handleEditUser} // AOS
        data-aos="fade-left"
      >
        Edit User
      </button>
      {editUser === false ? (
        <p
          className="lets-play-paragraph" // AOS
          data-aos="fade-right"
        >
          Let's play Tic-Tac-Toe!
        </p>
      ) : (
        <div className="lets-play-container">
          <p className="lets-play-paragraph" data-aos="fade-left">
            You want to Change your password?
          </p>
          <form
            className="change-password-form"
            data-aos="fade-right"
            onSubmit={props.changePassword}
          >
            <label id="change-password">Create new Password:</label>
            <input
              type="text"
              id="change-password"
              name="newpassword"
              onChange={props.update}
              // value={props.newPassword}
            ></input>
            <button className="confirm-button">confirm</button>
          </form>
        </div>
      )}

      <Link to="/gamepage" alt="Link to start game.">
        <button
          className="start-game-button"
          // AOS
          data-aos="fade-left"
        >
          Start Game
        </button>
      </Link>
    </div>
  );
};

export default Dashboard;
