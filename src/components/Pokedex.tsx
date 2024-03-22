/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import Pokemon from "./Pokemon";
import { openDB } from "idb";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import FetchPokemon from "./FetchPokemon";

import "./Pokemon.css";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Pokedex: React.FC = () => {
  const [allRows, setAllRows] = useState<any>();

  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  //Styling rules for each column
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "image",
      renderCell: (params: any) => (
        <img src={params.value} alt={params.value} width={80} />
      ),
      headerName: "",
      width: 150,
      getApplyQuickFilterFn: undefined,
      disableColumnFilter: true,
      disableColumnReorder: true,
    },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "description",
      headerName: "Description",
      width: 750,
      getApplyQuickFilterFn: undefined,
    },
    { field: "type", headerName: "Type(s)", width: 150 },
    { field: "height", headerName: "Height", width: 150 },
    { field: "weight", headerName: "Weight", width: 150 },
  ];

  //Used to Capitalize the first letter in a name
  const capitalFirstLetter = (temp: string | undefined) => {
    if (temp) {
      return temp?.charAt(0).toUpperCase() + temp?.slice(1);
    }

    return "";
  };

  //Gets all pokemon and adds then to rows list to be added to the table
  async function createPokemon() {
    let rows: any = [];

    //Accesses the database or setups the database on a new machine
    const dbPromise = openDB("PokemonDB", 1, {
      upgrade(db, oldVersion, newVersion, transaction, event) {
        if (!db.objectStoreNames.contains("pokemon")) {
          const pokemonOS = db.createObjectStore("pokemon", { keyPath: "id" });

          pokemonOS.createIndex("name", "name", { unique: true });
        }
      },
    });

    dbPromise.then(async function (db) {
      for (let i = 0; i <= 1025; i++) {
        const val = await db.get("pokemon", i);
        if (val) {
          const pokemon: Pokemon = await val.pokemon;

          if (pokemon) {
            const createdPokemon = {
              id: pokemon.id,
              name: capitalFirstLetter(pokemon.name),
              image: pokemon.sprites.front_default,
              description: pokemon.description,
              //Sets the types
              type: pokemon.types
                .map((type) => capitalFirstLetter(type.type.name))
                .join(" | "),
              //Sets the Height in feet and inches
              height:
                (
                  (Math.round((pokemon?.height / 10) * 39.3701) -
                    (Math.round((pokemon?.height / 10) * 39.3701) % 12)) /
                  12
                ).toString() +
                "' " +
                (Math.round((pokemon?.height / 10) * 39.3701) % 12).toString() +
                '"',
              //Sets the weight in lbs
              weight:
                (Math.round(pokemon?.weight * 2.20462) / 10).toString() +
                " lbs",
            };

            rows.push(createdPokemon);
          }
        }
      }
      setAllRows(rows);
    });
  }

  createPokemon();

  return (
    <div>
      <FetchPokemon />
      {allRows ? (
        <DataGrid
          className="Datagrid"
          columns={columns}
          rows={allRows}
          rowHeight={100}
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          disableDensitySelector
          disableRowSelectionOnClick
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          sx={{ height: "82vh", width: "100vw" }}
        ></DataGrid>
      ) : (
        <>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      )}
    </div>
  );
};

export default Pokedex;
