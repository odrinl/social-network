import React from "react";
import styled from "styled-components";
import FriendSearchContainer from "../pages/FriendsPage/FriendSearchContainer";

const Feed = () => {
  return (
    <Container>
      <div>Posts</div>
      <FriendSearchContainer />
    </Container>
  );
};

export default Feed;
const Container = styled.div`
  height: 93vh;
`;
