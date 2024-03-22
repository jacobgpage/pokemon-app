import React from "react";
import { Tab, Tabs } from "@mui/material";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import CatchingPokemonIcon from "@mui/icons-material/CatchingPokemon";
import HomeIcon from "@mui/icons-material/Home";
import SportsKabaddiIcon from "@mui/icons-material/SportsKabaddi";

import "./App.css";
import { useSelector } from "react-redux";
import { RootState } from "../state/store";

function App() {
  let currentValue = useSelector((state: RootState) => state.navBar.value);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { hash, pathname, search } = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Generic Pokemon Website</h1>
      </header>
      <div className="Nav-bar">
        <Tabs
          value={currentValue}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          centered
        >
          <Tab
            className="Nav-tab"
            label="Home"
            icon={<HomeIcon />}
            iconPosition="start"
            href="home"
          />
          <Tab
            className="Nav-tab"
            label="Pokedex"
            icon={<CatchingPokemonIcon />}
            iconPosition="start"
            href="pokedex"
          />
          <Tab
            className="Nav-tab"
            label="Battle"
            icon={<SportsKabaddiIcon />}
            iconPosition="start"
            href="/battle"
          />
        </Tabs>
      </div>
      <Outlet />

      {pathname === "/" ? <Navigate to="/home" replace={true} /> : <p></p>}
    </div>
  );
}

export default App;
