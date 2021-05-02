import React from "react";
import ListPokemon from "../components/ListPokemon";

const AllPokemon = (props) => {
  return (
    <div className="grid">
      {/* {console.log(props.allPokemon.results)}
      {props.allPokemon.results && (
        <div className="grid">
          {props.allPokemon.results.map((item, index) => (
            <div>
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  index + 1
                }.png`}
              ></img>
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      )} */}
      {props.allPokemon &&
        props.allPokemon.results.map((element) => (
          <div key={element.name}>
            <ListPokemon individualPokemon={element.name} />
          </div>
        ))}
    </div>
  );
};

export default AllPokemon;
