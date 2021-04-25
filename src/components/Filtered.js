import axios from "axios";
import React, { useEffect, useState } from "react";
import TypeFilteredPokemon from "../components/TypeFilteredPokemon";

const Filtered = ({ data }) => {
  if (!data) {
    return <div>no filter</div>;
  } else {
    return (
      <div className="grid">
        {data.map((element) => (
          <TypeFilteredPokemon pokemonName={element.pokemon.name} />
        ))}
      </div>
    );
  }
};

export default Filtered;
