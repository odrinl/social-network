import React from "react";
import styled from "styled-components";
import FriendSearch from "./FriendSearch";
import FriendsComponentNav from "./FriendsComponentNav";
import FriendCard from "./FriendCard";

const Friends = () => {
  return (
    <Container>
      <FriendsComponentNav />
      <FriendSearch />
      <FriendCard />
    </Container>
  );
};
const Container = styled.div`
  height: 50rem;
  overflow: hidden;
`;
export default Friends;
