import React from "react";
import LandingPage from "./Components/LandingPage";
import GamePage from "./Components/GamePage";

import "./Styling/App.scss";

function App() {
  return (
    <div className="app-container">
      <main className="main-container">
        <LandingPage />

        {/* <GamePage /> */}
      </main>
    </div>
  );
}

export default App;
