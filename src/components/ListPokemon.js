import axios from "axios";
import React, { useEffect, useState } from "react";

const ListPokemon = ({ individualPokemon }) => {
  const [height, setHeight] = useState();
  const [pokeData, setPokemonData] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${individualPokemon}/`)
      .then((response) => {
        console.log(response.data);
        setHeight(response.data.height);
        setPokemonData(response.data);
      });
  }, []);

  return (
    <div>
      <h3> {pokeData.name} </h3>
      <img src={pokeData.sprites.front_default}></img>
      <p> Height: {pokeData.height} </p>
    </div>
  );
};

export default ListPokemon;
