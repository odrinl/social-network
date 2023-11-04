import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import FriendCard from "./Cards/FriendsCard";
import SentRequestCard from "./Cards/SentRequestsCard";
import SearchCard from "./Cards/SearchCard";
import FriendRequestCard from "./Cards/FriendsRequestsCard";
import fakeData from "./Cards/FakeData";

import useFetch from "../hooks/useFetch";
const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

const Friends = () => {
  const [category, setCategory] = useState("friends");
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);
  const [endPoint, setEndPoint] = useState("");
  
  let statusComponent = null;
  const handleEndPoint = () => {
    if (category === "friends") {
      setEndPoint(`/users/${userId}/friends`)
    } else if (category === "search") {
      setEndPoint(`/users:${input}`)
    } else if (category === "friends-requests") {
      setEndPoint("/users")
    } else {
      setEndPoint("/users")
    }
  };


  const onSuccess = (response) => {
    setData(response.data);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(endPoint, onSuccess);
  
  const handleSelect = () => {
    handleEndPoint();
  }

  useEffect(() => {
    return cancelFetch;
  }, []);

    useEffect(()=>{
      performFetch({
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "content-type": "application/json",
        }
      });
    },[endPoint])
    

  
    if (error != null) {
      statusComponent = (
        <div>Error while trying to create user: {error.toString()}</div>
      );
    } else if (isLoading) {
      statusComponent = <div>Creating user....</div>;
    }
  
  

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
              setCategory("friends");
              handleSelect();
            }}
          >
            MyFriends
          </li>
          <li
            onClick={() => {
              setCategory("friends-requests");
              handleSelect();
            }}
          >
            Friends Requests
          </li>
          <li
            onClick={() => {
              setCategory("sent-requests");
              handleSelect();
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
