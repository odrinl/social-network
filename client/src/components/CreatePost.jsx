import React from "react";
import styled from "styled-components";

const CreatePost = () => {
  return (
    <Container>
      <TopArea>
        <ProfileImage
          src="https://c.animaapp.com/EuIEJ23i/img/ellipse@2x.png"
          alt="Profile Image"
        />
        <Text placeholder="What's on your mind?"></Text>
      </TopArea>
      <BottomArea>
        <PostButton>Post</PostButton>
      </BottomArea>
    </Container>
  );
};

export default CreatePost;

const Container = styled.div`
  background-color: var(--create-post-background-color);
  color: white;
  border: 1px solid black;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  padding-bottom: 1rem;
`;

const TopArea = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
`;

const BottomArea = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ProfileImage = styled.img`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
`;

const Text = styled.input`
  margin-top: 0.5rem;
  display: flex;
  width: 100%;
  background-color: #ffffff;
  border-radius: 5.97px;
  height: 41px;
  resize: none;
  margin-left: 0.5rem;
  font-family: var(--font-family);
  font-size: 1rem;
  text-align: center;
`;

const PostButton = styled.button`
  background-color: #f0f7ff;
  color: #1877f2;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  height: 31px;
  width: 122px;
`;
