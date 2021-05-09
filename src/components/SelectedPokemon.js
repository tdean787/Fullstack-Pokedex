import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Teams from "./Teams";
import Comments from "./Comments";
import Moves from "./Moves";
import StatCharts from "./StatsChart";
import styled from "styled-components";

const StyledPokemon = styled.div`
  font-family: Roboto, sans-serif;
`;

const SelectedPokemon = ({ match }) => {
  let { name } = useParams();
  const [pokeData, setPokeData] = useState();
  const [pokeFlavor, setPokeFlavor] = useState();
  const [showStats, toggleStats] = useState(false);
  const [evolvesFromObj, setEvolvesFrom] = useState();
  const [evolvesToObj, setEvolvesToObj] = useState();

  let evoChain = [];
  let evolutionChainURL;

  //get initial data for selected pokemon
  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then((response) => {
      setPokeData(response.data);
    });
  }, [name]);

  //query for pokemon species and set state flavor text and additional api endpoint for evolve to pokemon
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      .then((response) => {
        setPokeFlavor(response.data.flavor_text_entries[0].flavor_text);
        evolutionChainURL = response.data.evolution_chain.url;
        if (!response.data.evolves_from_species) {
          return;
        } else {
          axios
            .get(
              `https://pokeapi.co/api/v2/pokemon/${response.data.evolves_from_species.name}/`
            )
            .then((res) => setEvolvesFrom(res.data))
            .catch((error) => console.log(error));
        }
      })
      .then(() => {
        axios.get(evolutionChainURL).then((response) => {
          let evoData = response.data.chain;
          do {
            evoChain.push({
              species_name: evoData.species.name,
              min_level: evoData.evolution_details[0]
                ? evoData.evolution_details[0].min_level
                : null,
            });

            evoData = evoData.evolves_to[0];
          } while (!!evoData && evoData.hasOwnProperty("evolves_to"));
          let currentIndex = evoChain.findIndex(
            (element) => element.species_name === name
          );
          if (evoChain[currentIndex + 1]) {
            let pokeName = evoChain[currentIndex + 1].species_name;
            axios
              .get(`https://pokeapi.co/api/v2/pokemon/${pokeName}/`)
              .then((res) => {
                setEvolvesToObj(res.data);
              });
          }
        });
      });
  }, [name]);

  if (pokeData) {
    axios.get(`/pokemon/${name}`).then((response) => console.log(response));
    return (
      <StyledPokemon>
        <div className={`selected ${pokeData.types[0].type.name}`}>
          {/* <button onClick={handleClick}>Home</button> */}
          <h2> {pokeData.name} </h2>
          <p id="flavor-text">{pokeFlavor}</p>
          <div className="evoSprites">
            {evolvesFromObj && (
              <div>
                {evolvesFromObj.name !== pokeData.name && (
                  <Link to={`/pokemon/${evolvesFromObj.name}`}>
                    <div>
                      <img
                        alt={evolvesFromObj.name}
                        src={`${evolvesFromObj.sprites.front_default}`}
                      ></img>
                      <p>{evolvesFromObj.name}</p>
                    </div>
                  </Link>
                )}
              </div>
            )}

            <div>
              <img
                className="sprite"
                alt={`${pokeData.name} sprite`}
                src={pokeData.sprites.front_default}
              ></img>
            </div>

            {evolvesToObj && (
              <div>
                {evolvesToObj.name !== pokeData.name && (
                  <Link to={`/pokemon/${evolvesToObj.name}`}>
                    <div>
                      <img
                        alt={evolvesToObj.name}
                        src={`${evolvesToObj.sprites.front_default}`}
                      ></img>
                      <p>{evolvesToObj.name}</p>
                    </div>
                  </Link>
                )}
              </div>
            )}
          </div>
          <div style={{ textAlign: "left" }}>
            <p>Pokemon Types</p>
            {pokeData.types.map((item) => (
              <p>{item.type.name}</p>
            ))}
          </div>

          {/* moves */}
          <div>
            {/* {console.log(
            pokeData.moves.filter(
              (item) => item.version_group_details.level_learned_at !== 0
            )
          )} */}
            <Moves name={name} />
          </div>
          <StatCharts statsData={pokeData.stats} />
          <Comments pokemonName={name} />
          <Teams pokeName={name} />
        </div>
      </StyledPokemon>
    );
  } else {
    axios.get(`/pokemon/${name}`).then((response) => {
      console.log(response.data);
      console.log(response);
      console.log(name);
    });

    //waiting for pokeData to load
    return <p> loading </p>;
  }
};

export default SelectedPokemon;
