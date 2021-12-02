import React, { useState, useEffect } from "react";
import Aos from "aos";
// import { Link } from "react-router-dom";

const Dashboard = (props) => {
    const [editUser, setEditUser] = useState(false);

    const handleEditUser = () => {
        setEditUser((p) => !p)
    }

    useEffect(() => {
        Aos.init({ duration: 1000, once: true });
      }, []);
    
    return(
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
      )
}

export default Dashboard;
