import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Post from "./Post";
import CreatePost from "./CreatePost";
import useFetch from "../hooks/useFetch";

const Feed = () => {
  const [posts, setPosts] = useState([
    {
      username: "audrey",
      text: "llkjgfdsawertyuiop[-098765432",
      images: [],
      timestamp: "2023-11-05T05:18:35.498Z",
      _id: "654725abf68be77a69c88463",
    },
    {
      username: "audrey",
      text: "ffgsg",
      images: [],
      timestamp: "2023-11-05T05:27:57.923Z",
      _id: "654727dd3ff69ebc7fc2c066",
    },
  ]);
  const token = localStorage.getItem("token");
  const onReceived = (response) => {
    setPosts(response);
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

  useEffect(() => {
    fetchPosts();
    return cancelFetch;
  }, []);

  return (
    <Container>
      <CreatePost />
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
