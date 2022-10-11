import "./App.css";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [search, setSearch] = useState();

  useEffect(() => {
    getData();
  }, [query]);

  const updatePlayer = (e) => {
    const userAlly = e.target.value;
    const userAllyArray = userAlly.split("-").join("");
    setSearch(userAllyArray);
  };

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };

  const getData = () => {
    fetch(`http://localhost:3001/swgoh/roster/${query}`)
      .then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <header className="header">
        <div className="header__input">
          <form onSubmit={getSearch} className="form__input">
            <input
              className="input"
              type="text"
              value={search}
              onChange={updatePlayer}
            ></input>
            <button type="submit">Enter your ally code</button>
          </form>
        </div>
        <h1>Welcome {data[0]?.MAGMATROOPER[0].player}</h1>
      </header>
      {
        <div className="character-container">
          {data?.map((characters) => {
            const charactersArray = Object.keys(characters);
            return charactersArray.map((char, i) => {
              return (
                <div key={i} className="character">
                  <p>{char}</p>
                  <p>Galactic power: {data[0][char][0].gp}</p>
                  <p>Stars: {data[0][char][0].starLevel}</p>
                  <p>Level: {data[0][char][0].level}</p>
                  <p>Gear level: {data[0][char][0].gearLevel}</p>
                </div>
              );
            });
          })}
        </div>
      }
    </>
  );
}

export default App;
