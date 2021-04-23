import axios from "axios";
import React from "react";
import ListPokemon from "../components/ListPokemon";

const AllPokemon = (props) => {
  const getPokeData = (pokemon) => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/" + pokemon)
      .then((response) => {
        console.log(response.data);
      });
  };

  return (
    <div>
      <p>
        {props.allPokemon &&
          props.allPokemon.results.map((element, index) => (
            <div>
              <ListPokemon individualPokemon={element.name} />
            </div>
          ))}
      </p>
    </div>
  );
};

export default AllPokemon;
