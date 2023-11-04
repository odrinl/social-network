import React from "react";
import styled from "styled-components";

const fakeData = [
  {
    name: "Sarah Johnson",
    profilePic:
      "https://th.bing.com/th/id/OIP.vHzmiuV12LAMHP3Qfs8IcwHaNJ?w=115&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    isFriend: true,
    country: "Netherlands",
    city: "Amsterdam",
    mutualFriends: 4,
  },
  {
    name: "Michael Smith",
    profilePic:
      "https://th.bing.com/th/id/OIP.IPj13XxtCO7Ab7EDNipcfAHaHa?pid=ImgDet&w=203&h=203&c=7&dpr=1,3",
    isFriend: false,
    country: "Netherlands",
    city: "Rotterdam",
    mutualFriends: 1,
  },
  {
    name: "Anna Lee",
    profilePic:
      "https://th.bing.com/th/id/OIP.20xzswRiUQ6IcD7F7q7HHgHaKE?w=145&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    isFriend: true,
    country: "Netherlands",
    city: "Utrecht",
    mutualFriends: 3,
  },
  {
    name: "Chris Williams",
    profilePic:
      "https://th.bing.com/th/id/OIP.qbDiTvuEMd2mkPvbCAT1swHaIy?pid=ImgDet&w=203&h=240&c=7&dpr=1,3",
    isFriend: false,
    country: "Netherlands",
    city: "Eindhoven",
    mutualFriends: 0,
  },
  {
    name: "Jessica Davis",
    profilePic:
      "https://th.bing.com/th/id/OIP.JEOlJ-pcKAv0FJFpsAzhNQHaLH?w=133&h=200&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    isFriend: true,
    country: "Netherlands",
    city: "Groningen",
    mutualFriends: 5,
  },
  {
    name: "Daniel Taylor",
    profilePic:
      "https://www.bing.com/th?id=OIP.ajmo-8H7DyCxDJ9lg8crrAHaH6&w=150&h=161&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2",
    isFriend: true,
    country: "Netherlands",
    city: "Maastricht",
    mutualFriends: 7,
  },
  {
    name: "Sophie Walker",
    profilePic:
      "https://th.bing.com/th/id/OIP.vQcH6uRqJd1SIpce-41uUgHaLH?w=146&h=219&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    isFriend: true,
    country: "Netherlands",
    city: "The Hague",
    mutualFriends: 2,
  },
  {
    name: "David Brown",
    profilePic:
      "https://th.bing.com/th/id/OIP.5X8UEZhoJiADEL4xFMrkigHaJy?w=136&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    isFriend: false,
    country: "Netherlands",
    city: "Amersfoort",
    mutualFriends: 1,
  },
  {
    name: "Emma Robinson",
    profilePic:
      "https://th.bing.com/th?q=Profile+Shot&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=nl-NL&cc=NL&setlang=en&adlt=moderate&t=1&mw=247",
    isFriend: true,
    country: "Netherlands",
    city: "Gouda",
    mutualFriends: 3,
  },
  {
    name: "Samuel Harris",
    profilePic:
      "https://th.bing.com/th/id/OIP.Y6Xo7ozc-rL5UrzUanPlxAHaHa?w=211&h=211&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    isFriend: false,
    country: "Netherlands",
    city: "Ede",
    mutualFriends: 6,
  },
];

function FriendRequestCard() {
  return (
    <Container>
      <ScrollableContainer>
        <FriendGrid>
          {fakeData.map((friend, index) => (
            <FriendItem key={index}>
              <ProfilePic src={friend.profilePic} alt={friend.name} />
              <FriendInfo>
                <Name>{friend.name}</Name>
                <MutualFriends>
                  {friend.mutualFriends} mutual friends
                </MutualFriends>
              </FriendInfo>
              <ButtonContainer>
                <ConfirmButton>Accept</ConfirmButton>
                <RemoveButton>Remove</RemoveButton>
              </ButtonContainer>
            </FriendItem>
          ))}
        </FriendGrid>
      </ScrollableContainer>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 40rem;
  margin-top: 1.5rem;

  @media (max-width: 768px) {
  }
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

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
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

const MutualFriends = styled.p`
  color: #777;
  font-size: 0.875rem;
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

export default FriendRequestCard;
