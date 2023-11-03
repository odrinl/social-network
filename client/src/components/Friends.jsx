import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

import useFetch from "../hooks/useFetch";

const Friends = () => {
  const [category, setCategory] = useState("friends");
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  let finalEndPoint = "";
  const handleEndPoint = (endPoint) => {
    if (category === "friends") {
      finalEndPoint = `/users${endPoint}`;
    } else {
      finalEndPoint === `/users:${input}`;
    }
  };
  const { isLoading, error } = useFetch(finalEndPoint, onSuccess);

  const onSuccess = (response) => {
    setData(response.data);
  };

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div>Error while trying to create user: {error.toString()}</div>
    );
  } else if (isLoading) {
    statusComponent = <div>Creating user....</div>;
  }
  return (
    <Container>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          onChange={(e) => {
            setInput(e.target.value);
            setCategory("search");
            handleEndPoint("/search");
          }}
          type="text"
          value={input}
          placeholder="Search person"
        />
      </SearchContainer>

      <FriendsNav>
        <ul>
          <li
            onClick={() => {
              handleEndPoint("/:id/friends");
              setCategory("friends");
            }}
          >
            MyFriends
          </li>
          <li
            onClick={() => {
              handleEndPoint("/:id/friends");
              setCategory("friends");
            }}
          >
            Friends Requests
          </li>
          <li
            onClick={() => {
              handleEndPoint("/:id/friends");
              setCategory("friends");
            }}
          >
            Sent requests
          </li>
        </ul>
      </FriendsNav>
      <div>
        {data.map((item) => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
      {statusComponent}
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

const SearchIcon = styled(FaSearch)`
  color: gray;
  margin-right: 0.5rem;
`;

const FriendsNav = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 80%;
  background-color: white;
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
        color: #e68965; /* Change the color on hover */
      }
    }
  }

  @media (max-width: 768px) {
    /* Add responsive styles here */
  }
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 16px;
  padding: 6px;
  border-radius: 50px;
  background-color: #f0f2f5;
  color: #1d2129;
  border: 1px solid #d3d6db;
  &::placeholder {
    color: #8c949e;
  }
`;
