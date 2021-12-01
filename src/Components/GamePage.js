import React, {useState } from "react";
// import "../Styling/game-page.scss";

const GamePage = () => {
  const [winnerName,setWinnerName] = useState("")
  const [changeTurn,setChangeTurn] = useState(null)
  const [showChange,setShowChange] = useState(null)
  const [startingPage,setStartingPage] = useState(true)
  const [mainPage,setMainPage] = useState(true)
  const [winnerPage, setWinnerPage] = useState(false)


const handleChoose = () => {
  if (e.currentTarget.id === "playerX") {
    setChangeTurn(false);
    setShowChange()
    showChange(true);
  } else {
    setChangeTurn(true);
    setShowChange(false);
  }
  setStartingPage(false)
  setMainPage(true)
}

const handleBoxClick = (event) => {
  if (changeTurn === false) {
    e.currentTarget.innerHTML = `<i class="fas fa-times"></i>`;
    e.currentTarget.id = "X";
    e.currentTarget.style.pointerEvents = "none";
    setShowChange(true) 
    setChangeTurn(true)
  } else {
    e.currentTarget.innerHTML = `<i class="fas fa-circle-notch"></i>`;
    e.currentTarget.id = "O";
    e.currentTarget.pointerEvents = "none";
    setShowChange(false)

    setChangeTurn(false);
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

      serWinnerName(`Player X Win The Game!`);


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
        <div id="startingPage" style={ startingPage ? display="block" : display="none" }>
          <h2>Tic Tac Toe</h2>
          <div id="line" />
          <h4>Select Which You Want To Be?</h4>
          <div id="button">
            <button id="playerX" className="choose" onClick={handleChoose()}>
              Player ( X )
            </button>
            <button id="playerO" className="choose" onClick={handleChoose()}>
              Player ( O )
            </button>
          </div>
        </div>
        {/* Main Page */}
        <div id="mainPage" style={ mainPage ? display="block" : display="none"}>
          <div id="headerBtns">
            <button id>X Turn</button>
            <button id="O_Turn">O Turn</button>
            <div id="showChange" style={ showChange ? left = `0px` : `left = 160px`  }/>
          </div>
          <div id="gameBoard">
            <div className="boxes" onClick={handleBoxClick}/>
            <div className="boxes" onClick={handleBoxClick}/>
            <div className="boxes" onClick={handleBoxClick}/>
            <div className="boxes" onClick={handleBoxClick}/>
            <div className="boxes" onClick={handleBoxClick}/>
            <div className="boxes" onClick={handleBoxClick}/>
            <div className="boxes" onClick={handleBoxClick}/>
            <div className="boxes" onClick={handleBoxClick}/>
            <div className="boxes" onClick={handleBoxClick}/>
          </div>
        </div>
        {/* WInner Page */}
        <div id="winner">
          <h2 id="winnerName">Player X Win The Game!</h2>
          <div id="button">
            <button onClick={handleQuit()} id="quit">Play Again</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
