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
list-style: none;
justify-content: space-between;
padding: 10px;
display: flex;
margin-top: 15px;
margin-bottom: 35px;
position: relative;


&::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 4px;
  background: linear-gradient(to right, #05445E, #D4F1F4, #05445E);
  border-radius: 12px;
}
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color:#05445E;
  font-weight:bold;
  transition: color 0.3s;

  &:hover {
    color: var(--nav-hover-color);
  }

  &.active {
    color: #189AB4;
  }
`;

const StyledLogoutLink = styled.a`
  text-decoration: none;
  color:#05445E;
  font-weight:bold;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: var(--nav-hover-color);
  }
`;
