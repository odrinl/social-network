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

  const onPostCreate = () => {
    fetchPosts();
  };

  const onPostDelete = () => {
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
      <CreatePost onPostCreate={onPostCreate} />
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        posts.map((post) => (
          <Post
            key={post._id}
            post={post}
            onPostDelete={onPostDelete}
            isOwner={isOwner(post)}
          />
        ))
      )}
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  height: fit-content;
`;
