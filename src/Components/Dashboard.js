import React, { useState } from "react";

const [editUser, setEditUser] = useState(false);

const handleEditUser = () => {
    setEditUser((p) => !p)
}

const Dashboard = (props) => {
    return(
        <div>
            <h1>Welcome {props.username}!</h1>
            <p>Let's play Tic-Tac-Toe</p>

            <button onClick={handleEditUser}>edit Userdate</button>

            <button>Start Game</button>
        </div>
    )
}

export default Dashboard;