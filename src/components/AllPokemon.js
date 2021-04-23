import axios from "axios";
import { useState } from "react";
import React from "react";

const AllPokemon = (props) => {
  return (
    <div>
      <p> all </p>
      <p>{console.log(props.allPokemon.results)} </p>

      <p>
        {props.allPokemon.results.map((element, index) => (
          <div>
            {" "}
            {element.name}
            <p>
              {" "}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
              ></img>
            </p>
          </div>
        ))}
      </p>
    </div>
  );
};

export default AllPokemon;
