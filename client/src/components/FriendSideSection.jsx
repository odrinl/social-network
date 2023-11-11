import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

const FriendSlideSection = () => {
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
  }, []);

  const handleProfileClick = (userId) => {
    navigate(`/home/my-profile/${userId}`);
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
                  src={user.profilePic ? user.profilePic : sparePic}
                  alt={user.name}
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
`;

const ScrollableContainer = styled.div`
  overflow-y: auto;
  max-height: 400px;
  border: 1px solid #dddfe2;
  border-radius: 8px;
  padding: 10px;
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
    background-color: #f0f2f5;
  }
`;

const FriendAvatar = styled.img`
  width: 4rem;
  height: 4rem;
  padding: 0.2rem;
  border-radius: 50%;
  border-color: var(--white);
  box-shadow: -1.27px 1.27px 5.07px #78829280;
  margin-right: 1.5rem;
  margin-bottom: 1rem;
`;

const FriendName = styled.div`
  font-weight: bold;
  font-size: 16px;
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
  "https://th.bing.com/th/id/OIP.Y6Xo7ozc-rL5UrzUanPlxAHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7";

export default FriendSlideSection;
