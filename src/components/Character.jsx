const Character = (props) => {
    // Let's destructure the props:
    const {character} = props
  return (
    <div className="each-character">
        <h3>{character.name}</h3>
    </div>
  )
}

export default Character