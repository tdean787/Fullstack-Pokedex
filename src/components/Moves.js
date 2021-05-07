import axios from "axios";
import React, { useEffect, useState } from "react";

const Moves = ({ name }) => {
  const [moves, setMoves] = useState();
  const [levelUpMoves, setLevelUpMoves] = useState();

  const [displayClass, setDisplayClass] = useState("info-hidden");

  const toggleMoves = () => {
    //this should be a ternarny condition check but having issues resolving
    if (displayClass === "info-hidden") {
      setDisplayClass("info-visible");
    } else if (displayClass === "info-visible") {
      setDisplayClass("info-hidden");
    }
  };

  useEffect(() => {
    if (name) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
          setMoves(response.data.moves);
          setLevelUpMoves(
            response.data.moves.filter(
              (item) => item.version_group_details[0].level_learned_at !== 0
            )
          );
        })
        .catch((error) => console.log("moves error", error));
    }
  }, [name]);

  useEffect(() => {
    if (levelUpMoves) {
      setMoves(
        levelUpMoves.map((element) => [
          element.move.name,
          element.version_group_details[0].level_learned_at,
        ])
      );
    }
  }, [levelUpMoves]);
  return (
    <div className="moves">
      <button onClick={toggleMoves} className="btn">
        Show Me Your Moves
      </button>
      {/* {console.log(moves.sort((a, b) => a[1] - b[1]))} */}

      {moves && (
        <table className={displayClass}>
          <tbody>
            {moves
              .sort((a, b) => a[1] - b[1])
              .map((element, index) => (
                <tr key={index}>
                  <td>{element[1]}</td>
                  <td>{element[0]}</td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Moves;
