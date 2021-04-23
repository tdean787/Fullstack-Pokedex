import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
} from "react-router-dom";

const SelectedPokemon = () => {
  let { name } = useParams();

  const [pokeData, setPokeData] = useState();
  const [pokeFlavor, setPokeFlavor] = useState();

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${name}/`).then((response) => {
      setPokeData(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon-species/${name}`)
      .then((response) => {
        setPokeFlavor(response.data.flavor_text_entries[0].flavor_text);
      });
  }, []);

  if (pokeData) {
    return (
      <div className="selected">
        <h1> {pokeData.name} </h1>
        <p id="flavor-text">{pokeFlavor}</p>
        <img
          className="sprite"
          alt={`${pokeData.name} sprite`}
          src={pokeData.sprites.front_default}
        ></img>
      </div>
    );
  } else {
    return <p> loading </p>;
  }
};

// return (
//   <div className="selected">
//     <div>
//       <p>the link result</p>
//       <h3> {props.pokeData.name} </h3>
//       <img
//         alt={`${props.pokeData.name} sprite`}
//         src={props.pokeData.sprites.front_default}
//       ></img>

//       <h4> Abilities </h4>
//       {props.pokeData.abilities.map((element) => (
//         <li> {element.ability.name} </li>
//       ))}

//       {props.pokeData.types.length === 1 && <h4> Type </h4>}
//       {props.pokeData.types.length > 1 && <h4> Types </h4>}

//       {props.pokeData.types.map((element) => (
//         <li>{element.type.name}</li>
//       ))}
//       <p> Height: {props.pokeData.height} </p>
//     </div>
//   </div>
// );

export default SelectedPokemon;
