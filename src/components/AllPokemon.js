import React, { useEffect, useState } from "react";
import ListPokemon from "../components/ListPokemon";
import { Link } from "react-router-dom";

const AllPokemon = (props) => {
  const [infoClass, setInfoClass] = useState("info-hidden");
  const [toggleInfoText, setInfoText] = useState("Show Info");
  const toggleInfo = () => {
    //check state of class on info container
    //switch from visible to hidden and vice versa on button click
    setInfoClass(infoClass === "info-hidden" ? "info-visible" : "info-hidden");
    setInfoText(toggleInfoText === "Show Info" ? "Hide Info" : "Show Info");
  };
  return (
    <div style={{ marginTop: "1em" }} className="grid">
      {props.allPokemon &&
        props.allPokemon.results.map((element, index) => (
          <div key={element.name}>
            <Link to={`/pokemon/${element.name}`}>
              <div className="tile">
                <img
                  alt={element.name}
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                    index + 1
                  }.png`}
                ></img>
                {element.name}

                {/* <ListPokemon individualPokemon={element.name} /> */}
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
};

export default AllPokemon;
