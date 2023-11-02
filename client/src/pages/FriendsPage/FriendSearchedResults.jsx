import React, { useState } from "react";
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

const FriendSearchedResults = () => {
  const [friends, setFriends] = useState(fakeData);

  const onAddFriend = (friend) => {
    // Simulate adding a friend
    const updatedFriends = friends.map((f) =>
      f.name === friend.name ? { ...f, isFriend: true } : f
    );

    setFriends(updatedFriends);
  };

  return (
    <FriendSearchedResultsContainer>
      <ScrollableContainer>
        {friends.map((friend, index) => (
          <FriendResultContainer key={index}>
            <FriendProfilePic src={friend.profilePic} alt={friend.name} />
            <FriendInfo>
              <FriendName>{friend.name}</FriendName>
              <FriendDetails>
                {friend.isFriend ? (
                  <span>
                    <Friend>Friend.</Friend> Lives in {friend.country},{" "}
                    {friend.city}
                  </span>
                ) : (
                  `Lives in ${friend.country}, ${friend.city}`
                )}
              </FriendDetails>
              <MutualFriends>{`${friend.mutualFriends} mutual friends`}</MutualFriends>
            </FriendInfo>
            {friend.isFriend ? (
              <SendMessageButton>Unfriend</SendMessageButton>
            ) : (
              <AddFriendButton onClick={() => onAddFriend(friend)}>
                Add Friend
              </AddFriendButton>
            )}
          </FriendResultContainer>
        ))}
      </ScrollableContainer>
    </FriendSearchedResultsContainer>
  );
};

const FriendSearchedResultsContainer = styled.div`
  background-color: var(--homepage-wrapper-background-color);
  padding: 10px, 0, 10px, 0;
  border-radius: 13px;
  width: 100%;
  margin-top: 1rem;
  height: 40rem;
  overflow: hidden;
`;

const ScrollableContainer = styled.div`
  max-height: 75vh;
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

const FriendResultContainer = styled.div`
  display: flex;
  height: auto;
  align-items: center;
  padding: 16px; 
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  margin-bottom:20px;
  background-color: white;
  border-radius: 13px;
  position: relative;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: #f0f2f5;
  }
}`;

const FriendProfilePic = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 16px;
`;

const FriendInfo = styled.div`
  flex: 1;
`;
const Friend = styled.span`
  font-weight: bold;
  font-size: 12px;
  color: #007bff;
`;
const FriendName = styled.div`
  font-weight: bolder;
  font-size: 18px;
`;

const FriendDetails = styled.div`
  font-size: 14px;
  color: #555;
`;
const SharedButtonStyle = styled.button`
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  background-color: #c6b6c2;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  color: #90467f;
  transition: transform 0.5s, background-color 0.5s;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  &:hover {
    background-color: #90467f;
    transform: scale(1.05);
    color: white;
  }
  &:active {
    transform: scale(0.95);
  }
`;

// Usage for Add Friend button
const AddFriendButton = styled(SharedButtonStyle)``;

// Usage for Send Message button
const SendMessageButton = styled(SharedButtonStyle)``;

const MutualFriends = styled.div`
  font-size: 15px;
  color: #555;
  bottom: 0;
  padding: 6px;
`;
export default FriendSearchedResults;
