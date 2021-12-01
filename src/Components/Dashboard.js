import React, { useState } from "react";
// import { Link } from "react-router-dom";

const Dashboard = (props) => {
    const [editUser, setEditUser] = useState(false);

    const handleEditUser = () => {
        setEditUser((p) => !p)
    }

    const startGame = () => {

    }
    
    return(
        <div className="dashbody">
            <h1>Welcome {props.username}!</h1>

            <button onClick={handleEditUser}>edit Userdate</button>
            {editUser === false ? 
            (<p>Let's play Tic-Tac-Toe</p>) 
            : 
            (
            <div>
                <p>Let's play Tic-Tac-Toe</p>
                <form>
                    <div>
                        <label id="change-password"></label>
                        <input type="text" id="change-password"></input>
                        <button type="submit">confirm</button>
                    </div>
                </form>
            </div>
            )}
            <button onClick={startGame}>Start Game</button>
        </div>
    )
}

export default Dashboard;