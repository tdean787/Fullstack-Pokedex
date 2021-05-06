import React from "react";

const About = () => {
  return (
    <div className="container">
      <h2>About Page</h2>
      <p>
        A fullstack web app utilizing the MERN technology stack (MongoDB,
        Express, React, and Node)
      </p>
      <p>
        The Pokemon data is retrieved from{" "}
        <a style={{ color: "blue" }} href="https://pokeapi.co/">
          PokeAPI
        </a>
      </p>
      <img
        style={{ maxWidth: "200px", margin: "1em" }}
        src="https://taylordean.net/images/taylor-dean.jpg"
      ></img>
      <p>You can find me on the following platforms: </p>
      <ul style={{ paddingTop: "1em" }}>
        <li>
          <a href="https://taylordean.net">Portfolio</a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/taylor-m-dean/">LinkedIn</a>
        </li>
        <li>
          <a href="https://github.com/tdean787">GitHub</a>
        </li>
      </ul>
    </div>
  );
};

export default About;
