import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [people, setPeople] = useState([]);

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
      .then(peopleResponse => {
        return peopleResponse.results.map(x => {
          return new Promise(
            (resolve, reject) => {
              fetch(x.url).then(response => {
                return response.json()
              }).then(person => {
                resolve({id: x.url, name: x.name, height: person.height})
              })
            }
          )
        });
      }).then(x => {
        return Promise.all(x)
      }).then(people => {
        setPeople(people);
      });
  }, []);

  return (
    <div className="App">
      {people.map(p => {
        return (
          <React.Fragment key={p.id}>
            <div>{p.name}: {p.height}</div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default App;
