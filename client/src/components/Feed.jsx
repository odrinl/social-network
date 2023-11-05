import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import CreatePost from "./CreatePost";
import useFetch from "../hooks/useFetch";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");

  const onReceived = (response) => {
    setPosts(response.posts);
  };
  const { performFetch, cancelFetch, isLoading } = useFetch(
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

  const onPostCreate = (post) => {
    setPosts([post, ...posts]);
  };

  useEffect(() => {
    fetchPosts();
    return cancelFetch;
  }, []);

  return (
    <Container>
      <CreatePost onPostCreate={onPostCreate} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        posts.map((post) => <Post key={post._id} post={post} />)
      )}
    </Container>
  );
};

export default Feed;

const Container = styled.div`
  height: fit-content;
`;
