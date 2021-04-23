import React from "react";
import ListPokemon from "../components/ListPokemon";

const AllPokemon = (props) => {
  //   const getPokeData = (pokemon) => {
  //     axios
  //       .get("https://pokeapi.co/api/v2/pokemon/" + pokemon)
  //       .then((response) => {
  //         console.log(response.data);
  //       });
  //   };

  return (
    <div className="grid">
      {props.allPokemon &&
        props.allPokemon.results.map((element) => (
          <div>
            <ListPokemon individualPokemon={element.name} />
          </div>
        ))}
    </div>
  );
};

export default AllPokemon;
