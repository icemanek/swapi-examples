import React, { useEffect, useState } from "react";
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

  const filterCharactersByNameIncludes = (characters, inputValue) => {
    if (!inputValue || inputValue === "") {
      return characters;
    }
    return characters.filter(c => c.name.includes(inputValue));
  };

  const filterCharactersByNameStartsWith = (characters, inputValue) => {
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

        <FilterComponent filter={paginateCharacters(4)}>
          <CharactersTable characters={characters} />
        </FilterComponent>

        <FilterComponent filter={filterCharactersByNameStartsWith}>
          <CharactersTable characters={characters} />
        </FilterComponent>

        <div>Nested filters</div>
        <FilterComponent
          title="Name Includes"
          filter={filterCharactersByNameIncludes}
        >
          <FilterComponent
            title="Name"
            filter={filterCharactersByNameStartsWith}
          >
            <FilterComponent title="Page" filter={paginateCharacters(2)}>
              <CharactersTable characters={characters} />
            </FilterComponent>
          </FilterComponent>
        </FilterComponent>

        <div>Filters Chain</div>
        <div>Nested filters</div>
        <FilterChain
          title="Name"
          characters={characters}
          filter={filterCharactersByNameStartsWith}
        >
          {startsWithName => (
            <FilterChain
              title="Page"
              characters={startsWithName}
              filter={paginateCharacters(2)}
            >
              {paginatedCharaters => (
                <CharactersTable characters={paginatedCharaters} />
              )}
            </FilterChain>
          )}
        </FilterChain>
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
  title,
  defaultValue,
  children,
  arrayProp = "characters",
  filter = id => id
}) => {
  const [inputValue, setInputValue] = useState(defaultValue);

  const childrenCharacters = children.props[arrayProp];
  const childrenFilter = children.props.filter;

  const childrenProps = {
    ...children.props,
    arrayProp,
    filter:
      childrenFilter &&
      ((children, value) =>
        childrenFilter(filter(children, inputValue), value)),
    characters: childrenCharacters && filter(childrenCharacters, inputValue)
  };

  return (
    <>
      <div>
        {title}
        <input
          value={inputValue}
          onChange={event => {
            setInputValue(event.target.value);
          }}
        />
      </div>
      {React.cloneElement(children, childrenProps)}
    </>
  );
};

const FilterChain = ({ children, title, characters, filter = id => id }) => {
  const [inputValue, setInputValue] = useState();

  const filterChangedHandler = event => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div>
        {title}
        <input onChange={filterChangedHandler} />
      </div>
      {children(filter(characters || children.props.characters, inputValue))}
    </>
  );
};

export default App;
