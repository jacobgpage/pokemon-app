import React from "react";
import Pokemon from "./Pokemon";

interface Props {
  pokemonOne: any;
  pokemonTwo: any;
  pokemonOneLevel: number;
  pokemonTwoLevel: number;
}

const DisplayWinnner: React.FC<Props> = ({
  pokemonOne,
  pokemonTwo,
  pokemonOneLevel,
  pokemonTwoLevel,
}) => {
  const pokemonTypes = [
    "normal",
    "fire",
    "water",
    "electric",
    "grass",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  const weaknessChart = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 0, 1, 1, 0.5, 1], // Normal
    [1, 0.5, 0.5, 1, 2, 2, 1, 1, 1, 1, 1, 2, 0.5, 1, 0.5, 1, 2, 1], // Fire
    [1, 2, 0.5, 1, 0.5, 1, 1, 1, 2, 1, 1, 1, 2, 1, 0.5, 1, 1, 1], // Water
    [1, 1, 2, 0.5, 0.5, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0.5, 1, 1, 1], // Electric
    [1, 0.5, 2, 1, 0.5, 1, 1, 0.5, 2, 0.5, 1, 0.5, 2, 1, 0.5, 1, 1, 1], // Grass
    [1, 0.5, 0.5, 1, 2, 0.5, 1, 1, 2, 2, 1, 1, 1, 1, 2, 1, 1, 1], // Ice
    [2, 1, 1, 1, 1, 2, 1, 0.5, 1, 0.5, 0.5, 0.5, 2, 0, 1, 2, 2, 0.5], // Fighting
    [1, 1, 1, 1, 2, 1, 1, 0.5, 0.5, 1, 1, 1, 0.5, 0.5, 1, 1, 1, 2], // Poison
    [1, 2, 1, 2, 0.5, 1, 1, 2, 1, 0, 1, 0.5, 2, 1, 1, 1, 1, 1], // Ground
    [1, 1, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 2, 0.5, 1, 1, 1, 1, 1], // Flying
    [1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 0.5, 1, 1, 1, 1, 0, 1, 1], // Psychic
    [1, 0.5, 1, 1, 2, 1, 0.5, 0.5, 1, 0.5, 2, 1, 1, 0.5, 1, 2, 1, 1], // Bug
    [1, 2, 1, 1, 1, 2, 0.5, 1, 0.5, 2, 1, 2, 1, 1, 1, 1, 1, 1], // Rock
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 1, 1], // Ghost
    [1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 0.5, 1, 0], // Dragon
    [1, 1, 1, 1, 1, 1, 0.5, 1, 1, 1, 2, 1, 1, 2, 1, 0.5, 0.5, 1], // Dark
    [1, 0.5, 0.5, 0.5, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0.5, 2], // Steel
    [1, 0.5, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1], // Fairy
  ];

  function effectivenessScore(
    attackerTypes: string[],
    defenderTypes: string[]
  ) {
    let effectiveness = 1;

    // Loop through each attacker type
    attackerTypes.forEach((attackerType) => {
      // Loop through each defender type
      defenderTypes.forEach((defenderType) => {
        // Get the index of attacker and defender types
        const attackerIndex = pokemonTypes.indexOf(attackerType);
        const defenderIndex = pokemonTypes.indexOf(defenderType);

        // Check if types are valid
        if (attackerIndex === -1 || defenderIndex === -1) {
          console.error("Invalid Pokémon types");
          return null;
        }

        // Look up effectiveness score from the chart and multiply
        effectiveness *= weaknessChart[attackerIndex][defenderIndex];
      });
    });

    return effectiveness;
  }

  const capitalFirstLetter = (temp: string | undefined) => {
    if (temp) {
      return temp?.charAt(0).toUpperCase() + temp?.slice(1);
    }

    return "";
  };

  const CalculateWinner = (): string => {
    if (pokemonOne && pokemonTwo) {
      let pokemonOneTypes: string[] = [];

      for (let i = 0; i < (pokemonOne as Pokemon).types.length; i++) {
        pokemonOneTypes.push((pokemonOne as Pokemon).types[i].type.name);
      }

      let pokemonTwoTypes: string[] = [];

      for (let i = 0; i < (pokemonTwo as Pokemon).types.length; i++) {
        pokemonTwoTypes.push((pokemonTwo as Pokemon).types[i].type.name);
      }

      let pokemonOneEffectiveness = effectivenessScore(
        pokemonOneTypes,
        pokemonTwoTypes
      );
      console.log("Pokemon One: ", pokemonOneEffectiveness);

      let pokemonTwoEffectiveness = effectivenessScore(
        pokemonTwoTypes,
        pokemonOneTypes
      );
      console.log("Pokemon Two: ", pokemonTwoEffectiveness);

      if (
        pokemonOne?.height *
          pokemonOne?.weight *
          pokemonOneEffectiveness *
          pokemonOneLevel >
        pokemonTwo?.height *
          pokemonTwo?.weight *
          pokemonTwoEffectiveness *
          pokemonTwoLevel
      ) {
        console.log(pokemonOne.name, " is the winner!");
        return capitalFirstLetter(pokemonOne.name) + " is the winner!";
      } else if (
        pokemonOne?.height *
          pokemonOne?.weight *
          pokemonOneEffectiveness *
          pokemonOneLevel <
        pokemonTwo?.height *
          pokemonTwo?.weight *
          pokemonTwoEffectiveness *
          pokemonTwoLevel
      ) {
        console.log(pokemonTwo.name, " is the winner!");
        return capitalFirstLetter(pokemonTwo.name) + " is the winner!";
      } else {
        console.log("Both Pokemon tie!");
        return "Tie!";
      }
    } else {
      console.error("One or both Pokemon are currently not define!");
    }
    return "";
  };

  return <div>{CalculateWinner()}</div>;
};

export default DisplayWinnner;
