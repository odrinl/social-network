import React, { useState } from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";

// eslint-disable-next-line react/prop-types
function FriendSearch({ onSearchSubmit }) {
  const [input, setInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    onSearchSubmit(input);
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
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const FormStyle = styled.form`
  display: flex;
  align-items: center;
  background-color: #f0f2f5;
  border: 1px solid #d3d6db;
  border-radius: 50px;
  padding: 0.2rem 0.4rem;
  width: 610px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    width: 100%;
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

const SearchIcon = styled(FaSearch)`
  color: gray;
  margin-right: 0.5rem;
`;

export default FriendSearch;
