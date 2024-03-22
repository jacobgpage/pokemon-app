import React, { useEffect, useState } from "react";
import Pokemon from "./Pokemon";
import { openDB } from "idb";
import "./Pokemon.css";
import { useDispatch } from "react-redux";
import { setOne, setTwo } from "../state/pokemonSlice";
import { Box } from "@mui/material";

interface Props {
  value: number | string;
  whichPokemon: number;
}

const DisplayPokemon: React.FC<Props> = ({ value, whichPokemon }) => {
  const [pokemon, setPokemon] = useState<Pokemon>();

  const dispatch = useDispatch();

  useEffect(() => {
    //Accesses tje database or setups the database on a new machine
    const dbPromise = openDB("PokemonDB", 1, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        if (!db.objectStoreNames.contains("pokemon")) {
          const pokemonOS = db.createObjectStore("pokemon", { keyPath: "id" });

          pokemonOS.createIndex("name", "name", { unique: true });
        }
      },
    });

    //Gets the current pokemon value whenever the DisplayPokemon is rendered with a different ID
    dbPromise.then(async function (db) {
      setPokemon(undefined);

      if (Number(value)) {
        const val = await db.get("pokemon", Number(value));
        if (val) {
          const pokemon = val.pokemon;
          setPokemon(pokemon);
          if (whichPokemon === 0) {
            dispatch(setOne(pokemon));
          } else {
            dispatch(setTwo(pokemon));
          }
        } else {
          if (whichPokemon === 0) {
            dispatch(setOne(undefined));
          } else {
            dispatch(setTwo(undefined));
          }
        }
      } else {
        const val = await db.getFromIndex(
          "pokemon",
          "name",
          String(value).toLowerCase()
        );
        if (val) {
          const pokemon = val.pokemon;
          setPokemon(pokemon);
          if (whichPokemon === 0) {
            dispatch(setOne(pokemon));
          } else {
            dispatch(setTwo(pokemon));
          }
        } else {
          if (whichPokemon === 0) {
            dispatch(setOne(undefined));
          } else {
            dispatch(setTwo(undefined));
          }
        }
      }
    });
  }, [value, dispatch, whichPokemon]);

  return pokemon ? ( //Table row filled out with the current Pokemon's name, sprite, type{s}, height, and weight
    <div>
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        width={350}
        height={350}
      />
    </div>
  ) : (
    <Box sx={{ textAlign: "center" }}>
      {" "}
      <img
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e30d1851-bf96-4f51-bf93-b401f38dea21/d60rthu-90d46d88-e5af-4587-9dda-2a84901b8740.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2UzMGQxODUxLWJmOTYtNGY1MS1iZjkzLWI0MDFmMzhkZWEyMVwvZDYwcnRodS05MGQ0NmQ4OC1lNWFmLTQ1ODctOWRkYS0yYTg0OTAxYjg3NDAucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.nJrVgFW1qZtxsPUUqJpHM4eM2KiDilQgiyWOYY--MGs"
        alt="Sad Pikachu"
        width={325}
        height={325}
      />
      <h4>Pokemon not found!</h4>
    </Box>
  );
};

export default DisplayPokemon;
