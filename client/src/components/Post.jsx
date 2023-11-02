import React from "react";
import styled from "styled-components";
import { FaThumbsUp, FaComment, FaShare } from "react-icons/fa";

const Post = () => {
  return (
    <Container>
      <PostTitle>
        <ProfileImage
          src="https://c.animaapp.com/shx7UmdF/img/ellipse-26-2@2x.png"
          alt="Profile Image"
        />
        <UserName>
          <strong>Username</strong>

          <Time>45 mins ago</Time>
        </UserName>
      </PostTitle>
      <PostText>
        This is the content of the Facebook post. You can add text, images, and
        other content here.
      </PostText>
      <PostFooter>
        <Button>
          <FaThumbsUp />
        </Button>
        <Button>
          <FaComment />
        </Button>
        <Button>
          <FaShare />
        </Button>
      </PostFooter>
    </Container>
  );
};

export default Post;

const Container = styled.div`
  border: 1px solid #dcdcdc;
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
`;

const PostTitle = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 4.3rem;
  height: 4.3rem;
  padding: 0.2rem;
  border-radius: 50%;
  border-color: var(--white);
  box-shadow: -1.27px 1.27px 5.07px #78829280;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
`;

const UserName = styled.p`
  font-size: 1.2rem;
`;

const Time = styled.p`
  font-size: 0.8rem;
  margin-top: 0.5rem;
`;
const PostText = styled.p`
  font-size: 1.1rem;
  line-height: 2rem;
`;

const PostFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  font-size: 1rem;
`;

const Button = styled.div`
  color: #788292;
  cursor: pointer;
  opacity: 0.4;
  margin-left: 1.5rem;
  font-size: 2rem;
`;
