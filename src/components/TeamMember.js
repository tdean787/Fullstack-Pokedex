import axios from "axios";
import React, { useEffect, useState } from "react";

const TeamMember = ({ pokemonName, pokemonTeamName, id }) => {
  const [pokeData, setPokeData] = useState();
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then((response) => setPokeData(response.data));

  return (
    <div>
      {pokeData && (
        <div className={pokeData.types[0].type.name}>
          <h3>{pokeData.name}</h3>
          <img
            alt={`${pokeData.name} sprite`}
            src={pokeData.sprites.front_default}
          ></img>
        </div>
      )}
    </div>
  );
};

export default TeamMember;
