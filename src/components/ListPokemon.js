import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ListPokemon = ({ individualPokemon }) => {
  const [pokeData, setPokemonData] = useState();
  const [infoClass, setInfoClass] = useState("info-hidden");
  const [toggleInfoText, setInfoText] = useState("Show Info");
  const toggleInfo = () => {
    //check state of class on info container
    //switch from visible to hidden and vice versa on button click
    setInfoClass(infoClass === "info-hidden" ? "info-visible" : "info-hidden");
    setInfoText(toggleInfoText === "Show Info" ? "Hide Info" : "Show Info");
  };
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${individualPokemon}/`)
      .then((response) => {
        setPokemonData(response.data);
      });
  }, [individualPokemon]);

  if (pokeData) {
    let pokemonClass = "shadow-drop-br tile " + pokeData.types[0].type.name;
    return (
      <div className={pokemonClass}>
        <Link key={pokeData.id} to={`/pokemon/${pokeData.name}`}>
          <h3> {pokeData.name} </h3>
          <img
            alt={`${pokeData.name} sprite`}
            src={pokeData.sprites.front_default}
          ></img>
        </Link>

        <button className="btn" onClick={toggleInfo}>
          {toggleInfoText}
        </button>
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
    //spinner loading icon while the list
    //of pokemon is rendering from API calls
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
