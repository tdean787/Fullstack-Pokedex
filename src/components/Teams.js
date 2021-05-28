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
    if (e.target.value) {
      axios
        .get(`/api/pokemon-teams/${e.target.value}`)
        .then((response) => {
          setDisplayedTeam(response.data);
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    } else {
      setDisplayedTeam("");
    }

    setTeamOption(e.target.value);
  };

  const addFromTeamOption = () => {
    let pokemonObj = {
      pokemonName: pokeName,
      pokemonTeamName: selectedTeamOption,
    };
    if (selectedTeamOption) {
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
    } else {
      alert("You need to select a team from the dropdown for this action");
    }
  };

  const addPokemon = () => {
    if (pokeName) {
      let pokemonObj = {
        pokemonName: pokeName,
        pokemonTeamName: teamName,
      };
      console.log(pokemonObj);
      if (teamName) {
        axios
          .post("/api/pokemon-teams", pokemonObj)
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

  //the two functions below handle checking length of team before adding a new one
  const teamDropdownHandler = (teamNameParam) => {
    let arr;
    axios
      .get(`/api/pokemon-teams/${teamNameParam}`)
      .then((response) => {
        arr = response.data.map((element) => element);
      })
      .then(() => {
        arr.length >= 6
          ? alert("There are too many pokemon on that team")
          : addFromTeamOption();
      });
  };

  const teamInputHandler = (teamNameParam) => {
    let arr;
    axios
      .get(`/api/pokemon-teams/${teamNameParam}`)
      .then((response) => {
        arr = response.data.map((element) => element);
      })
      .then(() => {
        arr.length >= 6
          ? alert("There are too many pokemon on that team")
          : addPokemon();
      });
  };

  useEffect(() => {
    axios.get("/api/pokemon-teams").then((response) => {
      let mappedTeams = response.data.map((element) => element.pokemonTeamName);
      setUniqueTeams([...new Set(mappedTeams)]);
    });
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
          <button onClick={() => teamInputHandler(teamName)}>
            {" "}
            add to team{" "}
          </button>
        </div>
      )}

      <h3>Teams </h3>
      {/* dropdown list of unique teams from database */}
      {uniqueTeams && (
        <div>
          <select onChange={teamChange}>
            <option></option>
            {uniqueTeams.map((pokemon, index) => (
              <option key={index}>{pokemon}</option>
            ))}
          </select>
          {pokeName && (
            <button onClick={() => teamDropdownHandler(selectedTeamOption)}>
              Add to team from dropdown
            </button>
          )}
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
