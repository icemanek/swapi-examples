import React from "react";

const SignUp = () => {
  return (
    <div className="form">
      <h1>Zaloguj się</h1>
      <div>
        <form>
          <div className="form-control">
            <label htmlFor="login">Login</label>
            <input
              id="login"
              name="login"
              type="text"
              placeholder="Wpisz swój login"
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="login">Adres E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Wpisz swój adres email"
            ></input>
          </div>

          <div className="form-control">
            <label htmlFor="password">Hasło</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Wpisz swoje hasło"
            ></input>
          </div>
          <div className="form-control">
            <label htmlFor="password">Potwierdź hasło</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Potwierdź swoje hasło"
            ></input>
          </div>

          <button>Zarejestruj się</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
