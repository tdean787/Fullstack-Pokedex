import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListPokemon from "./ListPokemon";

const TypeFilteredPokemon = ({ pokemonName }) => {
  const [pokeData, setPokeData] = useState();
  const [infoClass, setInfoClass] = useState("info-hidden");
  const [toggleInfoText, setInfoText] = useState("Show Info");
  const toggleInfo = () => {
    setInfoClass(infoClass === "info-hidden" ? "info-visible" : "info-hidden");
    setInfoText(toggleInfoText === "Show Info" ? "Hide Info" : "Show Info");
  };

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`)
      .then((response) => setPokeData(response.data));
  }, [pokemonName]);

  if (pokeData) {
    return <ListPokemon individualPokemon={pokemonName} />;
  } else {
    return <p> loading </p>;
  }
};

export default TypeFilteredPokemon;
