import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const SelectedPokemon = (props) => {
  let { name } = useParams();
  const [pokeData, setPokeData] = useState();
  const [pokeFlavor, setPokeFlavor] = useState();
  const [showStats, toggleStats] = useState(false);
  const [evolvesFromObj, setEvolvesFrom] = useState();
  const [evolvesToObj, setEvolvesToObj] = useState();

  let evoChain = [];
  let history = useHistory();
  let evolutionChainURL;

  function handleClick() {
    history.push("/");
  }

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
        console.log(response.data);
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

          console.log(evoChain);
          let currentIndex = evoChain.findIndex(
            (element) => element.species_name === name
          );
          console.log(currentIndex);
          if (evoChain[currentIndex + 1]) {
            let pokeName = evoChain[currentIndex + 1].species_name;
            console.log(pokeName);
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
    return (
      <div className={`selected`}>
        <button onClick={handleClick}>Home</button>
        <h2> {pokeData.name} </h2>
        <p id="flavor-text">{pokeFlavor}</p>
        <div className="evoSprites">
          {evolvesFromObj && (
            <div>
              {evolvesFromObj.name !== pokeData.name && (
                <Link to={`/${evolvesFromObj.name}`}>
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
                <Link to={`/${evolvesToObj.name}`}>
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
        <div className="pokeStats">
          <button onClick={() => toggleStats(!showStats)}>
            {showStats === true ? <p>Hide Stats</p> : <p>Show Stats</p>}
          </button>
          {showStats === true && (
            <div>
              {pokeData.stats.map((item) => (
                <li>
                  {" "}
                  {item.stat.name} {item.base_stat}
                </li>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  } else {
    //waiting for pokeData to load
    return <p> loading </p>;
  }
};

export default SelectedPokemon;
