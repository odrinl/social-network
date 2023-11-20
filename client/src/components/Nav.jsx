import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router";
import styled from "styled-components";

const Nav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isFeedActive = () => {
    return location.pathname === "/home";
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <NavList>
      <NavItem>
        <StyledNavLink className={isFeedActive() ? "active" : ""} to="/home/">
          Feed
        </StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/home/friends">Friends</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledNavLink to="/home/myprofile">Profile</StyledNavLink>
      </NavItem>
      <NavItem>
        <StyledLogoutLink onClick={logout}>Logout</StyledLogoutLink>
      </NavItem>
    </NavList>
  );
};

export default Nav;

const NavList = styled.ul`
  background-color: white;
  border-radius: 12px;
  list-style: none;
  justify-content: space-between;
  padding: 10px;
  display: flex;
  margin-top: 15px;
  margin-bottom: 35px;
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

const StyledLogoutLink = styled.a`
  text-decoration: none;
  color: black;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--nav-hover-color);
  }
`;
