import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TypeFilteredPokemon = ({ pokemonName }) => {
  const [pokeData, setPokeData] = useState();

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then((response) => setPokeData(response.data));
  }, [pokemonName]);

  if (pokeData) {
    return (
      <Link to={`/${pokeData.name}`}>
        <div className={`tile ${pokeData.types[0].type.name}`}>
          <h3>{pokeData.name}</h3>
          <img
            alt={`${pokeData.name} sprite`}
            src={pokeData.sprites.front_default}
          ></img>
          <h4> Abilities </h4>
          {pokeData.abilities.map((element) => (
            <li> {element.ability.name} </li>
          ))}
        </div>
      </Link>
    );
  } else {
    return <p> loading </p>;
  }
};

export default TypeFilteredPokemon;
