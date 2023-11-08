import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserMinus } from "@fortawesome/free-solid-svg-icons";

export const fakeData = {
  name: "Sophie Walker",
  profilePic:
    "https://th.bing.com/th/id/OIP.vQcH6uRqJd1SIpce-41uUgHaLH?w=146&h=219&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  coverPhoto:
    "https://th.bing.com/th?id=OIP.zcvn4QV1z5E7vQOFDLP6UQHaC2&w=350&h=134&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
  friends: 200,
  location: "New York, USA",
  bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed etiam tortor .",
};

const OtherUserProfile = () => {
  const [isFriend, setIsFriend] = useState(false);

  const toggleFriendStatus = () => {
    setIsFriend(!isFriend);
  };

  return (
    <Container>
      <CoverPhoto src={fakeData.coverPhoto} alt="Cover Photo" />
      <ProfileInfo>
        <ProfilePicContainer>
          <ProfilePic src={fakeData.profilePic} alt="Profile Pic" />
        </ProfilePicContainer>
        <div>
          <h1>{fakeData.name}</h1>
          <p>{`${fakeData.friends} Friends`}</p>
        </div>
        <FriendButton onClick={toggleFriendStatus}>
          <FontAwesomeIcon icon={isFriend ? faUserMinus : faUserPlus} />
          {isFriend ? "Unfriend" : "Add Friend"}
        </FriendButton>
      </ProfileInfo>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;

const CoverPhoto = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 0.8rem 0.8rem 0 0;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const ProfilePicContainer = styled.div`
  position: relative;
`;

const ProfilePic = styled.img`
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 5px solid #fff;
  object-fit: cover;
  margin-top: -75px;
  margin-left: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;

  h1 {
    font-size: 17px;
    margin-right: 10px;
  }

  p {
    color: #666;
    font-size: 14px;
  }
`;

const FriendButton = styled.div`
  background-color: #1da1f2;
  padding: 10px;
  width: 140px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: bold;
  border-radius: 0.4rem;
  color: #fff;
  transition: background-color 0.3s;
  margin-left: auto;

  svg {
    font-size: 20px;
    margin-right: 8px;
  }

  &:hover {
    background-color: #0099e5;
  }
`;

export default OtherUserProfile;
