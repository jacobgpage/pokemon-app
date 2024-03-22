import React from "react";
import Pokedex from "../components/Pokedex";
import { useDispatch } from "react-redux";
import { set } from "../state/navBarSlice";

const PokedexPage = () => {
  let dispatch = useDispatch();
  dispatch(set(1));
  return <Pokedex />;
};

export default PokedexPage;
