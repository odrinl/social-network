import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  transition: color 0.3s;

  &:hover {
    color: var(--nav-hover-color);
  }

  &.active {
    color: #1877f2;
  }
`;

const Nav = () => {
  return (
    <NavList>
      <NavItem>
        <NavLink to="/home" activeclassname="active">
          Feed
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/home/events">Events</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/home/friends">Friends</NavLink>
      </NavItem>
      <NavItem>
        <NavLink to="/home/my-profile">My profile</NavLink>
      </NavItem>
    </NavList>
  );
};

export default Nav;
