import React, { useState, useEffect, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch, faTimes } from "@fortawesome/free-solid-svg-icons";

// import { useSocket } from "../contexts/SocketProvider";
import { useGame } from "../contexts/GameProvider";
import useLocalStorage from "../hooks/useLocalStorage";

import "../Styling/game-page.scss";

// AOS
import Aos from "aos";
import "aos/dist/aos.css";

const GamePage = () => {
  const [winnerName,setWinnerName] = useState("")
  // const [changeTurn,setChangeTurn] = useState(true)
  const [showChange,setShowChange] = useState(null)
  const [startingPage,setStartingPage] = useState(false)
  const [mainPage,setMainPage] = useState(true)
  const [winnerPage, setWinnerPage] = useState(false)
  // const socket = useSocket()
  
  
  // const [position,setPosition] = useState(["","","","","","","","",""])
  // const [position,setPosition] = useLocalStorage("position",["","","","","","","","",""])
  const {sendPosition,position} = useGame()  

  
  const [player,setPlayer] = useLocalStorage("player")

  // console.log(socket.id)

  // AOS functionality
  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
  }, []);

  // Added to Game provider
  // const recievePosition = useCallback(
  //   ({ position }) => {
  //     setPosition(position);
  //   },
  //   [setPosition]
  // );

  // useEffect(() => {
  //   if (socket == null) return;

  //   socket.on("receive-position", recievePosition);

  //   return () => socket.off("receive-message");
  // }, [socket, recievePosition]);

  const circle = (
    <FontAwesomeIcon className="circle-element" icon={faCircleNotch} />
  );
  const ex = <FontAwesomeIcon className="ex-element" icon={faTimes} />;

  // TODO Check if with the refactor this ref is needed
  const boxesRef = useRef();

  // useLocal for development purposes //! delete afterwards
  // useEffect(()=>{
  //   const localPosition = localStorage.getItem("tictactoe-player")
  //   setPosition(localPosition)
  //   if (localStorage.getItem("tictactoe-player") === "undefined") {
  //     setMainPage(false)
  //     setStartingPage(true)
  //   }
  // },[setPosition])
  
  
  const handleChoose = (event) => {
      if (event.currentTarget.id === "playerX") {
        // setChangeTurn(false);
        setShowChange(true);
        setPlayer("X")
      } else {
        // setChangeTurn(true);
        setShowChange(false);
        setPlayer("O")
      }
    setStartingPage(false)
    setMainPage(true)
  }

  // useEffect(()=>{
  //   setPosition(position)
  // },[position,setPosition])
  
  const handleBoxClick = (event) => {
    if (player === "X") {
      const index = event.target.getAttribute("data-boxPosition")
      sendPosition(index,player)
      // position[index] = "X"
      // setPosition(position)
      event.currentTarget.id = "X";
      event.currentTarget.style.pointerEvents = "none";
      setShowChange(false) 
      // setChangeTurn(true)
      if (checkWin(player)){
        setWinnerName(`Player X Win The Game!`);
        setMainPage(false);
        setWinnerPage(true);
        return
      }
      setPlayer("O")
    } else {
      const index = event.target.getAttribute("data-boxPosition")
      sendPosition(index,player)
      // position[index] = "O"
      // setPosition(position)
      event.currentTarget.id = "O";
      event.currentTarget.pointerEvents = "none";
      setShowChange(true)
      // setChangeTurn(false)
      if (checkWin(player)){
        setWinnerName(`Player O Win The Game!`);
        setMainPage(false);
        setWinnerPage(true);
        return
      }
      setPlayer("X")
    }
    if (isDraw()) {
      setWinnerName(`Match Draw!`);
      setMainPage(false);
      setWinnerPage(true);
    }
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

  
  function checkWin(currentPlayer) {
    return winningCombinations.some(combination => {
        // console.log(combination)
      return combination.every(index => {
          // console.log("every",position[index])
          if (currentPlayer === position[index]) {
            return true 
          } else {
              return false
          }
      })
  })}
  
  
  function isDraw() {
      return [...position].every(cell => {
        return cell.includes("X") || cell.includes("O")
      })
    }

  const refresh = () => {
    window.location.reload();
  };

  return (
    <>
      <title>Tic Tac Toe</title>
      <div id="container">
        {/* Starting Page */}
        <div
          id="startingPage"
          // AOS
          data-aos="fade-down"
          style={startingPage ? { display: "block" } : { display: "none" }}
        >
          <h2>Tic Tac Toe</h2>

          <div id="line" />
          <h4>Select Which You Want To Be?</h4>
          <div id="button">
            <button
              id="playerX"
              className="choose"
              onClick={(event) => handleChoose(event)}
            >
              Player ( X )
            </button>
            <button
              id="playerO"
              className="choose"
              onClick={(event) => handleChoose(event)}
            >
              Player ( O )
            </button>
          </div>
        </div>
        {/* Main Page */}
        <div
          id="mainPage"
          style={mainPage ? { display: "block" } : { display: "none" }}
        >
          <div id="headerBtns">
            <button id>X Turn</button>
            <button id="O_Turn">O Turn</button>
            <div
              id="showChange"
              style={showChange ? { left: "0px" } : { left: "160px" }}
            />
          </div>
          <div id="gameBoard" ref={boxesRef}>
            {console.log(position)}
            {/* TODO try to refactor
            {position && position.map((box,index) => {
                return (<div
              className="boxes"
              data-boxPosition={index}
              onClick={(event) => handleBoxClick(event)}
            >
              {box[index] !== "" ? (box[index] === "X" ? ex : circle) : null}
            </div>
             )
            })} */}
            {position && 
             <>
             <div
              className="boxes"
              data-boxPosition="0"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[0] !== "" ? (position[0] === "X" ? ex : circle) : null}
            </div>
            <div
              className="boxes"
              data-boxPosition="1"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[1] !== "" ? (position[1] === "X" ? ex : circle) : null}
            </div>
            <div
              className="boxes"
              data-boxPosition="2"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[2] !== "" ? (position[2] === "X" ? ex : circle) : null}
            </div>
            <div
              className="boxes"
              data-boxPosition="3"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[3] !== "" ? (position[3] === "X" ? ex : circle) : null}
            </div>
            <div
              className="boxes"
              data-boxPosition="4"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[4] !== "" ? (position[4] === "X" ? ex : circle) : null}
            </div>
            <div
              className="boxes"
              data-boxPosition="5"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[5] !== "" ? (position[5] === "X" ? ex : circle) : null}
            </div>
            <div
              className="boxes"
              data-boxPosition="6"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[6] !== "" ? (position[6] === "X" ? ex : circle) : null}
            </div>
            <div
              className="boxes"
              data-boxPosition="7"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[7] !== "" ? (position[7] === "X" ? ex : circle) : null}
            </div>
            <div
              className="boxes"
              data-boxPosition="8"
              onClick={(event) => handleBoxClick(event)}
            >
              {position[8] !== "" ? (position[8] === "X" ? ex : circle) : null}
            </div> 
            </>
            }
          </div>
        </div>
        {/* Winner Page */}
        <div
          id="winner"
          // !!! Display FLEX  on #winner to allow responsive styling
          style={winnerPage ? { display: "flex" } : { display: "none" }}
        >
          <h2 id="winnerName">{winnerName}</h2>
          {/* // !!! Added play-again-button class to keep style */}
          <div className="play-again-button">
            <button className="play-again-button" onClick={refresh}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePage;
