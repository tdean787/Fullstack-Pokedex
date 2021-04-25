import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

const SelectedPokemon = (props) => {
  let { name } = useParams();

  const [pokeData, setPokeData] = useState();
  const [pokeFlavor, setPokeFlavor] = useState();
  const [showStats, toggleStats] = useState(false);
  const [evolvesFrom, setEvolvesFrom] = useState();
  const [evolvesFromData, setEvolvesFromData] = useState();

  let history = useHistory();

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
        if (!response.data.evolves_from_species) {
          console.log("no evo from");
          return;
        } else {
          setEvolvesFrom(response.data.evolves_from_species.name);
        }
      });
  }, [name]);

  useEffect(() => {
    if (evolvesFrom) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${evolvesFrom}/`)
        .then((res) => {
          setEvolvesFromData(res.data);
          console.log(res.data);
        });
    }
  }, [evolvesFrom]);
  //return data once evolution chain is found
  if (pokeData) {
    return (
      <div className={`selected`}>
        <button onClick={handleClick}>Home</button>
        <h2> {pokeData.name} </h2>
        <p id="flavor-text">{pokeFlavor}</p>
        <div className="evoSprites">
          {evolvesFromData && (
            <div>
              <p>Evolves From:</p>
              <img
                alt={evolvesFrom}
                className="evolves-from-sprite"
                src={evolvesFromData.sprites.front_default}
              ></img>
            </div>
          )}

          <img
            className="sprite"
            alt={`${pokeData.name} sprite`}
            src={pokeData.sprites.front_default}
          ></img>
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
