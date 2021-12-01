import React from "react";
import LandingPage from "./Components/LandingPage";
import GamePage from "./Components/GamePage";
import Dashboard from "./Components/Dashboard";

import "./Styling/App.scss";

function App() {
  return (
    <div className="app-container">
      <main className="main-container">
        <LandingPage />
        <Dashboard />
        {/* <GamePage /> */}
      </main>
    </div>
  );
}

export default App;
