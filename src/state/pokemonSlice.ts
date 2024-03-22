import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Pokemon from "../components/Pokemon";

interface PokemonState {
  pokemonOne: Pokemon | undefined;
  pokemonTwo: Pokemon | undefined;
}

const initialState: PokemonState = {
  pokemonOne: undefined,
  pokemonTwo: undefined,
};

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setOne: (state, action: PayloadAction<Pokemon | undefined>) => {
      state.pokemonOne = action.payload;
    },
    setTwo: (state, action: PayloadAction<Pokemon | undefined>) => {
      state.pokemonTwo = action.payload;
    },
  },
});

export const { setOne, setTwo } = pokemonSlice.actions;

export default pokemonSlice.reducer;
