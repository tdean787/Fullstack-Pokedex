import axios from "axios";
import { useEffect, useState } from "react";
import {
  BrowserRouter as HashRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import "./App.css";
import "./animista.css";
import Pokemon from "./components/Pokemon";
import AllPokemon from "./components/AllPokemon";
import SelectedPokemon from "./components/SelectedPokemon";
import Filtered from "./components/Filtered";
import Teams from "./components/Teams";
import About from "./components/About";
import Header from "./components/Header";

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
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => {
        setAllPokemon({ ...response.data });
        console.log(response.data);
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
      <div>
        <form class="search-form">
          <input
            placeholder="type the pokemon name here"
            onChange={updateSearch}
          />

          <button class="btn" type="submit" onClick={callPokeAPI}>
            Search
          </button>

          <label for="types"> Filter by type </label>
          <select onChange={typeChange} name="types">
            <option value="all">All</option>
            <option value="fire">Fire</option>
            <option value="grass">grass</option>
            <option value="water">water</option>
            <option value="rock">rock</option>
            <option value="dark">dark</option>
            <option value="fighting">fighting</option>
            <option value="ice">ice</option>
            <option value="psychic">psychic</option>
            <option value="fairy">fairy</option>
            <option value="ghost">ghost</option>
            <option value="dragon">dragon</option>
          </select>
        </form>
      </div>
      <div>
        <Link to={pokemonData.name}>
          <div>
            <Pokemon apiError={apiError} pokemonData={pokemonData} />
          </div>
        </Link>
      </div>
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
    <HashRouter>
      <nav>
        <ul>
          <li class="links">
            <Link to="/">Home</Link>
          </li>
          <li class="links">
            <Link to="/about">About</Link>
          </li>
          <li class="links">
            <Link to="/teams">Teams</Link>
          </li>
          {/* <button onClick={toggleTheme}>
              {" "}
              Toggle {themeState === "light" ? "dark" : "light"}{" "}
            </button> */}
        </ul>
      </nav>
      <Header></Header>
      <Switch>
        <Route exact path="/teams">
          <Teams />
        </Route>
        <Route exact path="/pokemon/:name" component={SelectedPokemon} />
        <Route exact path="/about" component={About} />
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route component={HomePage} />
      </Switch>
    </HashRouter>
  );
}

export default App;
