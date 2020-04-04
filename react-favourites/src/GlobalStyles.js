import { createGlobalStyle } from "styled-components";
import variables from "./variables";
import "bulma/css/bulma.min.css";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Baloo+Da+2&display=swap');
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;     
  }
  html {
    font-size: 10px;
  }
  body {
    background-color: ${variables.mainColor};
    color: ${variables.fontColor};
    font-family: ${variables.mainFont};
    font-weight: 400;
    line-height: 1.7; 
    min-height: 100vh;
  } 
  h1 {
    font-size: 4rem
  }
  h2 {
    font-size: 3.2rem;
  }
  h3 {
    font-size: 2.4rem
  }
  div {
    font-size: 1.6rem
  }
  label.label {
    color: ${variables.fontColor};
    font-size: 2rem;
  }
  .checkbox {
    font-size: 2rem;
    &:hover {
      color: ${variables.activeColor}
    }
  }
`;

export default GlobalStyle;
