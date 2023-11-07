import React, { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../../hooks/useFetch";

const userId = localStorage.getItem("userId");
const token = localStorage.getItem("token");

const FriendRequestCard = (data) => {
  const [endPoint, setEndPoint] = useState("");
  const [otherUserId, setOtherUserId] = useState("");
  const [currentData, setCurrentData] = useState(data.data);

  const onSuccess = () => {
    setCurrentData((prevData) =>
      prevData.filter((user) => user._id !== otherUserId)
    );
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    endPoint,
    onSuccess
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  useEffect(() => {
    setCurrentData(data.data);
  }, [data.data]);

  useEffect(() => {
    performFetch({
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }, [endPoint]);

  let statusComponent = null;
  if (error != null) {
    statusComponent = (
      <div>Error while trying to get data from sever: {error.toString()}</div>
    );
  } else if (isLoading) {
    statusComponent = <div>Creating user....</div>;
  }

  const sparePic =
    "https://th.bing.com/th/id/OIP.Y6Xo7ozc-rL5UrzUanPlxAHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  return (
    <Container>
      <ScrollableContainer>
        <FriendGrid>
          {currentData && currentData.length > 0 ? (
            currentData.map((user) => (
              <FriendItem key={user._id}>
                <ProfilePic
                  src={user.profilePic ? user.profilePic : sparePic}
                  alt={user.name}
                />
                <FriendInfo>
                  <Name>{user.username}</Name>
                </FriendInfo>
                <ButtonContainer>
                  <FriendButton
                    onClick={() => {
                      setOtherUserId(user._id);
                      setEndPoint(`/users/${user._id}/${userId}/accept`);
                      
                    }}
                  >
                    Accept
                  </FriendButton>
                  <FriendButton
                    onClick={() => {
                      setOtherUserId(user._id);
                      setEndPoint(`/users/${user._id}/${userId}/reject`);
                    }}
                  >
                    Reject
                  </FriendButton>
                </ButtonContainer>
              </FriendItem>
            ))
          ) : (
            <div>No friends to display.</div>
          )}
        </FriendGrid>
        {statusComponent}
      </ScrollableContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40rem;
  margin-top: 1.5rem;
`;

const ScrollableContainer = styled.div`
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0em;
  }
  &::-webkit-scrollbar-thumb {
    background: #8c8c8c;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555555;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const FriendGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

const FriendItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.4);
`;

const ProfilePic = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  margin-bottom: 8px;
`;
const FriendInfo = styled.div`
  text-align: left;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  text-align: left;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FriendButton = styled.button`
  background-color: #1c2733;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px 10px 8px 0;
`;

export default FriendRequestCard;
