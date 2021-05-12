import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Table = styled.table`
  border: 1px solid black;
  background-color: #f2f2f2;
  padding: 5px;
`;
const Moves = ({ name }) => {
  const [moves, setMoves] = useState();
  const [levelUpMoves, setLevelUpMoves] = useState();
  const [TMmoves, setTMmoves] = useState();

  const [visibility, setVisibility] = useState("hidden");
  const toggle = () => {
    setVisibility(visibility === "hidden" ? "visible" : "hidden");
    console.log(visibility);
  };

  useEffect(() => {
    if (name) {
      axios
        .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then((response) => {
          setMoves(response.data.moves);
          setLevelUpMoves(
            response.data.moves.filter(
              (item) =>
                item.version_group_details[
                  item.version_group_details.length - 1
                ].level_learned_at !== 0
            )
          );
          setTMmoves(
            response.data.moves.filter(
              (e) =>
                e.version_group_details[e.version_group_details.length - 1]
                  .move_learn_method.name === "machine"
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
      <button onClick={toggle} className="btn">
        Toggle Moves
      </button>
      {/* {console.log(moves.sort((a, b) => a[1] - b[1]))} */}

      {moves && (
        <div className={visibility + " grid-2"}>
          <Table>
            <tbody>
              <tr>
                <th>Level</th>
                <th>Move</th>
              </tr>
            </tbody>
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
          </Table>

          {TMmoves && (
            <Table>
              <tbody>
                <tr>
                  <th>HM/TM Moves</th>
                </tr>
                {TMmoves.map((e, i) => (
                  <tr key={i}>
                    <td> {e.move.name} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      )}

      {TMmoves && <div></div>}
    </div>
  );
};

export default Moves;
