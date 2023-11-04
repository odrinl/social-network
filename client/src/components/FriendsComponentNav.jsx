import React from "react";
import styled from "styled-components";

// eslint-disable-next-line react/prop-types
const FriendsComponentNav = ({ onTabClick, activeTab }) => {
  const tabs = ["Friends", "Friends Request", "Sent Request"];

  return (
    <NavContainer>
      {tabs.map((tab) => (
        <Tab
          key={tab}
          onClick={() => onTabClick(tab)}
          active={activeTab === tab}
        >
          {tab}
        </Tab>
      ))}
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  background-color: #1c2733;
  color: white;
  border-radius: 13px;
  margin-bottom: 1rem;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  padding: 10px 0;
  justify-content: space-around;
`;

const Tab = styled.div`
  cursor: pointer;
  padding: 10px 20px;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "3px solid #ff9900" : "none")};
  transition: border-bottom 0.2s ease-in-out; /* Change transition to only affect border-bottom */
  &:hover {
    background-color: #555;
  }
`;

export default FriendsComponentNav;