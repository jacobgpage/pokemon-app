import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "lightgray",
      }}
    >
      <Box
        sx={{
          backgroundImage:
            "url('https://www.cardacademy.co.uk/wp-content/uploads/2021/02/header-2.png')",
          backgroundSize: "length",
          backgroundPosition: "center",
          resize: "both",
          width: "100%",
          height: "125px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></Box>
      <Box
        sx={{
          backgroundColor: "gray",
          width: "50vw",
          display: "flex",
          justifyContent: "center",
          minWidth: "500px",
          borderRadius: "5px",
          height: "60px",
          position: "relative",
          bottom: "12px",
        }}
      >
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
            href="#/home"
          />
          <Tab
            className="Nav-tab"
            label="Pokédex"
            icon={<CatchingPokemonIcon />}
            iconPosition="start"
            href="#/pokedex"
          />
          <Tab
            className="Nav-tab"
            label="Battle"
            icon={<SportsKabaddiIcon />}
            iconPosition="start"
            href="#/battle"
          />
        </Tabs>
      </Box>
      <Box
        sx={{
          backgroundColor: "white",
          width: "95vw",
          borderRadius: "10px",
          marginBottom: "100px",
        }}
      >
        <Outlet />
      </Box>

      {pathname === "#/" || pathname === "/" ? (
        <Navigate to="/home" replace={true} />
      ) : undefined}
    </Box>
  );
}

export default App;
