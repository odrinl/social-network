import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavContainer = styled.nav`
  background-color: #333;
  color: #fff;
  padding: 10px;
`;

const NavList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
`;

const NavItem = styled.li`
  margin-right: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #fff;
  font-weight: bold;
  transition: color 0.3s;

  &:hover {
    color: #ff9900;
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
