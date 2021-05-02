import React from "react";

const Pokemon = (props) => {
  if (props.apiError) {
    console.log(props.apiError);
    return <p> No PokeMon found with that name </p>;
  } else if (props.pokemonData.length === 0) {
    return <p>Search for a PokeMon!</p>;
  } else {
    let backgroundColor = props.pokemonData.types[0].type.name;
    return (
      <div className={backgroundColor + " searchResult tile"}>
        <h3>{props.pokemonData.name}</h3>
        <img
          alt={`${props.pokemonData.name} sprite`}
          src={props.pokemonData.sprites.front_default}
        ></img>

        {/* <h3>Types </h3>
        {props.pokemonData.types.map((element) => (
          <li key={element.id}>{element.type.name}</li>
        ))} */}
      </div>
    );
  }
};

export default Pokemon;
