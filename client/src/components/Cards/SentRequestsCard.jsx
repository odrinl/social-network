import React from "react";
import styled from "styled-components";

const SentRequestCard = (data) => {
  return (
    <Container>
      <ScrollableContainer>
        <FriendGrid>
          {data.data.map((friend, index) => (
            <FriendItem key={index}>
              <ProfilePic src={friend.profilePic} alt={friend.name} />
              <FriendInfo>
                <Name>{friend.name}</Name>
                <MutualFriends>
                  {friend.mutualFriends} mutual friends
                </MutualFriends>
              </FriendInfo>
              <ButtonContainer>
                <ConfirmButton>Cancel</ConfirmButton>
                <RemoveButton>Remove</RemoveButton>
              </ButtonContainer>
            </FriendItem>
          ))}
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
  text-align: center;
`;

const Name = styled.h3`
  font-size: 1.25rem;
  margin: 0;
`;

const MutualFriends = styled.p`
  color: #777;
  margin: 0;
  font-size: 0.875rem;
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
  background-color: #dc143c;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 8px 10px 8px 0;
`;
export default SentRequestCard;
