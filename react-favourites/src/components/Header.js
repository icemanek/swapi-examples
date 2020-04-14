import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div className="image-container">
        <img src="/logo.svg" alt="" />
      </div>
      <nav>
        <NavLink exact to="/">
          Strona główna
        </NavLink>
        <NavLink exact to="/films">
          Lista Filmów
        </NavLink>
        <NavLink exact to="/sign-up">
          Rejestracja
        </NavLink>
        <NavLink exact to="/sign-in">
          Logowanie
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
