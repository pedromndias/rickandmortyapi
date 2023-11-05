import logo from './assets/logo.png'
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DotLoader from "react-spinners/DotLoader";
import Character from './components/Character';

function App() {

  // Let's create a state so we manage the characters:
  const [characters, setCharacters] = useState(null)

  // Now let's get the data from the api. It will be an asynchronous process so we can use an async function. To handle the api call we use a try-catch.
  const getData = async () => {
    try {
      const response = await axios.get("https://rickandmortyapi.com/api/character")
      // console.log(response.data)
      setCharacters(response.data.results)
    } catch (error) {
      console.log(error)
    }
  }

  // We will use a useEffect to getData is invoked when the App component is mounted:
  useEffect(() => {
    getData()
  }, [])

  // Let's create a clause so we have a spinner while the data is loading:
  if (characters === null) {
    return <DotLoader color="#36d7b7" size={60}/>
  }

  return (
    <>
      <div>
        
        <img src={logo} className="logo" alt="logo" />
        <div className='characters-list'>
          {characters.map(eachCharacter => <Character character={eachCharacter} key={eachCharacter.id}/>)}
        </div>
      </div>
    </>
  )
}

export default App
