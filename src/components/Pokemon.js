import axios from "axios";
import { useState } from "react";
import React from "react";

const Pokemon = ({ pokemonData }) => {
  if (pokemonData.length === 0) {
    return <p>Search for a PokeMon!</p>;
  } else {
    return (
      <div>
        <p>{pokemonData.name}</p>
        <img src={pokemonData.sprites.front_default}></img>

        <h3>Types </h3>
        {pokemonData.types.map((element) => (
          <li>{element.type.name}</li>
        ))}
      </div>
    );
  }
};

export default Pokemon;
