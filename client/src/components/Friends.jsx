import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import FriendCard from "./Cards/FriendsCard";
import SentRequestCard from "./Cards/SentRequestsCard";
import SearchCard from "./Cards/SearchCard";
import FriendRequestCard from "./Cards/FriendsRequestsCard";
import useFetch from "../hooks/useFetch";

const Friends = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [category, setCategory] = useState("friends");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [endPoint, setEndPoint] = useState(`/users/${userId}/friends`);

  const onSuccess = (response) => {
    setData(response);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    endPoint,
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, [userId, endPoint]);

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div>Error while trying to get data from sever: {error.toString()}</div>
    );
  } else if (isLoading) {
    statusComponent = <div>Creating user....</div>;
  }

  let cardComponent = null;
  if (category === "friends") {
    cardComponent = <FriendCard data={data.friends} />;
  } else if (category === "friends-requests") {
    cardComponent = <FriendRequestCard data={data.receivedRequests} />;
  } else if (category === "sent-requests") {
    cardComponent = <SentRequestCard data={data.sentRequests} />;
  } else if (category === "search") {
    cardComponent = <SearchCard data={data.nonFriends} />;
  }

  return (
    <Container>
      <SearchContainer>
        <SearchIcon />
        <SearchInput
          onChange={(e) => {
            setCategory("search");
            setEndPoint(
              `/users/${userId}/searchNonFriendsByName?name=${e.target.value}`
            );
            setInput(e.target.value);
          }}
          value={input}
          type="text"
          placeholder="Search People"
        />
      </SearchContainer>

      <FriendsNav>
        <ul>
          <li
            className={category === "friends" ? "active" : ""}
            onClick={() => {
              setCategory("friends");
              setEndPoint(`/users/${userId}/friends`);
              setInput("");
            }}
          >
            My
            <br />
            Friends
          </li>
          <li
            className={category === "friends-requests" ? "active" : ""}
            onClick={() => {
              setCategory("friends-requests");
              setEndPoint(`/users/${userId}/getAllReceivedRequests`);
              setInput("");
            }}
          >
            Friends
            <br />
            Requests
          </li>
          <li
            className={category === "sent-requests" ? "active" : ""}
            onClick={() => {
              setCategory("sent-requests");
              setEndPoint(`/users/${userId}/getAllSentRequests`);
              setInput("");
            }}
          >
            Sent
            <br />
            Requests
          </li>
        </ul>
      </FriendsNav>
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
  background-color: white;
  border-radius: 12px;
  height: 40px;
  width: 100%;

  ul {
    list-style: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    li {
      height: 40px;
      border-radius: 12px;
      font-size: 15px;
      margin-top: 5px;
      color: black;
      cursor: pointer;
      text-align: center;
      display: flex;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        transform: scale(1.1);
        transition: transform 0.3s ease-in-out;
        color: var(--nav-hover-color);
      }

      &.active {
        color: var(--nav-active-color);
      }
    }
  }

  @media (min-width: 1200px) {
    width: 60%;
  }
  li {
    margin: 0 15px;
  }
  @media (min-width: 500px) and (max-width: 770px) {
    width: 65%;
  }
  li {
    margin: 0 15px;
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
