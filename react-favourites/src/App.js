import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import FilmDetails from "./components/FilmDetails";
import FilmList from "./components/FilmList";
import Header from "./components/Header";
import Home from "./components/Home";
import Loading from "./components/Loading";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import fakeData from "./fakeData";

const getFakeResults = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeData);
    }, 2000);
  });
};

const getApiResults = () => {
  return fetch("https://swapi.co/api/films", { mode: "cors" }).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error("Failed to fetch data from swapi");
      }
    }
  );
};

const getFilms = (fake) => {
  if (!fake) {
    return getFakeResults();
  } else {
    return getApiResults();
  }
};

const FilmListWithLoader = () => {
  const [films, setFilms] = useState(undefined);

  useEffect(() => {
    getFilms()
      .then((json) => {
        return json.results;
      })
      .then(setFilms)
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (films) {
    return <FilmList initalFilms={films} />;
  } else {
    return <Loading />;
  }
};

const App = () => {
  return (
    <div className="container">
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/" exact strict component={Home} />
          <Route path="/films" exact strict component={FilmListWithLoader} />
          <Route path="/films/:id" exact strict component={FilmDetails} />
          <Route path="/sign-up" exact strict component={SignUp} />
          <Route path="/sign-in" exact strict component={SignIn} />
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
