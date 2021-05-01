import axios from "axios";
import React, { useEffect, useState } from "react";

const TeamMember = ({ pokemonName, pokemonTeamName, id }) => {
  const [pokeData, setPokeData] = useState();
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then((response) => setPokeData(response.data));

  return (
    <div>
      <p>individual</p>

      {pokeData && (
        <div>
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
