import React from "react";
import "../Styling/game-page.scss";
// import "./GamePageMainFunc.js";

const GamePage = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Tic Tac Toe</title>
      <link rel="stylesheet" href="css/style.css" />
      <div id="container">
        {/* Starting Page */}
        <div id="startingPage">
          <h2>Tic Tac Toe</h2>
          <div id="line" />
          <h4>Select Which You Want To Be?</h4>
          <div id="button">
            <button id="playerX" className="choose">
              Player ( X )
            </button>
            <button id="playerO" className="choose">
              Player ( O )
            </button>
          </div>
        </div>
        {/* Main Page */}
        <div id="mainPage">
          <div id="headerBtns">
            <button id>X Turn</button>
            <button id="O_Turn">O Turn</button>
            <div id="showChange" />
          </div>
          <div id="gameBoard">
            <div className="boxes" />
            <div className="boxes" />
            <div className="boxes" />
            <div className="boxes" />
            <div className="boxes" />
            <div className="boxes" />
            <div className="boxes" />
            <div className="boxes" />
            <div className="boxes" />
          </div>
        </div>
        {/* WInner Page */}
        <div id="winner">
          <h2 id="winnerName">Player X Win The Game!</h2>
          <div id="button">
            <button id="quit">Play Again</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
