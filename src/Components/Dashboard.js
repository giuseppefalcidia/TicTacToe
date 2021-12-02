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
            <h1>Welcome {props.currentUser.username}!</h1>

            <button onClick={handleEditUser}>edit Userdate</button>
            {editUser ? 
            (
            <div>
                <p>Let's play Tic-Tac-Toe.</p>
                <form>
                    <div>
                        <label id="change-password" placeholder="Enter a new password"></label>
                        <input type="text" id="change-password" name="newpassword" onChange={props.updateData}></input>
                        <button type="submit" onClick={props.changePassword}>confirm</button>
                    </div>
                </form>
            </div>
            )
            :
            (<p>Let's play Tic-Tac-Toe.</p>)
            }
            <button onClick={startGame}>Start Game</button>
        </div>
      )
}

export default Dashboard;
