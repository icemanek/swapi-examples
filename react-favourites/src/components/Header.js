import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import variables from "../variables";

const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
`;

const StyledImageContainer = styled.div`
  width: 500px;
`;

const StyledNavigation = styled.nav``;

const StyledAnchorLink = styled.a`
  text-decoration: none;
  text-transform: uppercase;
  color: ${variables.fontColor};
  font-weight: bold;
  transition: 0.3s;
  padding: 2rem;
  &.active,
  &:hover {
    color: ${variables.activeColor};
  }
`;

const Header = () => {
  return (
    <StyledHeader>
      <StyledImageContainer>
        <img src="logo.svg" alt="" />
      </StyledImageContainer>
      <StyledNavigation>
        <StyledAnchorLink exact as={NavLink} to="/">
          Strona główna
        </StyledAnchorLink>
        <StyledAnchorLink exact as={NavLink} to="/film-list">
          Lista Filmów
        </StyledAnchorLink>
      </StyledNavigation>
    </StyledHeader>
  );
};

export default Header;
