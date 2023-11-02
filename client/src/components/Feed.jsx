import React from "react";
import styled from "styled-components";
import Post from "./Post";
import CreatePost from "./CreatePost";

const Feed = () => {
  return (
    <Container>
      <CreatePost />

      <Post />

      <Post />
    </Container>
  );
};

export default Feed;
const Container = styled.div`
  height: 20rem;
`;
