import axios from "axios";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./Reset.css";
import "./PokeBackgroundColors.css";
import Pokemon from "./components/Pokemon";
import AllPokemon from "./components/AllPokemon";
import SelectedPokemon from "./components/SelectedPokemon";
import Filtered from "./components/Filtered";

const HomePage = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchText, setSearch] = useState("");
  const [allPokemon, setAllPokemon] = useState();
  const [apiError, setError] = useState("");

  const [selectedType, setSelectedType] = useState("all");

  const [typeFilteredPokemon, setTypeFilteredPokemon] = useState("");

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
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=9").then((response) => {
      setAllPokemon({ ...response.data });
    });
  }, []);

  const typeChange = (event) => {
    setSelectedType(event.target.value);
    if (event.target.value !== "all") {
      axios
        .get(`https://pokeapi.co/api/v2/type/${event.target.value}/`)
        .then((response) => {
          setTypeFilteredPokemon(response.data.pokemon);
        });
    }
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
          <label for="types"> Filter by type </label>
          <select onChange={typeChange} name="types">
            <option value="all">All</option>
            <option value="fire">Fire</option>
            <option value="grass">grass</option>
            <option value="water">water</option>
            <option value="rock">rock</option>
          </select>
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
      </p>{" "}
      <div className="all-pokemon-container">
        {selectedType !== "all" && (
          <Filtered selectedType={selectedType} data={typeFilteredPokemon} />
        )}
        {selectedType === "all" && (
          <div>{allPokemon && <AllPokemon allPokemon={allPokemon} />}</div>
        )}
      </div>
    </div>
  );
};

function App() {
  const [themeState, setThemeState] = useState("light");

  //ternary operator check on display mode - toggles theme state
  const toggleTheme = () => {
    return themeState === "light"
      ? setThemeState("dark")
      : setThemeState("light");
  };

  return (
    <div className={themeState}>
      <button onClick={toggleTheme}>
        {" "}
        Toggle {themeState === "light" ? "dark" : "light"}{" "}
      </button>
      <Router>
        <Switch>
          <Route path="/:name">
            <SelectedPokemon />
          </Route>
          <Route path="/">
            {" "}
            <HomePage />{" "}
          </Route>
          <Route component={HomePage}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
