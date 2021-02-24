import { useState } from "react";
import "./App.css";

function App() {
  const [character, setCharacter] = useState<any>();
  const characterStats = ["Status", "Species", "Gender"];

  const onGetCharacter = async (characterNumber: number) => {
    try {
      const response = await fetch(
        `https://rickandmortyapi.com/api/character/${characterNumber}`
      );
      const fetchedCharacter = await response.json();
      setCharacter(fetchedCharacter);
    } catch (err) {
      console.error(err);
    }
  };

  const getRandomNumber = () => {
    const randomNumber = Math.ceil(Math.random() * 100);
    return randomNumber;
  };

  const getCharacter = async () => {
    const randomNumber = getRandomNumber();
    await onGetCharacter(randomNumber);
  };

  return (
    <div className="App">
      {character && (
        <div className="characterBox">
          <h1>{character.name}</h1>
          <img src={character.image} alt="Rick and Morty character" />
          {characterStats.map((stat: string, idx: number) => (
            <h4 key={`${stat}-${idx}`}>
              {`${stat}: `}
              <span className="statValue">{`${
                character[stat.toLowerCase()]
              }`}</span>
            </h4>
          ))}
        </div>
      )}
      {!character && (
        <div className="placeholderText">
          Please click the button below to select a character
        </div>
      )}
      <button onClick={() => getCharacter()}>Get character</button>
    </div>
  );
}

export default App;
