import React from "react";
import styled from "styled-components";
import { mainFont, activeColor, mainColor, thirdColor } from "../variables";

const StyledHeader = styled.h1`
  margin-bottom: 2rem;
`;

const StyledWrapper = styled.div``;

const StyledForm = styled.form``;

const StyledFormControl = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 2rem;
`;

const StyledLabel = styled.label`
  font-family: ${mainFont};
  font-weight: bold;
  text-transform: uppercase;
`;
const StyledInput = styled.input`
  height: 50px;
  padding-left: 2rem;
  font-size: 1.6rem;
  border-radius: 4px;
  border: none;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  font-family: ${mainFont};
  font-size: 1.6rem;
  text-transform: uppercase;
  background-color: ${activeColor};
  color: ${mainColor};
  font-weight: bold;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: 0.3s;
  &:hover {
    color: ${activeColor};
    background-color: ${thirdColor};
  }
`;

const SignUp = () => {
  return (
    <>
      <StyledHeader>Zarejestruj się</StyledHeader>
      <StyledWrapper>
        <StyledForm>
          <StyledFormControl>
            <StyledLabel htmlFor="login">Login</StyledLabel>
            <StyledInput
              id="login"
              name="login"
              type="text"
              placeholder="Wpisz swój login"
            ></StyledInput>
          </StyledFormControl>
          <StyledFormControl>
            <StyledLabel htmlFor="email">Adres E-mail</StyledLabel>
            <StyledInput
              id="email"
              name="email"
              type="email"
              placeholder="Wpisz swój adres email"
            ></StyledInput>
          </StyledFormControl>
          <StyledFormControl>
            <StyledLabel htmlFor="password">Hasło</StyledLabel>
            <StyledInput
              id="password"
              name="password"
              type="password"
              placeholder="Wpisz swoje hasło"
            ></StyledInput>
          </StyledFormControl>
          <StyledFormControl>
            <StyledLabel htmlFor="password">Potwierdź hasło</StyledLabel>
            <StyledInput
              id="password"
              name="password"
              type="password"
              placeholder="Potwierdź hasło"
            ></StyledInput>
          </StyledFormControl>
          <StyledButton>Zarejestruj się</StyledButton>
        </StyledForm>
      </StyledWrapper>
    </>
  );
};

export default SignUp;
