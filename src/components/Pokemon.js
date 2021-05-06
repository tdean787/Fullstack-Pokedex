import React from "react";
import { Link } from "react-router-dom";
import SelectedPokemon from "./SelectedPokemon";

const Pokemon = (props) => {
  if (props.apiError) {
    console.log(props.apiError);
    return (
      <div style={{ textAlign: "center" }}>
        <h3> No PokeMon with that name found :(</h3>
      </div>
    );
  } else if (props.pokemonData.length === 0) {
    return null;
  } else {
    let backgroundColor = props.pokemonData.types[0].type.name;
    return (
      <Link to={`/pokemon/${props.pokemonData.name}`}>
        <div className={backgroundColor + " searchResult tile"}>
          <h3>{props.pokemonData.name}</h3>
          <img
            alt={`${props.pokemonData.name} sprite`}
            src={props.pokemonData.sprites.front_default}
          ></img>
        </div>
      </Link>
    );
  }
};

export default Pokemon;
