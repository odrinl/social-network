import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import CreatePost from "./CreatePost";
import useFetch from "../hooks/useFetch";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  const onReceived = (response) => {
    const sortedPosts = response.posts.sort((a, b) => {
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    setPosts(sortedPosts);
  };

  const { performFetch, cancelFetch, isLoading, error } = useFetch(
    "/posts/get",
    onReceived
  );

  const fetchPosts = () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    performFetch(options);
  };

  const onPostChanged = () => {
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
    return cancelFetch;
  }, []);

  const isOwner = (post) => {
    const userName = localStorage.getItem("username");
    return userName === post.username;
  };

  return (
    <Container>
      <CreatePost onPostCreate={onPostChanged} />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onPostChanged={onPostChanged}
            isOwner={isOwner(post)}
          />
        ))
      )}
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 50rem;
  margin-top: 1rem;
`;
const PostsContainer = styled.div`
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;
