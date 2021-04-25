import React from "react";
import ListPokemon from "../components/ListPokemon";

const AllPokemon = (props) => {
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
