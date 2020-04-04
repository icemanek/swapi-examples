import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

// Components
import FilmDetails from "./components/FilmDetails";
import FilmList from "./components/FilmList";
import GlobalStyle from "./GlobalStyles";
import Header from "./components/Header";
import Home from "./components/Home";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

const App = () => {
  return (
    <div className="container">
      <GlobalStyle />
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/" exact strict component={Home}></Route>
          <Route path="/films" exact strict component={FilmList}></Route>
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
