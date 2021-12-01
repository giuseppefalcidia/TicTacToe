import React, { useState, useEffect } from "react";

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
          <p className="lets-play-paragraph">Let's play Tic-Tac-Toe!</p>
          <form className="change-password-form">
            <label id="change-password">New Password:</label>
            <input type="text" id="change-password"></input>
            <button className="confirm-button">confirm</button>
          </form>
        </div>
      )}

      <button
        className="start-game-button" // AOS
        data-aos="fade-left"
      >
        Start Game
      </button>
    </div>
  );
};

export default Dashboard;
