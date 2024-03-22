import { openDB } from "idb";
import React, { useEffect } from "react";
import PokeResponse from "./PokeResponse";
import Pokemon, { Species } from "./Pokemon";

const FetchPokemon: React.FC = () => {
  //Fetches one Pokemon from PokeAPI
  function handleClick() {
    const dbPromise = openDB("PokemonDB", 1, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        if (!db.objectStoreNames.contains("pokemon")) {
          const pokemonOS = db.createObjectStore("pokemon", { keyPath: "id" });

          pokemonOS.createIndex("name", "name", { unique: true });
        }
      },
    });

    dbPromise.then(async function (db) {
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon/?limit=1025&offset=0"
        );

        if (!response.ok) {
          throw new Error("Could not fetch data!");
        }

        const pokeResponse: PokeResponse = await response.json();

        for (let i = 0; i < 1025; i++) {
          try {
            const val = await db.get("pokemon", i + 1);

            if (!val) {
              const newResponse = await fetch(pokeResponse.results[i].url);
              const desResponse = await fetch(
                "https://pokeapi.co/api/v2/pokemon-species/" +
                  (i + 1).toString()
              );

              if (!newResponse.ok) {
                throw new Error("Could not fetch data!");
              }

              const pokemon: Pokemon = await newResponse.json();
              const description: Species = await desResponse.json();

              console.log("Added: ", pokemon.name);

              var english = /^[A-Za-z0-9]*$/;

              for (let i = 0; i < description.flavor_text_entries.length; i++) {
                if (
                  english.test(
                    description.flavor_text_entries[i].flavor_text[0]
                  )
                ) {
                  pokemon.description =
                    description.flavor_text_entries[i].flavor_text;
                }
              }

              const tx = db.transaction("pokemon", "readwrite");
              await Promise.all([
                tx.store.put({
                  id: pokemon.id,
                  name: pokemon.name,
                  pokemon: pokemon,
                }),
              ]);
            }
          } catch (error) {
            console.error(error);
          }
        }
      } catch (error) {
        console.error(error);
      }
    });
  }

  useEffect(() => {
    handleClick();
  }, []);

  return <div></div>;
};

export default FetchPokemon;
