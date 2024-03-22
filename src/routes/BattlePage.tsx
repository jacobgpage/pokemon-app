import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useForm } from "react-hook-form";
import { Alert, Box, TextField } from "@mui/material";
import DisplayPokemon from "../components/DisplayPokemon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import DisplayWinnner from "../components/DisplayWinnner";
import { set } from "../state/navBarSlice";
import CheckIcon from "@mui/icons-material/Check";

const BattlePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      PokemonOne: "",
      PokemonTwo: "",
      PokemonOneLevel: 100,
      PokemonTwoLevel: 100,
    },
  });

  const [showPokemon, setShowPokemon] = useState<boolean>(false);
  const [pokemonOne, setPokemonOne] = useState<string | number>("");
  const [pokemonTwo, setPokemonTwo] = useState<string | number>("");
  const [pokemonOneLevel, setPokemonOneLevel] = useState<number>(0);
  const [pokemonTwoLevel, setPokemonTwoLevel] = useState<number>(0);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  let dispatch = useDispatch();
  dispatch(set(2));

  const pokemonOneObject = useSelector(
    (state: RootState) => state.pokemon.pokemonOne
  );
  const pokemonTwoObject = useSelector(
    (state: RootState) => state.pokemon.pokemonTwo
  );

  return (
    <div className="Main">
      <Box>
        <h1>Battle Arena</h1>
        <h3 className="SubHeader">
          Enter the names or ID numbers of two Pokemon and let this calculator
          determine who will win of the two in an epic duel!
        </h3>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <form
          onSubmit={handleSubmit((data: any) => {
            setShowPokemon(true);
            setPokemonOne(data.PokemonOne);
            setPokemonTwo(data.PokemonTwo);
            setPokemonOneLevel(data.PokemonOneLevel);
            setPokemonTwoLevel(data.PokemonTwoLevel);
            setShowAlert(true);
          })}
        >
          <TextField
            {...register("PokemonOne", { required: "This is required!" })}
            className="Input-field"
            label="Enter Pokemon 1"
            variant="outlined"
          />
          <TextField
            {...register("PokemonOneLevel", { pattern: /^\d*\.?\d*$/ })}
            label="Enter Level"
            variant="outlined"
          />
          <p className="Error-message">{errors.PokemonOne?.message}</p>
          <p className="Error-message">{errors.PokemonOneLevel?.message}</p>
          <TextField
            {...register("PokemonTwo", { required: "This is required!" })}
            className="Input-field"
            label="Enter Pokemon 2"
            variant="outlined"
          />
          <TextField
            {...register("PokemonTwoLevel", { pattern: /^\d*\.?\d*$/ })}
            label="Enter Level"
            variant="outlined"
          />
          <p className="Error-message">{errors.PokemonTwo?.message}</p>
          <p className="Error-message">{errors.PokemonTwoLevel?.message}</p>
          <Button variant="contained" size="large" type="submit">
            Battle
          </Button>
        </form>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "50px",
        }}
      >
        {showPokemon ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "50px",
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                columnGap: 7,
                borderRadius: 10,
                padding: 5,
              }}
            >
              <DisplayPokemon value={pokemonOne} whichPokemon={0} />
              <DisplayPokemon value={pokemonTwo} whichPokemon={1} />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100vw",
              }}
            >
              <h2>
                <DisplayWinnner
                  pokemonOne={pokemonOneObject}
                  pokemonTwo={pokemonTwoObject}
                  pokemonOneLevel={pokemonOneLevel}
                  pokemonTwoLevel={pokemonTwoLevel}
                />
              </h2>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "right",
                paddingRight: 5,
                position: "relative",
                top: -10,
              }}
            >
              {showAlert ? (
                <Alert
                  icon={<CheckIcon fontSize="inherit" />}
                  severity="success"
                  onClose={() => {
                    setShowAlert(false);
                  }}
                >
                  After a long fight, the Pokemon winner has been determined!
                </Alert>
              ) : (
                <p />
              )}
            </Box>
          </Box>
        ) : (
          <p></p>
        )}
      </Box>
    </div>
  );
};

export default BattlePage;
