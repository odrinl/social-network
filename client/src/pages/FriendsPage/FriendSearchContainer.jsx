import React, { useState } from "react";
import styled from "styled-components";
import FriendSearch from "../../components/friends/FriendSearch";
import FriendSearchedResults from "./FriendSearchedResults";

const FriendSearchContainer = () => {
  const [displaySearchResults, setDisplaySearchResults] = useState(false);

  // Function to show the search results
  const showSearchResults = () => {
    setDisplaySearchResults(true);
  };

  return (
    <Container>
      <h1>search results</h1>
      <FriendSearch onSearch={showSearchResults} />
      {displaySearchResults && <FriendSearchedResults />}
    </Container>
  );
};

const Container = styled.div`
  padding: 20px;
  width: 80rem;
  height: fit-content;
`;

export default FriendSearchContainer;
