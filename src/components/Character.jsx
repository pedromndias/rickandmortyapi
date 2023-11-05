import locationLogo from "../assets/location-icon.png"

const Character = (props) => {
    // Let's destructure the props:
    const {character} = props
  return (
    <div className="each-character">
        <img src={character.image} alt={character.name} />
        <h3>{character.name}</h3>
        <p>👤 {character.species}</p>
        <p id="location"><img src={locationLogo} alt="location" /> {character.location.name}</p>
    </div>
  )
}

export default Character