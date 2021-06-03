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
import AllPokemon from "./components/AllPokemon";
import SelectedPokemon from "./components/SelectedPokemon";
import Filtered from "./components/Filtered";
import Teams from "./components/Teams";
import About from "./components/About";
import Header from "./components/Header";
import Search from "./components/Search";

const HomePage = () => {
  const [allPokemon, setAllPokemon] = useState();
  const [selectedType, setSelectedType] = useState("all");
  const [typeFilteredPokemon, setTypeFilteredPokemon] = useState("");

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
        <Search />
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
      </div>
      <div></div>
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
      <div>
        <nav>
          <ul>
            <li className="links">
              <Link to="/">Home</Link>
            </li>
            <li className="links">
              <Link to="/about">About</Link>
            </li>
            <li className="links">
              <Link to="/teams">Teams</Link>
            </li>
            {/* <button onClick={toggleTheme}>
              {" "}
              Toggle {themeState === "light" ? "dark" : "light"}{" "}
            </button> */}
          </ul>
        </nav>
        <Header></Header>
      </div>
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
