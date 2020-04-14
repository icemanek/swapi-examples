import React from "react";

const SignIn = () => {
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
              placeholder="Wpisz swój login lub adres email"
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

          <button>Zaloguj się</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
