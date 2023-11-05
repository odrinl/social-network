import React from "react";
import styled from "styled-components";

const FriendCard = (data) => {
  const sparePic =
    "https://th.bing.com/th/id/OIP.Y6Xo7ozc-rL5UrzUanPlxAHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7";
  return (
    <Container>
      <ScrollableContainer>
        <FriendGrid>
          {data.data && data.data.length > 0 ? (
            data.data.map((friend) => (
              <FriendItem key={friend._id}>
                <ProfilePic
                  src={friend.profilePic ? friend.profilePic : sparePic}
                  alt={friend.name}
                />
                <FriendInfo>
                  <Name>{friend.username}</Name>
                </FriendInfo>
                <ButtonContainer>
                  <ConfirmButton>Unfriend</ConfirmButton>
                  <RemoveButton>Remove</RemoveButton>
                </ButtonContainer>
              </FriendItem>
            ))
          ) : (
            <div>No friends to display.</div>
          )}
        </FriendGrid>
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
const RemoveButton = styled.button`
  background-color: #c6b6c2;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ConfirmButton = styled.button`
  background-color: #1c2733;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px 10px 8px 0;
`;

export default FriendCard;
