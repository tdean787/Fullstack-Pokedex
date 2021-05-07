import axios from "axios";
import React, { useEffect, useState } from "react";
import TeamMember from "./TeamMember";

const Teams = ({ pokeName }) => {
  const [teamName, setTeamNameState] = useState();
  const [uniqueTeams, setUniqueTeams] = useState();
  const [displayedTeam, setDisplayedTeam] = useState();
  const [selectedTeamOption, setTeamOption] = useState();

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
    setTeamOption(e.target.value);
  };

  const addFromTeamOption = () => {
    console.log(selectedTeamOption);
    let pokemonObj = {
      pokemonName: pokeName,
      pokemonTeamName: selectedTeamOption,
    };
    axios
      .post("/api/pokemon-teams", pokemonObj)
      .then(() => {
        //this should refresh the teams select dropdown when a new
        //team is added for the first time
        axios
          .get(`/api/pokemon-teams/${selectedTeamOption}`)
          .then((response) => {
            setDisplayedTeam(response.data);
            console.log(response.data);
          });
      })
      .catch((error) => console.log(error));
  };
  const addPokemon = () => {
    if (pokeName) {
      let pokemonObj = {
        pokemonName: pokeName,
        pokemonTeamName: teamName,
      };

      if (teamName && displayedTeam) {
        axios
          .post("/api/pokemon-teams", pokemonObj)
          .then(() => setTeamNameState(""))
          .then(() => {
            //this should refresh the teams select dropdown when a new
            //team is added for the first time
            axios
              .get("/api/pokemon-teams")
              .then((response) => {
                let mappedTeams = response.data.map(
                  (element) => element.pokemonTeamName
                );
                setUniqueTeams([...new Set(mappedTeams)]);
              })
              .then((res) => console.log(uniqueTeams));
          })
          .catch((error) => console.log(error));
      } else if (!teamName) {
        alert("you need to enter a team name");
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      {/* dropdown list of unique teams from database */}
      {uniqueTeams && (
        <div>
          <select onChange={teamChange}>
            <option></option>
            {uniqueTeams.map((pokemon) => (
              <option>{pokemon}</option>
            ))}
          </select>
          <button onClick={addFromTeamOption}>Add to the displayed team</button>
        </div>
      )}

      {/* rendered display of pokemon matching the selected team name */}
      {displayedTeam && (
        <div>
          <h3>{displayedTeam[0].pokemonTeamName}</h3>
          <div class="displayed-team">
            {displayedTeam.map((element) => (
              <div key={element.id}>
                <p>
                  {" "}
                  {/* need to pass down displayedTeam state here
                in order to rerender the displayed pokemon after a 
                successful delete operation */}
                  <TeamMember
                    pokemonName={element.pokemonName}
                    pokemonTeamName={element.pokemonTeamName}
                    id={element.id}
                    key={element.id}
                    displayedTeam={displayedTeam}
                    setDisplayedTeam={setDisplayedTeam}
                  />
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Teams;
