import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faShare,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { fakeData } from "./Myprofile";

function MyPosts() {
  const [likes, setLikes] = useState(fakeData.posts[0].likes);
  const [shares, setShares] = useState(0); // Initialize shares with 0

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleShare = () => {
    setShares(shares + 1);
  };

  return (
    <Container>
      <ScrollableContainer>
        {fakeData.posts.map((post, index) => (
          <div key={index}>
            <PostContainer>
              <PostInfo>
                <UserInfo>
                  <ProfilePic src={fakeData.profilePic} alt="Profile Picture" />
                  <div>
                    <h1>{fakeData.name}</h1>
                    <p>{post.date}</p>
                  </div>
                </UserInfo>
              </PostInfo>

              <PostContent>{post.text}</PostContent>
              {post.image && (
                <PostImageContainer
                  style={{ backgroundImage: `url(${post.image})` }}
                />
              )}
              <TopContent>
                <Numbers>
                  <Number>{post.likes} Likes</Number>
                  <Number>{post.shares} Shares</Number>
                  <Number>
                    {post.comments ? post.comments.length : 0} Comments
                  </Number>
                </Numbers>
              </TopContent>

              <ActionsContainer>
                <Action onClick={handleLike}>
                  <FontAwesomeIcon icon={faThumbsUp} />
                  Like
                </Action>
                <Action>
                  <FontAwesomeIcon icon={faComment} />
                  Comment
                </Action>
                <Action onClick={handleShare}>
                  <FontAwesomeIcon icon={faShare} />
                  Share
                </Action>
              </ActionsContainer>
            </PostContainer>
          </div>
        ))}
      </ScrollableContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  @media (max-width: 768px) {
  }
`;

const ScrollableContainer = styled.div`
  height: 530px;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;
const PostContainer = styled.div`
  background-color: #ffffff;
  border: 1px solid #ddd;
  margin: 10px 0;
  padding: 15px;
  font-family: Arial, sans-serif;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.34);
`;

const ProfilePic = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 0.5rem;
  border-radius: 50%;
  border: 5px solid #fff;
  object-fit: cover;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const PostContent = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

const PostImageContainer = styled.div`
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 10px 10px 0 0;
`;

const TopContent = styled.div`
  font-size: 16px;
`;

const Numbers = styled.div`
  font-weight: 600;
  color: #606770;
  margin-top: 10px;
`;

const Number = styled.span`
  flex: 1;
  text-align: center;
  margin-right: 10px;
`;

const ActionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
`;

const Action = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
  cursor: pointer;
  color: #606770;
  font-weight: 600;

  svg {
    margin-right: 5px;
  }

  &:hover {
    color: #1877f2;
  }
`;

const PostInfo = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;

  h1 {
    font-size: 17px;
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
`;

export default MyPosts;
