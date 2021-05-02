import axios from "axios";
import React, { useState } from "react";

const TeamMember = ({
  pokemonName,
  pokemonTeamName,
  id,
  displayedTeam,
  setDisplayedTeam,
}) => {
  const [pokeData, setPokeData] = useState();
  axios
    .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
    .then((response) => setPokeData(response.data));

  const deletePokemon = () => {
    if (window.confirm("Are you sure you want to delete?")) {
      axios
        .delete(`/api/pokemon/${id}`)
        .then((result) => alert("Pokemon deleted successfully"))
        .then(() => {
          axios
            .get(`/api/pokemon-teams/${pokemonTeamName}`)
            .then((response) => {
              setDisplayedTeam(response.data);
              console.log(response.data);
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <div>
      {pokeData && (
        <div className={pokeData.types[0].type.name}>
          <h3>{pokeData.name}</h3>
          {id}
          <img
            alt={`${pokeData.name} sprite`}
            src={pokeData.sprites.front_default}
          ></img>
          <button onClick={deletePokemon}>Delete Pokemon</button>
        </div>
      )}
    </div>
  );
};

export default TeamMember;
