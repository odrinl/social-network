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
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
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
  background-color: #90467f;
  border-radius: 10px;
  list-style: none;
  justify-content: space-between;
  padding: 20px;
  display: flex;
  margin-top: 15px;
  margin-bottom: 18px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const NavItem = styled.li`
  margin-right: 10px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #ecf0f1;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #3498db;
    border-bottom: 2px solid #3498db;
  }

  &.active {
    color: orange;
    border-bottom: 2px solid orange;
  }
`;

const StyledLogoutLink = styled.a`
  text-decoration: none;
  color: #ecf0f1;
  font-weight: bold;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #2ecc71;
  }
`;
