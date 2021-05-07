import React from "react";
import ListPokemon from "./ListPokemon";
import { Link } from "react-router-dom";

const Filtered = ({ data }) => {
  const getURLRegex = (element) => {
    let test = /\W\d+/;
    return test.exec(element);
  };
  if (!data) {
    return <div>no filter</div>;
  } else {
    return (
      <div className="grid">
        {data.map((element, index) => (
          <Link to={`/pokemon/${element.pokemon.name}`}>
            <div className="tile">
              {/* {getURLRegex(element.pokemon.url)} */}
              <img
                alt={element.pokemon.name}
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getURLRegex(
                  element.pokemon.url
                )}.png`}
              ></img>
              {element.pokemon.name}
            </div>
          </Link>
        ))}
      </div>
    );
  }
};

export default Filtered;
