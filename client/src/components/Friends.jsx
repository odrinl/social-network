import React from "react";
import styled from "styled-components";

const Friends = () => {
  return (
    <Container>
      <SearchContainer>
        <h1>search results</h1>
        <search />
      </SearchContainer>
      <FriendsNav>
        <ul>
          <li>MyFriends</li>
          <li>Friend requests</li>
          <li>Sent requests</li>
        </ul>
      </FriendsNav>
    </Container>
  );
};

export default Friends;

const SearchContainer = styled.div``;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const FriendsNav = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 40%;
  border: 1px solid #007bff;
  border-radius: 10px;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      margin: 0 15px;
      font-size: 16px;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #007bff; /* Change the color on hover */
      }
    }
  }

  @media (max-width: 768px) {
    /* Add responsive styles here */
  }
`;
