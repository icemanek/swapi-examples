import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://swapi.co/api/people/", {
      mode: "cors"
    })
      .then(response => {
        if (!response.ok) {
          throw Error(
            "PeopleFetchError",
            "Error while fetching peoples",
            response
          );
        }
        return response.json();
      })
      .then(apiResponse => apiResponse.results)
      .then(characters => {
        setCharacters(characters);
      });
  }, []);

  const filterCharactersByName = (characters, inputValue) => {
    if (!inputValue || inputValue === "") {
      return characters;
    }
    return characters.filter(c => c.name.startsWith(inputValue));
  };

  const paginateCharacters = pageSize => (array, pageNumber) => {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  };

  return (
    <div className="App">
      <header className="App-header">
        <CharactersFilter
          characters={characters}
          InnerComponent={CharactersTable}
        />
        <CharacterPagination
          characters={characters}
          InnerComponent={CharactersTable}
        />

        <div>Generic Filter Component</div>

        <FilterComponent>
          <CharactersTable characters={characters} />
        </FilterComponent>

        <FilterComponent filter={paginateCharacters(2)}>
          <CharactersTable characters={characters} />
        </FilterComponent>

        <FilterComponent filter={filterCharactersByName}>
          <CharactersTable characters={characters} />
        </FilterComponent>

        <div>Nested filters</div>
        <FilterComponent title="Name" filter={filterCharactersByName}>
          <FilterComponent
            title="Page"
            characters={characters}
            filter={paginateCharacters(2)}
          >
            <CharactersTable />
          </FilterComponent>
        </FilterComponent>
      </header>
    </div>
  );
}

const CharactersFilter = ({ characters, InnerComponent }) => {
  console.log("CF", characters);

  const [inputValue, setInputValue] = useState();

  const filterChangedHandler = event => {
    setInputValue(event.target.value);
  };

  const filterCharacters = (characters, inputValue) => {
    if (!inputValue || inputValue === "") {
      return characters;
    }

    return characters.filter(c => c.name.startsWith(inputValue));
  };

  return (
    <React.Fragment>
      <input onChange={filterChangedHandler} />
      <InnerComponent characters={filterCharacters(characters, inputValue)} />
    </React.Fragment>
  );
};

const CharacterPagination = ({ characters, InnerComponent, pageSize = 2 }) => {
  console.log("CF", characters);

  const [pageNumber, setPageNumber] = useState(1);

  const filterChangedHandler = event => {
    setPageNumber(event.target.value);
  };

  function filterCharacters(array, pageNumber) {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  return (
    <React.Fragment>
      <input onChange={filterChangedHandler} />
      <InnerComponent characters={filterCharacters(characters, pageNumber)} />
    </React.Fragment>
  );
};

const CharactersTable = ({ characters }) => {
  console.log("CT", characters);

  return (
    <React.Fragment>
      {characters.map(c => {
        return <div key={c.name}>{c.name}</div>;
      })}
    </React.Fragment>
  );
};

const FilterComponent = ({
  children,
  title,
  characters,
  filter = id => id
}) => {
  const [pageNumber, setPageNumber] = useState();

  const filterChangedHandler = event => {
    setPageNumber(event.target.value);
  };

  return (
    <React.Fragment>
      <div>
        {title}
        <input onChange={filterChangedHandler} />
      </div>
      {React.cloneElement(children, {
        characters: filter(characters || children.props.characters, pageNumber)
      })}
    </React.Fragment>
  );
};

export default App;
