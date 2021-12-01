import React, { useState, useEffect, useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleNotch, faTimes  } from '@fortawesome/free-solid-svg-icons'

import { useSocket } from "../contexts/SocketProvider";

import "../Styling/game-page.scss";

const GamePage = () => {
  const [winnerName,setWinnerName] = useState("")
  const [changeTurn,setChangeTurn] = useState(null)
  const [showChange,setShowChange] = useState(null)
  const [startingPage,setStartingPage] = useState(true)
  const [mainPage,setMainPage] = useState(true)
  const [winnerPage, setWinnerPage] = useState(false)
  const [isCircle,setIsCircle] = useState(null) //! null after test
  const socket = useSocket()
  const [position,setPosition] = useState()

  const recievePosition = useCallback(({position}) => {
    setPosition(position)
  }, [setPosition])

  useEffect(() => {
    if (socket == null) return

    socket.on('receive-position', recievePosition)

    return () => socket.off('receive-message')
  }, [socket, recievePosition])

  const circle = <FontAwesomeIcon icon={faCircleNotch} />
  const ex = <FontAwesomeIcon icon={faTimes} />
  // TODO
  let boxes = document.querySelectorAll(".boxes");


const handleChoose = (event) => {
  if (event.currentTarget.id === "playerX") {
    setChangeTurn(false);
    setShowChange(true);
  } else {
    setChangeTurn(true);
    setShowChange(false);
  }
  setStartingPage(false)
  setMainPage(true)
}

const handleBoxClick = (event) => {
  console.log(event)
  const element = <FontAwesomeIcon icon={faCircleNotch} />
  if (changeTurn === false) {
    console.log(ex)
    // event.currentTarget.innerHTML = ;
    event.currentTarget.id = "X";
    event.currentTarget.style.pointerEvents = "none";
    setShowChange(true) 
    setChangeTurn(true)
    setIsCircle(false)
  } else {
    // event.currentTarget.innerHTML = circle;
    event.currentTarget.id = "O";
    event.currentTarget.pointerEvents = "none";
    setShowChange(false)
    setChangeTurn(false)
    setIsCircle(true)
  }
  winningFunc();
  drawFunc();
}

// All Possible Winning Combinations
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let winningFunc = () => {
  for (let a = 0; a <= 7; a++) {
    let b = winningCombinations[a];

    if (
      boxes[b[0]].id === "" ||
      boxes[b[1]].id === "" ||
      boxes[b[2]].id === ""
    ) {
      continue;
    } else if (
      boxes[b[0]].id === "X" &&
      boxes[b[1]].id === "X" &&
      boxes[b[2]].id === "X"
    ) {

      setWinnerName(`Player X Win The Game!`);


      setMainPage(false)
      setWinnerPage(true) 
    } else if (
      boxes[b[0]].id === "O" &&
      boxes[b[1]].id === "O" &&
      boxes[b[2]].id === "O"
    ) {
  
      setWinnerName(`Player O Win The Game!`);


      setMainPage(false)
      setWinnerPage(true) 
    } else {
      continue;
    }
  }
};

// Match Draw Function
let drawFunc = () => {
  if (
    boxes[0].id !== "" &&
    boxes[1].id !== "" &&
    boxes[2].id !== "" &&
    boxes[3].id !== "" &&
    boxes[4].id !== "" &&
    boxes[5].id !== "" &&
    boxes[6].id !== "" &&
    boxes[7].id !== "" &&
    boxes[8].id !== ""
  ) {
    setWinnerName(`Match Draw!`);

    setMainPage(false)
    setWinnerPage(true) 
  }
};

// Reset Game
const handleQuit = () => {
  // TODO 
}


  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tic Tac Toe</title>
      <link rel="stylesheet" href="css/style.css" />
      <div id="container">
        {/* Starting Page */}
        <div id="startingPage" style={ startingPage ? {display: "block"} : {display: "none"} }> 
        <h2>Tic Tac Toe</h2>
          <div id="line" />
          <h4>Select Which You Want To Be?</h4>
          <div id="button">
            <button id="playerX" className="choose" onClick={event => handleChoose(event)}>
              Player ( X )
            </button>
            <button id="playerO" className="choose" onClick={event => handleChoose(event)}>
              Player ( O )
            </button>
          </div>
        </div>
        {/* Main Page */}
        <div id="mainPage" style={ mainPage ? {display: "block"} : {display: "none"}}>
          <div id="headerBtns">
            <button id>X Turn</button>
            <button id="O_Turn">O Turn</button>
            <div id="showChange" style={ showChange ? {left: "0px"} : {left: "160px"}  }/>
          </div>
          <div id="gameBoard">
            <div className="boxes" data-boxPosition="1" onClick={event => handleBoxClick(event)}></div>
            <div className="boxes" data-boxPosition="2" onClick={event => handleBoxClick(event)}></div>
            <div className="boxes" data-boxPosition="3" onClick={event => handleBoxClick(event)}></div>
            <div className="boxes" data-boxPosition="4" onClick={event => handleBoxClick(event)}></div>
            <div className="boxes" data-boxPosition="5" onClick={event => handleBoxClick(event)}></div>
            <div className="boxes" data-boxPosition="6" onClick={event => handleBoxClick(event)}></div>
            <div className="boxes" data-boxPosition="7" onClick={event => handleBoxClick(event)}></div>
            <div className="boxes" data-boxPosition="8" onClick={event => handleBoxClick(event)}></div>
            <div className="boxes" data-boxPosition="9" onClick={event => handleBoxClick(event)}></div>
          </div>
        </div>
        {/* Winner Page */}
        <div id="winner" style={ winnerPage ? {display: "block"} : {display: "none"}}>
          <h2 id="winnerName">{winnerName}</h2>
          <div id="button">
            <button onClick={handleQuit()} id="quit">Play Again</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
