import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import FilmDetails from "./components/FilmDetails";
import FilmList from "./components/FilmList";
import GlobalStyle from "./GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import Loading from "./components/Loading";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import fakeData from "./fakeData"; 

const FilmListWithLoader = () => {
  const [films, setFilms] = useState(undefined);

  useEffect(() => {

    /* fetch("https://swapi.co/api/films", { mode: "cors" }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw Error("Failed to fetch data from swapi");
        }
      })*/

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(fakeData)
      }, 2000);
    })
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
    return <Loading />
  }
};

const App = () => {
  return (
    <div className="container">
      <GlobalStyle />
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/" exact strict component={Home}></Route>
          <Route path="/films" exact strict component={FilmListWithLoader}></Route>
          <Route path="/films/:id" exact strict component={FilmDetails}></Route>
          <Route path="/sign-up" exact strict component={SignUp}></Route>
          <Route path="/sign-in" exact strict component={SignIn}></Route>
          <Redirect to="/" />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
