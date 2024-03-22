import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import navBarReducer from "./navBarSlice";

export const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    navBar: navBarReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
