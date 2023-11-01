import React, { useState } from "react";
import styled from "styled-components";
import FriendSearchContainer from "../pages/FriendsPage/FriendSearchContainer";

const MyFriends = () => {
  const [showFriendSearch, setShowFriendSearch] = useState(false);

  const toggleFriendSearch = () => {
    setShowFriendSearch(!showFriendSearch);
  };

  return (
    <Container>
      <div>
        <button onClick={toggleFriendSearch}>Friends</button>
      </div>
      {showFriendSearch && <FriendSearchContainer />}
    </Container>
  );
};

export default MyFriends;

const Container = styled.div`
  height: 13rem;
`;
