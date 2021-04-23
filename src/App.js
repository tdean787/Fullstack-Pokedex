import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Pokemon from "./components/Pokemon";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearch] = useState("");

  const callPokeAPI = (event) => {
    event.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchText}/`)
      .then((response) => {
        setPokemonData(response.data);
      })
      .then(console.log(pokemonData))
      .catch((error) => console.log(error));
  };

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div className="App">
      <header>
        <p>pokedex</p>
      </header>
      <div>
        <form>
          <input
            placeholder="type the pokemon name here"
            onChange={updateSearch}
          />
          <button type="submit" onClick={callPokeAPI}>
            search for pokemon
          </button>
        </form>
      </div>
      <div>
        <div>
          <Pokemon pokemonData={pokemonData} />
        </div>
      </div>
      <p>
        Data pulled from PokeAPI:{" "}
        <a href="https://pokeapi.co/">https://pokeapi.co/</a>
      </p>
    </div>
  );
}

export default App;
