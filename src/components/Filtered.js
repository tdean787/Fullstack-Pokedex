import React from "react";
import ListPokemon from "./ListPokemon";

const Filtered = ({ data }) => {
  if (!data) {
    return <div>no filter</div>;
  } else {
    return (
      <div className="grid">
        {data.map((element) => (
          <div>
            <ListPokemon individualPokemon={element.pokemon.name} />
          </div>
        ))}
      </div>
    );
  }
};

export default Filtered;
