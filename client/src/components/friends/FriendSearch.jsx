import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import FriendSearchedResults from "../../pages/FriendsPage/FriendSearchedResults";

function FriendSearch() {
  const [input, setInput] = useState("");
  const [showResults, setShowResults] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    setShowResults(true);
  };

  return (
    <SearchContainer>
      <FormStyle onSubmit={submitHandler}>
        <SearchIcon />
        <SearchInput
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
          placeholder="Search person"
        />
      </FormStyle>
      {showResults && <FriendSearchedResults />}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  background-color: #f0f2f5;
  border: 1px solid #d3d6db;
  border-radius: 50px;
  padding: 0.5rem 1rem;
  width: 25vw;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
`;

const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  flex: 1;
  font-size: 16px;
  padding: 12px;
  border-radius: 50px;
  background-color: #f0f2f5;
  color: #1d2129;
  border: 1px solid #d3d6db;

  &::placeholder {
    color: #8c949e;
  }
`;

const SearchIcon = styled(FaSearch)`
  color: gray;
  margin-right: 0.5rem;
`;

export default FriendSearch;
