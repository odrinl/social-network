import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const FriendSlideSection = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const onSuccess = (response) => {
    setData(response.friends || []);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    `/users/${userId}/friends`,
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
  }, [userId]);

  const handleProfileClick = (profileId) => {
    navigate(`/home/user-profile/${profileId}`);
  };

  return (
    <Container>
      <ScrollableContainer>
        {isLoading && <LoadingDiv>Loading....</LoadingDiv>}
        {!isLoading && error && (
          <ErrorDiv>
            Error while trying to get data from the server: {error.toString()}
          </ErrorDiv>
        )}
        {!isLoading && data.length > 0 && (
          <FriendList>
            {data.map((user) => (
              <FriendItem
                key={user._id}
                onClick={() => handleProfileClick(user._id)}
              >
                <FriendAvatar
                  id="profilePic"
                  src={
                    user.profilePicture
                      ? `${process.env.BASE_SERVER_URL}/uploadImages/${user.profilePicture}`
                      : sparePic
                  }
                  alt="Profile Pic"
                />
                <FriendName>{user.username}</FriendName>
              </FriendItem>
            ))}
          </FriendList>
        )}
        {!isLoading && data.length === 0 && (
          <NoFriendsDiv>No friends to display.</NoFriendsDiv>
        )}
      </ScrollableContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  height: 29rem;
`;

const ScrollableContainer = styled.div`
  overflow-y: auto;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0 !important;
  }
`;

const FriendList = styled.div`
  width: 100%;
`;

const FriendItem = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0;
  padding: 8px;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d4f1f4;
  }
`;

const FriendAvatar = styled.img`
  width: 90px;
  height: 90px;
  padding: 0.2rem;
  border-radius: 50%;
  border-color: var(--white);
  box-shadow: 0 0 10px rgba(27, 131, 166, 0.6);
  margin-right: 1.5rem;
  margin-bottom: 1rem;
  object-fit: cover;
`;

const FriendName = styled.div`
  font-weight: bold;
  font-size: 16px;
  color: #05445e;
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

const NoFriendsDiv = styled.div`
  text-align: center;
  margin: 20px 0;
  font-size: 16px;
  color: #888;
`;

const sparePic =
  "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png";

export default FriendSlideSection;
