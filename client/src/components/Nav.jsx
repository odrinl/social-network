import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  const location = useLocation();

  const isFeedActive = () => {
    return location.pathname === "/home";
  };
  return (
    <NavList>
      <NavItem>
        <StyledNavLink className={isFeedActive() ? "active" : ""} to="/home/">
          Feed
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/home/events">Events</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/home/friends">Friends</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/home/my-profile">My profile</StyledNavLink>
      </NavItem>
    </NavList>
  );
};

export default Nav;

const NavList = styled.ul`
  list-style: none;
  justify-content: flex-end;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  transition: color 0.3s;

  &:hover {
    color: var(--nav-hover-color);
  }

  &.active {
    color: var(--nav-active-color);
  }
`;
