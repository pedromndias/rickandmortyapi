import logo from "./assets/logo.png";
import githubLogo from "./assets/github-mark.png"
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import DotLoader from "react-spinners/DotLoader";
import Character from "./components/Character";

function App() {
  // Let's create a state so we manage the characters:
  const [characters, setCharacters] = useState(null);
  // Let's create a variable for the search word:
  const [query, setQuery] = useState("");
  // Create another state to manage the loading:
  const [isLoading, setIsLoading] = useState(true);
  // Create another state to manage the initial loading:
  const [isLoadingInitial, setIsLoadingInitial] = useState(true);
  // Set a state if there is a character or not:
  const [characterExists, setCharacterExists] = useState(true);

  // Now let's get the data from the api. It will be an asynchronous process so we can use an async function. To handle the api call we use a try-catch.
  const getData = async () => {
    try {
      const response = await axios.get(
        "https://rickandmortyapi.com/api/character"
      );
      // console.log(response.data);
      setCharacters(response.data.results);
      setIsLoadingInitial(false);
    } catch (error) {
      // console.log(error);
    }
  };

  // Let's create another function for the search functionality:
  const getQuery = async () => {
    try {
      setIsLoading(true);
      const searchResponse = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${query}`
      );
      // console.log(searchResponse.data);
      setCharacters(searchResponse.data.results);
      setCharacterExists(true);
      // console.log(characters);
      setIsLoading(false);
    } catch (error) {
      // console.log(error);
      // If we can't find a character, we will set the characterExists to false:
      setCharacterExists(false);
      setIsLoading(false);
    }
  };

  // We will use a useEffect to getData is invoked when the App component is mounted:
  useEffect(() => {
    getData();
  }, []);

  // And another useEffect for the search feature:
  useEffect(() => {
    getQuery();
  }, [query]);

  // Let's create a clause so we have a spinner while the data is loading:
  if (isLoadingInitial) {
    return <DotLoader color="#36d7b7" size={60} />;
  }

  return (
    <div className="main-container">
      <section>
        <img src={logo} className="logo" alt="logo" />
        <div className="search-container">
          <label htmlFor="search-char">Search for a Character: </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {characterExists === false ? (
          <p style={{color: "red"}}>Can't find a character!</p>
        ) : (
          <div className="characters-list">
            {characters.map((eachCharacter) => (
              <Character character={eachCharacter} key={eachCharacter.id} />
            ))}
          </div>
        )}
      </section>
      <footer>
        <p>Made with ♥︎ by Pedro</p><a href="https://github.com/pedromndias/rickandmortyapi" target="_blank" rel="noreferrer"><img className="github-logo" src={githubLogo} alt="github logo" /></a>
      </footer>
    </div>
  );
}

export default App;
