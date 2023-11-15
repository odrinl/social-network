import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { fakeData } from "../MyProfileComponent";
import OtherUsersPosts from "./OtherUsersPosts";

const token = localStorage.getItem("token");

const handleFriendRequest = () => {
  console.log("Friend request handled");
};

const OtherUserProfile = () => {
  const [data, setData] = useState({
    coverPhoto: "",
    profilePic: "",
    user: {
      username: "",
      friends: 3,
      isFriend: false,
    },
  });

  const { profileId } = useParams();

  const onSuccess = (response) => {
    setData(response);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/users/${profileId}`,
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    performFetch({
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, []);

  const handleFriendRequestClick = () => {
    handleFriendRequest();
  };

  return (
    <UserProfile>
      {isLoading && <LoadingDiv>Loading....</LoadingDiv>}
      {!isLoading && error && (
        <ErrorDiv>
          Error while trying to get data from the server: {error.toString()}
        </ErrorDiv>
      )}
      {!isLoading && !error && (
        <>
          <CoverPhotoContainer>
            <CoverPhoto src={fakeData.coverPhoto} alt="Cover Photo" />
          </CoverPhotoContainer>
          <ProfileInfo>
            <ProfilePicContainer>
              <ProfilePic src={fakeData.profilePic} alt="Profile Pic" />
            </ProfilePicContainer>
            {data.success && (
              <div>
                <h1>@ {data.user.username}</h1>
                <p>{`${fakeData.friends} Friends`}</p>

                <FriendButton onClick={handleFriendRequestClick}>
                  {data.user.isFriend ? "Unfriend" : "Add Friend"}
                </FriendButton>
              </div>
            )}
          </ProfileInfo>
        </>
      )}
      <PostsContainer>
        <OtherUsersPosts profileId={profileId} />
      </PostsContainer>
    </UserProfile>
  );
};

const UserProfile = styled.div`
  margin-top: 18px;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const CoverPhotoContainer = styled.div`
  position: relative;
`;

const CoverPhoto = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 0.8rem;
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

const LoadingDiv = styled.div`
  text-align: center;
  margin: 20px 0;
`;

const ErrorDiv = styled.div`
  background-color: #ffe4e1;
  color: #e74c3c;
  padding: 8px 16px;
  border: 1px solid #e74c3c;
  border-radius: 4px;
  margin: 8px 0;
`;

const FriendButton = styled.button`
  padding: 8px 16px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const PostsContainer = styled.div``;
export default OtherUserProfile;
