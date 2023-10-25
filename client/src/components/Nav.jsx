import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  background-color: var(--nav-background);
  color: var(--nav-color);
  padding: 10px;
`;

const NavList = styled.ul`
  list-style: none;
  justify-content: flex-end;
  padding: 0;
  display: flex;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: var(--nav-hover-color);
  }
`;

const Nav = () => {
  return (
    <NavContainer>
      <NavList>
        <NavItem>
          <NavLink to="/my-profile">My Profile</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/events">Events</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/news">News</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/friends">Friends</NavLink>
        </NavItem>
      </NavList>
    </NavContainer>
  );
};

export default Nav;
