import axios from "axios";
import React, { useEffect, useState } from "react";

const ListPokemon = ({ individualPokemon }) => {
  const [pokeData, setPokemonData] = useState();

  let pokemonClass = "tile " + pokeData.types[0].type.name;

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${individualPokemon}/`)
      .then((response) => {
        console.log(response.data);
        setPokemonData(response.data);
      });
  }, [individualPokemon]);

  if (pokeData) {
    return (
      <div className={pokemonClass}>
        <h3> {pokeData.name} </h3>
        <img
          alt={`${pokeData.name} sprite`}
          src={pokeData.sprites.front_default}
        ></img>

        <h4> Abilities </h4>
        {pokeData.abilities.map((element) => (
          <li> {element.ability.name} </li>
        ))}

        {pokeData.types.length === 1 && <h4> Type </h4>}
        {pokeData.types.length > 1 && <h4> Types </h4>}

        {pokeData.types.map((element) => (
          <li>{element.type.name}</li>
        ))}
        <p> Height: {pokeData.height} </p>
      </div>
    );
  } else {
    return <p>API Loading</p>;
  }
};

export default ListPokemon;
