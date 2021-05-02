import axios from "axios";
import React, { useEffect, useState } from "react";
import TeamMember from "./TeamMember";

const Teams = ({ pokeName }) => {
  const [teamName, setTeamNameState] = useState();
  const [uniqueTeams, setUniqueTeams] = useState();
  const [displayedTeam, setDisplayedTeam] = useState();

  const setTeamName = (event) => {
    setTeamNameState(event.target.value);
  };

  const teamChange = (e) => {
    axios
      .get(`/api/pokemon-teams/${e.target.value}`)
      .then((response) => {
        setDisplayedTeam(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };
  const addPokemon = () => {
    if (pokeName) {
      let pokemonObj = {
        pokemonName: pokeName,
        pokemonTeamName: teamName,
      };

      axios
        .post("/api/pokemon-teams", pokemonObj)
        .then(() => setTeamNameState(""))
        .catch((error) => console.log(error));
    } else {
      console.log("error adding");
    }
  };

  useEffect(() => {
    axios
      .get("/api/pokemon-teams")
      .then((response) => {
        let mappedTeams = response.data.map(
          (element) => element.pokemonTeamName
        );
        setUniqueTeams([...new Set(mappedTeams)]);
      })
      .then((res) => console.log(uniqueTeams));
  }, [displayedTeam]);
  return (
    <div className="teams">
      {pokeName && (
        <div>
          <input
            value={teamName}
            onChange={setTeamName}
            placeholder="write team name"
          />
          <button onClick={addPokemon}> add to team </button>
        </div>
      )}

      <h3>Teams </h3>
      {uniqueTeams && (
        <div>
          <select onChange={teamChange}>
            {uniqueTeams.map((pokemon) => (
              <option>{pokemon}</option>
            ))}
          </select>
        </div>
      )}

      {displayedTeam && (
        <div>
          {displayedTeam.map((element) => (
            <div key={element.id}>
              <p>
                {" "}
                <TeamMember
                  pokemonName={element.pokemonName}
                  pokemonTeamName={element.pokemonTeamName}
                  id={element.id}
                  key={element.id}
                />
                {element.pokemonName} - {element.pokemonTeamName} - {element.id}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Teams;
