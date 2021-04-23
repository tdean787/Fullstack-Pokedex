import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import "./Reset.css";
import Pokemon from "./components/Pokemon";
import AllPokemon from "./components/AllPokemon";

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearch] = useState("");
  const [allPokemon, setAllPokemon] = useState();
  const [apiError, setError] = useState("");

  const callPokeAPI = (event) => {
    event.preventDefault();
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${searchText}/`)
      .then((response) => {
        setPokemonData(response.data);
        setError(undefined);
      })
      .then(console.log(pokemonData))
      .catch((error) => {
        setError(error);
        console.log(apiError);
      });
  };

  const updateSearch = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=5").then((response) => {
      setAllPokemon({ ...response.data });
      console.log(allPokemon);
    });
  }, []);

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
          <Pokemon apiError={apiError} pokemonData={pokemonData} />
        </div>
      </div>
      <p>
        Data pulled from PokeAPI:{" "}
        <a href="https://pokeapi.co/">https://pokeapi.co/</a>
      </p>
      {allPokemon && <AllPokemon allPokemon={allPokemon} />}
    </div>
  );
}

export default App;
