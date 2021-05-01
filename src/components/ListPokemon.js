import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import SelectedPokemon from "../components/SelectedPokemon";

const ListPokemon = ({ individualPokemon }) => {
  const [pokeData, setPokemonData] = useState();
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${individualPokemon}/`)
      .then((response) => {
        setPokemonData(response.data);
      });
  }, [individualPokemon]);

  if (pokeData) {
    let pokemonClass = " tile " + pokeData.types[0].type.name;
    return (
      <Link to={`/${pokeData.name}`}>
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
        </div>
      </Link>
    );
  } else {
    return (
      <div class="lds-spinner">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );
  }
};

export default ListPokemon;
