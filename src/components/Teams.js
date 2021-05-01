import axios from "axios";
import React, { useEffect, useState } from "react";
import TeamMember from "./TeamMember";

const Teams = () => {
  const [teamName, setTeamNameState] = useState();
  const [uniqueTeams, setUniqueTeams] = useState();
  const [displayedTeam, setDisplayedTeam] = useState();
  const [selectedTeam, setSelectedTeam] = useState([]);

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
  //   const addPokemon = () => {
  //     let pokemonObj = {
  //       pokemonName: pokeData.name,
  //       pokemonTeamName: teamName,
  //     };
  //     axios
  //       .post("/api/pokemon-teams", pokemonObj)
  //       .then(() => setTeamNameState(""))
  //       .catch((error) => console.log(error));
  //   };

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
  }, []);
  return (
    <div>
      <input
        value={teamName}
        onChange={setTeamName}
        placeholder="write team name"
      />
      {/* <button onClick={addPokemon}> add to team </button> */}
      <p>Teams </p>
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
            <div>
              <p>
                {" "}
                <TeamMember
                  pokemonName={element.pokemonName}
                  pokemonTeamName={element.pokemonTeamName}
                  id={element.id}
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
