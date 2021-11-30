import React from "react";
import LandingPage from "./Components/LandingPage";
import GamePage from "./Components/GamePage";

import "./Styling/App.scss";

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-heading">Tic Tac Toe</h1>
      </header>
      <main className="main-container">
        <LandingPage />

        {/* // !!! Conditional rendering to come.. so GamePage will only open once loged in - can still be styled and elements added :)  */}

        <GamePage />
      </main>
    </div>
  );
}

export default App;
