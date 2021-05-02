import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import SelectedPokemon from "../components/SelectedPokemon";

const ListPokemon = ({ individualPokemon }) => {
  const [pokeData, setPokemonData] = useState();
  const [infoClass, setInfoClass] = useState("info-hidden");
  const toggleInfo = () => {
    setInfoClass(infoClass === "info-hidden" ? "info-visible" : "info-hidden");
  };
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
      <div className={pokemonClass}>
        <Link key={pokeData.id} to={`/${pokeData.name}`}>
          <h3> {pokeData.name} </h3>
          <img
            alt={`${pokeData.name} sprite`}
            src={pokeData.sprites.front_default}
          ></img>
        </Link>

        <button onClick={toggleInfo}>Show Info</button>
        <div className={infoClass}>
          <h4> Abilities </h4>
          {pokeData.abilities.map((element) => (
            <li> {element.ability.name} </li>
          ))}
          {pokeData.types.length === 1 && <h4> Type </h4>}
          {pokeData.types.length > 1 && <h4> Types </h4>}
          {pokeData.types.map((element) => (
            <li key={element.type.name}>{element.type.name}</li>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="lds-spinner">
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
