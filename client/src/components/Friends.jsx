import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import FriendCard from "./Cards/FriendsCard";
import SentRequestCard from "./Cards/SentRequestsCard";
import SearchCard from "./Cards/SearchCard";
import FriendRequestCard from "./Cards/FriendsRequestsCard";
import fakeData from "./Cards/FakeData";

import useFetch from "../hooks/useFetch";

const Friends = () => {
  const [category, setCategory] = useState("friends");
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  // const userId = localStorage.getItem("userId");
  const userId = "653eab81fe0331d11b507b64";
  let finalEndPoint = "";
  let statusComponent = null;
  const handleEndPoint = () => {
    if (category === "friends") {
      finalEndPoint = `users/:${userId}/friends`;
    } else if (category === "search") {
      finalEndPoint = `/users:${input}`;
    } else if (category === "friends-requests") {
      finalEndPoint = "/users";
    } else {
      finalEndPoint = "/users";
    }
  };

  const handleSelect = () => {
    const { isLoading, error } = useFetch(finalEndPoint, onSuccess);

    const onSuccess = (response) => {
      setData(response.data);
      console.log("molham");
    };

    if (error != null) {
      statusComponent = (
        <div>Error while trying to create user: {error.toString()}</div>
      );
    } else if (isLoading) {
      statusComponent = <div>Creating user....</div>;
    }
  };

  let cardComponent = null;
  if (category === "friends") {
    cardComponent = <FriendCard data={fakeData} />;
  } else if (category === "friends-requests") {
    cardComponent = <FriendRequestCard data={fakeData} />;
  } else if (category === "sent-requests") {
    cardComponent = <SentRequestCard data={fakeData} />;
  } else if (category === "search") {
    cardComponent = <SearchCard data={fakeData} />;
  }

  return (
    <Container>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          onChange={(e) => {
            setInput(e.target.value);
            setCategory("search");
            handleEndPoint();
            handleSelect();
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
              handleEndPoint();
              setCategory("friends");
              handleSelect();
            }}
          >
            MyFriends
          </li>
          <li
            onClick={() => {
              handleEndPoint();
              setCategory("friends-requests");
            }}
          >
            Friends Requests
          </li>
          <li
            onClick={() => {
              handleEndPoint();
              setCategory("sent-requests");
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
      {cardComponent}
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
